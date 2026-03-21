import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { FaGithub, FaLinkedin, FaInstagram, FaMapPin, FaPhoneAlt, FaFacebook } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const contactInfo = [
  {
    icon: FaMapPin,
    label: "Address",
    value: "Dallas, TX",
    href: null
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "817-999-7951",
    href: "tel:817-999-7951"
  },
  {
    icon: MdEmail,
    label: "Email",
    value: "cantujr.felipe@gmail.com",
    href: "mailto:cantujr.felipe@gmail.com"
  }
];

const socialLinks = [
  {
    href: "https://github.com/FelipeCantu",
    icon: FaGithub,
    label: "GitHub",
    color: "#6e5494"
  },
  {
    href: "https://www.linkedin.com/in/felipe-cantu-jr/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "#0077b5"
  },
  {
    href: "https://www.instagram.com/son_of_robot_/",
    icon: FaInstagram,
    label: "Instagram",
    color: "#e4405f"
  },
  {
    href: "https://www.facebook.com/profile.php?id=100064306140476",
    icon: FaFacebook,
    label: "Facebook",
    color: "#1877f2"
  }
];

function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact - Felipe Cantu Jr</title>
        <meta
          name="description"
          content="Say hello to Felipe Cantu Jr — reach out for general inquiries, questions, or just to connect."
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
      
      <MainContainer>
        <BackgroundOverlay>
          <BackgroundImage />
          <BackgroundOverlayColor />
        </BackgroundOverlay>
        
        <ContentWrapper>
          <ContentGrid>
            <FormSection>
              <FormHeader>
                <FormTitle>Say Hello</FormTitle>
                <FormSubtitle>
                  Have a question or just want to connect? Send me a message and I'll get back to you soon.
                </FormSubtitle>
                <CollabBlock>
                  <CollabHeading>Let's Collaborate</CollabHeading>
                  <CollabNote>
                    Open to working with other developers—if you're building something interesting, I'd love to hear about it.
                  </CollabNote>
                  <StartProjectNote>
                    <StartProjectLink to="/get-started">👉 Start a project</StartProjectLink>
                  </StartProjectNote>
                </CollabBlock>
              </FormHeader>
              <StyledFormWrapper>
                <Form />
              </StyledFormWrapper>
            </FormSection>
            
            <InfoSection>
              <InfoHeader>
                <InfoTitle>
                  Find Me Here
                  <TitleUnderline />
                </InfoTitle>
                <InfoSubtitle>
                  Prefer a direct line? Here's where you can reach me.
                </InfoSubtitle>
              </InfoHeader>
              
              <ContactDetails>
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  const content = (
                    <ContactCard>
                      <ContactIcon>
                        <IconComponent />
                      </ContactIcon>
                      <ContactTextContent>
                        <ContactLabel>{item.label}</ContactLabel>
                        <ContactValue>{item.value}</ContactValue>
                      </ContactTextContent>
                    </ContactCard>
                  );
                  
                  return item.href ? (
                    <ContactLink 
                      key={index}
                      href={item.href}
                      aria-label={`${item.label}: ${item.value}`}
                    >
                      {content}
                    </ContactLink>
                  ) : (
                    <ContactCardWrapper key={index}>
                      {content}
                    </ContactCardWrapper>
                  );
                })}
              </ContactDetails>
              
              <SocialContainer>
                <SocialTitle>Connect With Me</SocialTitle>
                <SocialLinks>
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      $hoverColor={social.color}
                    >
                      <SocialIconContainer>
                        <social.icon />
                      </SocialIconContainer>
                    </SocialLink>
                  ))}
                </SocialLinks>
              </SocialContainer>
            </InfoSection>
          </ContentGrid>
        </ContentWrapper>
      </MainContainer>
    </>
  );
}

// Styled Components
const MainContainer = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: calc(80px + 1rem); /* Increased space for mobile navbar */

  @media (min-width: 640px) {
    padding: 2rem 1rem;
    padding-top: calc(70px + 2rem); /* Adjusted for tablet */
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    padding-top: calc(60px + 2rem);
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BackgroundOverlayColor = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    border-radius: 20px;
  }
`;

const FormSection = styled.section`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }

  @media (min-width: 1280px) {
    padding: 3rem;
  }
`;

/* ── Collaboration block — groups heading, body, and CTA below the subtitle ── */
const CollabBlock = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const CollabHeading = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  margin: 0 0 0.45rem;
`;

const CollabNote = styled.p`
  font-size: 0.875rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.65;
  margin: 0 0 0.75rem;
`;

const StartProjectNote = styled.p`
  margin: 0;
`;

const StartProjectLink = styled(Link)`
  display: inline-block;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent-light, #38bdf8);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(14, 165, 233, 0.4);
  transition: color 0.2s ease, text-decoration-color 0.2s ease;

  &:hover {
    color: white;
    text-decoration-color: rgba(14, 165, 233, 0.9);
  }
`;

const FormHeader = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const FormTitle = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  line-height: 1.1;
`;

const FormSubtitle = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  font-weight: 300;
`;

const StyledFormWrapper = styled.div`
  input, textarea, select {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    color: white !important;
    background: rgba(255, 255, 255, 0.07) !important;
    border: 1px solid rgba(255, 255, 255, 0.14) !important;
    border-radius: var(--radius-sm, 6px) !important;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease !important;
    &::placeholder { color: rgba(255, 255, 255, 0.35) !important; }
    &:focus {
      border-color: var(--color-accent, #0ea5e9) !important;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18) !important;
      background: rgba(255, 255, 255, 0.10) !important;
      outline: none !important;
    }
  }
  label {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    color: rgba(255, 255, 255, 0.82) !important;
    font-weight: 500 !important;
    font-size: 0.88rem !important;
    letter-spacing: 0.02em !important;
  }
  button[type="submit"] {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    background-color: var(--color-accent, #0ea5e9) !important;
    color: white !important;
    border: 2px solid var(--color-accent, #0ea5e9) !important;
    font-weight: 700 !important;
    letter-spacing: 0.03em !important;
    transition: all 0.25s ease !important;
    border-radius: 9999px !important;
    &:hover:not(:disabled) {
      background-color: transparent !important;
      color: var(--color-accent-light, #38bdf8) !important;
      border-color: var(--color-accent, #0ea5e9) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 16px rgba(14, 165, 233, 0.22) !important;
    }
  }
`;

const InfoSection = styled.section`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }

  @media (min-width: 1280px) {
    padding: 3rem;
  }
`;

const InfoHeader = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  position: relative;
  padding-bottom: 1rem;
  line-height: 1.1;
`;

const TitleUnderline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  /* Unified accent — matches the single blue defined in CSS vars */
  width: 3rem;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8));
  border-radius: 2px;
`;

const InfoSubtitle = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  font-weight: 300;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }
`;

const ContactCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md, 12px);
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  /* Shimmer sweep on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }

  &:hover {
    background: rgba(14, 165, 233, 0.06);
    border-color: rgba(14, 165, 233, 0.25);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }
`;

const ContactLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-3px);
  }
`;

const ContactCardWrapper = styled.div`
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-3px);
  }
`;

const ContactIcon = styled.div`
  flex-shrink: 0;
  margin-top: 0.125rem;
  transition: transform 0.3s ease;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--color-accent-light, #38bdf8);
    transition: color 0.3s ease;

    @media (min-width: 640px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  ${ContactCard}:hover & {
    transform: scale(1.15) rotate(5deg);

    svg {
      color: var(--color-accent, #0ea5e9);
    }
  }
`;

const ContactTextContent = styled.div`
  min-width: 0;
  flex: 1;
`;

const ContactLabel = styled.h3`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-accent-light, #38bdf8);
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  transition: color 0.3s ease;

  ${ContactCard}:hover & {
    color: var(--color-accent, #0ea5e9);
  }
`;

const ContactValue = styled.p`
  color: white;
  font-size: 0.9rem;
  word-break: break-word;
  margin: 0;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const SocialContainer = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 640px) {
    padding-top: 2rem;
  }
`;

const SocialTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  @media (min-width: 640px) {
    gap: 1.25rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.$hoverColor || '#3b82f6'};
    transform: scale(0);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.$hoverColor || '#3b82f6'};
    
    &::before {
      transform: scale(1);
    }
    
    &::after {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

const SocialIconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  svg {
    width: 1rem;
    height: 1rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

    @media (min-width: 640px) {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  ${SocialLink}:hover & svg {
    transform: scale(1.2) rotate(5deg);
    color: white;
  }
`;

export default Contact;