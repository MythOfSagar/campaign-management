import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegTimesCircle } from "react-icons/fa";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import styled from "styled-components";

import { createResource, deleteResource, readResources, updateResource } from "../redux/Resource/action.ts";
import Draggable from "../components/Draggable.tsx";
import Droppable from "../components/Droppable.tsx";
import { RESOURCES_TYPES } from "../constants.ts";

interface ITask {
  id: string;
  title: string;
  description: string;
}

interface IColumn {
  id: string;
  title: string;
  tasks: ITask[];
}


const TaskBoard: React.FC = () => {

  const dispatch = useDispatch()

  const userId = useSelector((state: any) => state?.auth?.loginData?.userId);
  const tasks = useSelector((state: any) => state?.resource?.[RESOURCES_TYPES.TASK]);

  const [currentTaskId, setCurrentTaskId] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTaskData, setNewTaskData] = useState<any>({
    title: '',
    status: '',
    description: ''
  });

  const [tasksByStatus, setTasksByStatus] = useState<IColumn[]>([]);


  useEffect(() => {
    dispatch(readResources(RESOURCES_TYPES.TASK))
  }, [])

  useEffect(() => {
    tasks && setTasksByStatus(() => transformData([...tasks].sort((a, b) => a.name - b.name)))
  }, [tasks])

  const transformData = (data) => {
    const statusMap = {
      pending: { id: "pending", title: "Pending", tasks: [] },
      completed: { id: "completed", title: "Completed", tasks: [] },
      done: { id: "done", title: "Done", tasks: [] },
    };
    data.forEach((item, index) => {
      const status = item?.content?.status;

      if (status && statusMap[status]) {
        statusMap[status].tasks.push({
          id: item._id,
          title: item.name,
          description: item.content.description
        });
      }
    });

    return Object.values(statusMap);
  }

  const addNewTask = () => {
    dispatch(createResource(
      {
        name: newTaskData.title,
        type: RESOURCES_TYPES.TASK,
        creator: userId,
        content:
        {
          status: newTaskData.status,
          description: newTaskData.description
        },
      }
    ))
    setShowAddModal(false);
    setNewTaskData({
      title: '',
      status: '',
      description: ''
    })
  }

  const handleNewTaskData = (value: string | boolean, field: string) => {
    setNewTaskData((nTask) => {
      return { ...nTask, [field]: value }
    })
  }

  const handleDeleteTask = () => {
    if (!currentTaskId) return;

    dispatch(deleteResource(currentTaskId,RESOURCES_TYPES.TASK))
    setCurrentTaskId('');
    setShowDeleteModal(false);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const sourceColumn = tasksByStatus.find(({ tasks }) =>
      tasks.some(({ id }) => id === active.id)
    );
    const destinationColumn = tasksByStatus.find(({ id }) => id === over.id);

    if (!sourceColumn || !destinationColumn || sourceColumn.id === destinationColumn.id) return;

    const storeTask = sourceColumn.tasks.find(({ id }) => id === active.id);
    if (!storeTask) return;

    const updatedSourceTasks = sourceColumn.tasks.filter(({ id }) => id !== active.id);
    const updatedDestinationTasks = [...destinationColumn.tasks, storeTask];

    let updatedResource = tasks.find(({ _id }) => _id === active.id);
    updatedResource = { ...updatedResource, content: { ...updatedResource.content, status: over.id } }
    dispatch(updateResource(
      active.id,
      RESOURCES_TYPES.TASK,
      updatedResource
    ))

    setTasksByStatus((cols) =>
      cols.map((column) =>
        column.id === sourceColumn.id
          ? { ...column, tasks: updatedSourceTasks }
          : column.id === destinationColumn.id
            ? { ...column, tasks: updatedDestinationTasks }
            : column
      )
    );
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
        <Container>

          {tasksByStatus.map((col) => {
            return (
              <Droppable key={col.id} id={col.id}>
                <Column>
                  <ContainerTitle >
                    <Title>{col.title}</Title>
                    <AddIcon onClick={() => { setShowAddModal(true); handleNewTaskData(col.id, 'status'); }} />
                  </ContainerTitle>

                  <SortableContext
                    items={col.tasks}
                    strategy={verticalListSortingStrategy}
                  >
                    {col.tasks.map((task) => (
                      <IndividualTask key={task.id}>
                        <DeleteIcon onClick={() => {
                          setCurrentTaskId(task.id);
                          setShowDeleteModal(true);
                        }}>X</DeleteIcon>
                        <Draggable key={task.id} id={task.id}>
                          <Task>
                            <TaskTitle >{task.title}</TaskTitle>
                            <TaskDescription >{task.description}</TaskDescription>
                          </Task>
                        </Draggable>
                      </IndividualTask>
                    ))}
                  </SortableContext>
                </Column>
              </Droppable>
            )
          }
          )}
        </Container>
      </DndContext>
      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <ModalText>Are you sure you want to delete this task?</ModalText>
            <ModalActions>
              <ModalButton onClick={() => setShowDeleteModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton onClick={() => handleDeleteTask()}>Delete</ModalButton>
            </ModalActions>
          </ModalContent>
        </DeleteModal>
      )}
      {showAddModal && (
        <DeleteModal>
          <ModalContent>
            <ModalInput
              type="text"
              placeholder="Enter Title"
              value={newTaskData.title}
              onChange={(e) => handleNewTaskData(e.target.value, 'title')}
            />
            <ModalTextarea
              placeholder="Enter Description"
              value={newTaskData.description}
              onChange={(e) => handleNewTaskData(e.target.value, 'description')}
            />
            <ModalActions>
              <ModalButton onClick={() => setShowAddModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton disabled={!newTaskData.title} onClick={() => addNewTask()}>Save</ModalButton>
            </ModalActions>
          </ModalContent>
        </DeleteModal>
      )}
    </div>
  );
};

export default TaskBoard;






// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
  background: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 400px;
  min-width: 25vw;
  display: flex;
  flex-direction: column;
`;

const Task = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: grab;
`;

const TaskTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const TaskDescription = styled.span`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap:1rem;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff;
  color: #ffffff;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #6eb4ff;
    outline: none;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
  
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  height: 80px;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;


const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
  font-weight: 600;
  user-select: none;

  &:hover {
    color: #007bff;
  }
`;

const AddIcon = styled(IoAddCircleOutline)`
  font-size: 24px;
  color: #007bff;

 
`;

const IndividualTask = styled.div`
position:relative
`;

const DeleteIcon = styled(FaRegTimesCircle)`
position:absolute;
right: 0.35rem;
top: 0.35rem;
cursor:pointer;
color: #007bff;
`;