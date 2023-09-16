import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';

export const Form = () => {
    const form = useRef();
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
    }

    const sendEmail = (e) => {

        e.preventDefault();

        emailjs.sendForm('service_qergbjn', 'template_purd9i6', form.current, 'sfy94T_0JRB3qPReX')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <FormData>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <StyledButton type="submit" value='send' isClicked={isClicked} onClick={handleButtonClick}>
                    Send
                </StyledButton>
            </form>
        </FormData>
    );
};

const FormData = styled.div`  
    form {
        display: grid;
        align-items: center;
        justify-content: center;
    }
`

const StyledButton = styled.button`
  background-color: ${({ isClicked }) => (isClicked ? 'green' : 'gray')};
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
`;

export default Form

