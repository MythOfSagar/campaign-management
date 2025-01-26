import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import axios from 'axios';

const Upload = ({ onUpload,onSelect, triggerUpload }: {
  onUpload: (url: string) => void;
  onSelect: (isSelected: boolean) => void;
  triggerUpload: boolean
}) => {
  const [img, setImg] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!img) return;

    const data = new FormData();
    data.append('file', img);
    const up :any= process.env.REACT_APP_UPLOAD_PRESET
    data.append('upload_preset',up );

    try {
      const api = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      onUpload(secure_url); 
    } catch (error) {
      console.error(error);
      onUpload('');
    }
  };

  useEffect(() => {
    if (triggerUpload) {
      uploadFile();
    }
  }, [triggerUpload]);

  return (
    <Container>
      <div>
        <Label htmlFor="img">Image:</Label>
        <Input
          type="file"
          accept="image/*"
          id="img"
          onChange={(e) => {setImg(e?.target?.files?.[0] || null);onSelect(false)}}
        />
      </div>
    </Container>
  );
};

export default Upload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 2rem auto;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`
