import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { signUp } from '../redux/Authorize/action.ts';
import { ROUTES } from '../constants.ts';
import { Container, Form, FormWrapper, Input, RedirectLink, SubmitButton, Title } from '../styled-elements/styled-elements.ts';


const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: ''
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
        <Form onSubmit={(event)=>handleSubmit(event)}>
          <Input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={(event)=>handleChange(event)}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(event)=>handleChange(event)}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(event)=>handleChange(event)}
            required
          />
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
        <RedirectLink>
          Already have an account? <Link to={ROUTES.SIGN_IN}>Click here</Link>
        </RedirectLink>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;