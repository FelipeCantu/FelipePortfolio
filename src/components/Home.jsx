import styled from "styled-components";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="As a Full Stack Developer, I'm a tech enthusiast with a strong background in computer technology, proficient in front-end and back-end development." />
        <link rel="canonical" href="/Home" />
      </Helmet>
      <Main>
        <BackgroundImage src="images/mainbg.jpg" alt="Background" />
        <Wrapper>
          <ContentContainer>
            <Avatar src="images/avatarpic.png" alt="Profile" />
            <Title>Full Stack Web Developer</Title>
            <Description>
              As a Full Stack Developer, I am a highly motivated tech enthusiast and a skilled problem solver. My journey in the world of technology has been characterized by a strong background in computer technology, which has equipped me with a solid foundation in both front-end and back-end development.
            </Description>
          </ContentContainer>
          <SocialIcons>
            <IconLink href="https://github.com/FelipeCantu" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/felipe-cantu-jr/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </IconLink>
            <IconLink href="https://www.instagram.com/son_of_robot_/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </IconLink>
            <IconLink href="https://www.facebook.com/profile.php?id=100064306140476" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </IconLink>
          </SocialIcons>
        </Wrapper>
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.7);
  padding: 2rem;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 300px) minmax(300px, 600px);
  grid-template-rows: auto auto;
  gap: 2rem;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  color: white;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const Avatar = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 50%;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: center;

  @media (max-width: 768px) {
    max-width: 200px;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin: 0;
  text-decoration: underline;
  align-self: end;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  margin: 0;
  align-self: start;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialIcons = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    justify-content: center;
    width: 100%;
  }
`;

const IconLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ href }) => 
      href.includes('linkedin') ? '#0077b5' : 
      href.includes('github') ? '#6e5494' : 
      href.includes('instagram') ? '#E1306C' :
      '#1877f2'}; /* Facebook blue */
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export default Home;