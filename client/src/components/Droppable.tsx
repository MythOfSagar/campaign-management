import React from "react";

import { useDroppable } from "@dnd-kit/core";

const Droppable: React.FC<{ id: string; children: React.ReactNode }> = ({
    id,
    children,
}) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        backgroundColor: isOver ? "#e0f7fa" : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
};

export default Droppable