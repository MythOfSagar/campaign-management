import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { resetPassword } from '../redux/Authorize/action.ts';
import { ROUTES } from '../constants.ts';
import { Container, Form, FormWrapper, Input, RedirectLink, SubmitButton, Title } from '../styled-elements/styled-elements.ts';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()


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
    dispatch(resetPassword(modFormData))
    navigate(ROUTES.SIGN_IN)
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Reset Password</Title>
        <Form onSubmit={(event)=>handleSubmit(event)}>
          <Input
            type="text"
            name="userId"
            placeholder="Email or User Name"
            value={formData.userId}
            onChange={(event)=>handleChange(event)}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={(event)=>handleChange(event)}
            required
          />
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </Form>
        <RedirectLink>
          Dont't have an account? <Link to={ROUTES.SIGN_UP}>Click Here</Link>
        </RedirectLink>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;