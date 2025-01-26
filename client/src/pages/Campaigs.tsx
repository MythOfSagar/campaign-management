import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { FaPlus } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { RESOURCES_TYPES } from "../constants.ts";

import Upload from "../components/Upload.tsx";

import { SHOW_LOADER } from "../redux/Notification/actiontypes.ts";
import { createResource, readResources } from "../redux/Resource/action.ts";

const Campaigns = () => {


  const dispatch = useDispatch()

  const [showAddModal, setShowAddModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [triggerUpload, setTriggerUpload] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ description: "" });
  const campaignss = useSelector((state: any) => state?.resource?.[RESOURCES_TYPES.CAMPAIGN]);
  const userId = useSelector((state: any) => state?.auth?.loginData?.userId);

  const handleAddCampaign = (image: string) => {
    dispatch(createResource(
      {
        type: RESOURCES_TYPES.CAMPAIGN,
        creator: userId,
        name: '-',
        content:
        {
          description: newCampaign.description,
          image: image
        },
      }
    ))
    setShowAddModal(false);
    setNewCampaign({ description: "" });
    setShowAddModal(false);
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SHOW_LOADER })
    setTriggerUpload(true)
  }


  useEffect(() => {
    dispatch(readResources(RESOURCES_TYPES.CAMPAIGN))
  }, [])

  return (
    <Container>
      <Header>
        <AddButton onClick={() => {setShowAddModal(true)}}>
          <FaPlus /> Add Campaign
        </AddButton>
      </Header>

      <CampaignGrid>
        {campaignss?.map((campaign) => (
          <Card key={campaign._id}>
            <Image src={campaign.content.image} alt="Campaign" />
            <Description>{campaign.content.description}</Description>
          </Card>
        ))}
      </CampaignGrid>

      {showAddModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add New Campaign</ModalHeader>
            <ModalForm >
              <Upload 
              triggerUpload={triggerUpload}
              onUpload={(image) => handleAddCampaign(image)}
              onSelect={() => setDisableSubmit(false)} />
              <Input
                type="text"
                placeholder="Description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
              <SubmitButton disabled={disableSubmit} type="submit" onClick={(e) => handleCampaignSubmit(e)}>Add Campaign</SubmitButton>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Campaigns;

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Description = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
  color: #333;
  flex: 1;
  word-wrap: break-word;
  max-width: 100%;
`;



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:100;

`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.h2`
  margin-bottom: 1rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
    &:disabled {
    background-color:rgb(146 207 150);
    pointer-events:none
  }
`;