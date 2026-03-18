import React from 'react';
import styled from 'styled-components';
import ClientIntakeWizard from './ClientIntakeWizard';
import { Helmet } from 'react-helmet-async';

function GetStarted() {
  return (
    <>
      <Helmet>
        <title>Start a Project - Felipe Cantu Jr</title>
        <meta
          name="description"
          content="Tell me about your project and schedule a discovery call with Felipe Cantu Jr."
        />
        <link rel="canonical" href="/get-started" />
      </Helmet>

      <MainContainer>
        <BackgroundOverlay>
          <BackgroundImage />
          <BackgroundOverlayColor />
        </BackgroundOverlay>

        <ContentWrapper>
          <PageHeader>
            <EyebrowLabel>Let's Build Something</EyebrowLabel>
            <PageTitle>Start Your Project</PageTitle>
            <PageSubtitle>
              Answer a few quick questions and I'll reach out within 24 hours to schedule a discovery call.
            </PageSubtitle>
          </PageHeader>

          <WizardCard>
            <ClientIntakeWizard />
          </WizardCard>
        </ContentWrapper>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: calc(80px + 1rem);

  @media (min-width: 640px) {
    padding: 2rem 1rem;
    padding-top: calc(70px + 2rem);
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
    padding-top: 4rem;
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
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
`;

const EyebrowLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3498db;
  margin: 0 0 0.75rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.75rem;
  line-height: 1.15;

  @media (min-width: 640px) {
    font-size: 2.75rem;
  }
`;

const PageSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.65);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  max-width: 520px;
  margin-inline: auto;
`;

const WizardCard = styled.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(20px);
    z-index: -1;
    pointer-events: none;
  }

  @media (min-width: 640px) {
    padding: 2.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

export default GetStarted;
