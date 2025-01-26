import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { signIn } from '../redux/Authorize/action.ts';
import { ROUTES } from '../constants.ts';

const SignIn = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const dispatch = useDispatch()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modFormData = {
      password: formData.password
    }
    if (formData.userId.includes('@')) {
      modFormData['email'] = formData.userId
    } else {
      modFormData['userName'] = formData.userId
    }
    dispatch(signIn(modFormData))
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="userId"
            placeholder="Email or User Name"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">Sign In</SubmitButton>
        </Form>
        <LoginLink>
          Forgot Password? <Link to={ROUTES.RESET_PASSWORD}>Click Here</Link>
        </LoginLink>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;










const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
