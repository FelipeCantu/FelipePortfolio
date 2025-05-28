import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes } from 'styled-components';

export const Form = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowError(false);

        try {
            // Get form values directly from form elements
            const formElements = form.current.elements;
            const userName = formElements.user_name.value;
            const userEmail = formElements.user_email.value;
            const userMessage = formElements.message.value;

            // 1. Send the main email (to you)
            await emailjs.sendForm(
                'service_qergbjn', 
                'template_purd9i6', 
                form.current, 
                'sfy94T_0JRB3qPReX'
            );

            // 2. Send thank you email to the user
            await emailjs.send(
                'service_qergbjn',
                'template_u6wlz5m',
                {
                    to_email: userEmail,
                    to_name: userName,
                    from_name: 'Felipe Cantu Jr',
                    user_message: userMessage
                },
                'sfy94T_0JRB3qPReX'
            );

            console.log('Emails sent successfully!');
            setShowSuccess(true);
            form.current.reset();

            setTimeout(() => setShowSuccess(false), 5000);

        } catch (error) {
            console.error('Failed to send email:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormData>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" required />
                <label>Email</label>
                <input type="email" name="user_email" required />
                <label>Message</label>
                <textarea name="message" required />
                <StyledButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </StyledButton>
            </form>

            {/* Success Alert */}
            {showSuccess && (
                <SuccessAlert>
                    <AlertIcon>✓</AlertIcon>
                    <AlertContent>
                        <AlertTitle>Message Sent Successfully!</AlertTitle>
                        <AlertMessage>
                            Thank you for reaching out. We've received your message and will get back to you soon.
                        </AlertMessage>
                    </AlertContent>
                    <CloseButton onClick={() => setShowSuccess(false)}>×</CloseButton>
                </SuccessAlert>
            )}

            {/* Error Alert */}
            {showError && (
                <ErrorAlert>
                    <AlertIcon>⚠</AlertIcon>
                    <AlertContent>
                        <AlertTitle>Failed to Send Message</AlertTitle>
                        <AlertMessage>
                            Sorry, there was an error sending your message. Please try again or contact us directly.
                        </AlertMessage>
                    </AlertContent>
                    <CloseButton onClick={() => setShowError(false)}>×</CloseButton>
                </ErrorAlert>
            )}
        </FormData>
    );
};

// Animations
const slideIn = keyframes`
    from {
        transform: translateY(-100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

const FormData = styled.div`
    width: 70%;
    height: 100%;
    margin: 100px auto;
    position: relative;
    
    form {
        display: grid;
        width: 100%;
        gap: 15px;
    }
    
    label {
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
    }
    
    input, textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        
        &:focus {
            outline: none;
            border-color: #0077b5;
            box-shadow: 0 0 0 3px rgba(0, 119, 181, 0.1);
        }
    }
    
    input {
        height: 45px;
    }
    
    textarea {
        height: 120px;
        resize: vertical;
        font-family: inherit;
    }
    
    @media (max-width: 1126px) {
        margin: auto;
        height: 100%;
        padding: 40px 20px;
        width: 90%;
    }
`;

const StyledButton = styled.button`
    background: linear-gradient(135deg, #0077b5 0%, #005885 100%);
    color: white;
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-top: 10px;
    
    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #005885 0%, #003d5c 100%);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 119, 181, 0.3);
    }
    
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    @media (max-width: 1126px) {
        z-index: 12;
    }
`;

// Alert Components
const BaseAlert = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    animation: ${slideIn} 0.5s ease-out;
    z-index: 1000;
    max-width: 400px;
    min-width: 300px;
    
    @media (max-width: 768px) {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
        min-width: auto;
    }
`;

const SuccessAlert = styled(BaseAlert)`
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    border-left: 5px solid #2e7d32;
`;

const ErrorAlert = styled(BaseAlert)`
    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
    color: white;
    border-left: 5px solid #c62828;
`;

const AlertIcon = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-right: 12px;
    animation: ${pulse} 2s infinite;
    min-width: 24px;
`;

const AlertContent = styled.div`
    flex: 1;
`;

const AlertTitle = styled.h4`
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
`;

const AlertMessage = styled.p`
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    margin-left: 12px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
        opacity: 1;
    }
`;

export default Form;