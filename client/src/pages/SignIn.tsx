import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { signIn } from '../redux/Authorize/action.ts';
import { ROUTES } from '../constants.ts';
import { Container, Form, FormWrapper, Input, RedirectLink, SubmitButton, Title } from '../styled-elements/styled-elements.ts';


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
        <RedirectLink>
          Forgot Password? <Link to={ROUTES.RESET_PASSWORD}>Click Here</Link>
        </RedirectLink>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;