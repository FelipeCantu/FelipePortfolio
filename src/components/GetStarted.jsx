import React from 'react';
import styled from 'styled-components';
import ClientIntakeWizard from './ClientIntakeWizard';
import { Helmet } from 'react-helmet-async';

function GetStarted() {
  return (
    <>
      <Helmet>
        <title>Start a Project — Felipe Cantu Jr</title>
        <meta
          name="description"
          content="Ready to build something? Tell me about your project and schedule a free discovery call with Felipe Cantu Jr, Full Stack Web Developer in Dallas, TX."
        />
        <link rel="canonical" href="https://felipecantujr.com/get-started" />
        <meta property="og:title" content="Start a Project — Felipe Cantu Jr" />
        <meta property="og:description" content="Ready to build something? Tell me about your project and schedule a free discovery call." />
        <meta property="og:url" content="https://felipecantujr.com/get-started" />
        <meta property="og:type" content="website" />
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
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light, #38bdf8);
  margin: 0 0 0.75rem;
`;

const PageTitle = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(2rem, 4.5vw, 2.85rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  margin: 0 0 0.75rem;
  line-height: 1.1;
`;

const PageSubtitle = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.60);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  margin: 0 auto;
  max-width: 500px;
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
