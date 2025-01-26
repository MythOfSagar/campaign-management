import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTasks, FaBullhorn } from 'react-icons/fa'; // Icons for Tasks and Campaigns
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/Authorize/action.ts';

const IconsContainer = styled.div`
   background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.6rem;
    border-radius: 8px;
    gap: 16px;

`;

const SidebarContainer = styled.div`
    position: fixed;
    left: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 95%;

    z-index: 1000;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${({ active }) => (active ? '#007bff' : '#333')};
  box-shadow: ${({ active }) =>
        active ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background-color: #f9f9f9;
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #555;
`;

// Sidebar Component
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {

    const location = useLocation();

    const [activePage, setActivePage] = useState<string>('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setActivePage(location.pathname.split('/')[1])
    }, [location])


    return (
        <SidebarContainer>
            <div></div>
            <IconsContainer>
                <MenuItem
                    active={activePage === 'tasks'}
                    onClick={() => navigate('/tasks')}
                    title="Tasks"
                >
                    <IconWrapper>
                        <FaTasks />
                    </IconWrapper>
                </MenuItem>

                <MenuItem
                    active={activePage === 'campaigns'}
                    onClick={() => navigate('/campaigns')}
                    title="Campaigns"
                >
                    <IconWrapper>
                        <FaBullhorn />
                    </IconWrapper>
                </MenuItem>
            </IconsContainer>
            <IconsContainer>
                <MenuItem
                    onClick={() => {dispatch(signOut());navigate('/singIn')}}
                    title="Tasks"
                >
                    <IconWrapper>
                        <CiLogout />
                    </IconWrapper>
                </MenuItem>
            </IconsContainer>


        </SidebarContainer>
    );
};

export default Sidebar;
