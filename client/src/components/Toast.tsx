import React, { useState, useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai';

type ToastStatus = 'success' | 'info' | 'error';


const Toast = ({ status, message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); 
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const statusIcons = {
    success: <AiOutlineCheckCircle />,
    info: <AiOutlineInfoCircle />,
    error: <AiOutlineCloseCircle />,
  };

  const borderColor = {
    success: '#28a745',
    info: '#007bff',
    error: '#dc3545',
  };

  return (
    <ToastContainer visible={visible} style={{ borderColor: borderColor[status] }}>
      <IconWrapper status={status}>{statusIcons[status]}</IconWrapper>
      <Message>{message}</Message>
    </ToastContainer>
  );
};

export default Toast;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ToastContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  border-left: 4px solid;
  max-width: 300px;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const IconWrapper = styled.div<{ status: ToastStatus }>`
  font-size: 20px;
  color: ${({ status }) =>
    status === 'success' ? '#28a745' : status === 'info' ? '#007bff' : '#dc3545'};
`;

const Message = styled.span`
  font-size: 14px;
  color: #333;
`;