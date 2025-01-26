import styled from 'styled-components';


export const Container = styled.div`
  height: 100vh;
  background: linear-gradient(360deg, #0c0e17, #4c5ee1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
`;

export const FormWrapper = styled.div`
background-color: #fff;
padding: 30px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
width: 100%;
max-width: 400px;
`;

export const Title = styled.h2`
font-size: 24px;
text-align: center;
margin-bottom: 20px;
color: #333;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
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

export const SubmitButton = styled.button`
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

export const RedirectLink = styled.p`
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
