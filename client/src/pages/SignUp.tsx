import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { signUp } from '../redux/Authorize/action.ts';
import { ROUTES } from '../constants.ts';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName:''
    });


    const dispatch = useDispatch()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueWithoutSpace = e.target.value.replace(/\s+/g, ""); 
        setFormData({ ...formData, [e.target.name]: valueWithoutSpace });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signUp(formData))
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Create an Account</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="userName"
                        placeholder="User Name"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                    <SubmitButton type="submit">Sign Up</SubmitButton>
                </Form>
                <LoginLink>
                    Already have an account? <Link to={ROUTES.SIGN_IN}>Click here</Link>
                </LoginLink>
            </FormWrapper>
        </Container>
    );
};

export default SignUp;










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
