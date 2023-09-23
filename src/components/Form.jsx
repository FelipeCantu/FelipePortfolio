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
    width: 70%;
    height: 100%;
    margin: 100px auto;
    form {
        display: grid;
        width: 100%;
    }
    input {
        width: 100%;
        margin-bottom: 10px;
        height: 25px;
    }
    textarea {
        height: 100px;
    }
    @media (max-width: 1126px) {
        margin: auto;
        height: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
    }
`

const StyledButton = styled.button`
  background-color: ${({ isClicked }) => (isClicked ? 'green' : '#0077b5')};
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  @media (max-width: 1126px) {
    z-index: 12;
  }
`;

export default Form;