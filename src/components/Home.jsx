import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Full Stack Developer portfolio" />
        <link rel="canonical" href="/Home" />
      </Helmet>
      <Main>
        <BackgroundImage src="images/mainbg.jpg" alt="Background" />
        <Wrapper>
          {/* Enhanced Pulsing Background Circles */}
          <PulsingCircles>
            <PulseCircle size="200px" border="2px solid rgba(247, 171, 10, 0.5)" animation="ping" />
            <PulseCircle size="300px" border="2px solid rgba(51, 51, 51, 0.7)" animation="rotate" duration="40s" />
            <PulseCircle size="500px" border="3px solid rgba(51, 51, 51, 0.5)" animation="rotate" duration="60s" reverse />
            <PulseCircle size="650px" border="4px solid rgba(247, 171, 10, 0.3)" opacity="0.3" animation="rotate" duration="80s" />
            <PulseCircle size="800px" border="3px solid rgba(51, 51, 51, 0.4)" animation="rotate" duration="100s" reverse />
            {/* New massive outer circle */}
            <PulseCircle 
              size="1200px" 
              border="4px solid rgba(247, 171, 10, 0.2)" 
              opacity="0.15" 
              animation="rotate" 
              duration="150s" 
            />
          </PulsingCircles>

          {/* Enhanced Orbit Background */}
          <OrbitBackground>
            {/* New massive orbit ring */}
            <OvalOrbitRing 
              width="1100px" 
              height="900px" 
              border="3px dotted rgba(100, 200, 255, 0.2)" 
              animation="rotate" 
              duration="120s" 
              reverse
            />
            
            {/* Existing orbit rings */}
            <OvalOrbitRing width="600px" height="400px" border="2px dashed rgba(100, 200, 255, 0.4)" animation="rotate" duration="50s" />
            <OvalOrbitRing width="450px" height="300px" border="2px dotted rgba(255, 255, 255, 0.3)" animation="rotate" duration="40s" reverse />
            <OvalOrbitRing width="300px" height="200px" border="2px solid rgba(0, 191, 255, 0.25)" animation="rotate" duration="30s" />
            
            {/* Enhanced Orbiting Elements */}
            <OrbitingElements>
              {/* New massive orbiting elements */}
              <OrbitCircle 
                delay="0s" 
                size="20px" 
                radiusX="550px" 
                radiusY="450px" 
                duration="60s" 
                color="rgba(247, 171, 10, 0.7)" 
              />
              <OrbitCircle 
                delay="30s" 
                size="16px" 
                radiusX="550px" 
                radiusY="450px" 
                duration="60s" 
                reverse 
                color="rgba(100, 200, 255, 0.7)" 
              />
              
              {/* Existing orbiting elements */}
              <OrbitCircle delay="0s" size="16px" radiusX="280px" radiusY="180px" duration="30s" color="rgba(30, 144, 255, 0.9)" />
              <OrbitCircle delay="10s" size="12px" radiusX="280px" radiusY="180px" duration="30s" reverse color="rgba(247, 171, 10, 0.8)" />
              
              <OrbitCircle delay="3s" size="14px" radiusX="200px" radiusY="130px" duration="25s" color="rgba(100, 200, 255, 0.8)" />
              <OrbitCircle delay="7s" size="10px" radiusX="200px" radiusY="130px" duration="25s" reverse color="rgba(255, 255, 255, 0.8)" />
              
              <OrbitCircle delay="5s" size="12px" radiusX="120px" radiusY="80px" duration="20s" color="rgba(0, 191, 255, 0.8)" />
              <OrbitCircle delay="2s" size="18px" radiusX="120px" radiusY="80px" duration="20s" reverse color="rgba(247, 171, 10, 0.8)" />
              
              <OrbitDot delay="0s" radiusX="300px" radiusY="200px" duration="35s" size="10px" glow="0 0 15px rgba(255, 255, 255, 0.8)" />
              <OrbitDot delay="5s" radiusX="300px" radiusY="200px" duration="35s" reverse size="10px" glow="0 0 15px rgba(100, 200, 255, 0.8)" />
              <OrbitDot delay="2s" radiusX="220px" radiusY="150px" duration="28s" size="8px" glow="0 0 12px rgba(247, 171, 10, 0.8)" />
              <OrbitDot delay="7s" radiusX="220px" radiusY="150px" duration="28s" reverse size="8px" glow="0 0 12px rgba(255, 255, 255, 0.8)" />
              <OrbitDot delay="4s" radiusX="150px" radiusY="100px" duration="22s" size="6px" glow="0 0 10px rgba(0, 191, 255, 0.8)" />
            </OrbitingElements>
          </OrbitBackground>

          <ContentContainer>
            <AvatarContainer>
              <OvalAvatar src="images/avatarpic.png" alt="Profile" />
            </AvatarContainer>

            <TextContent>
              <Title>Full Stack Web Developer</Title>
              <Description>
                As a Full Stack Developer, I am a highly motivated tech enthusiast and skilled problem solver with expertise in both front-end and back-end development.
              </Description>
              <LearnMoreLink to="/about">Learn more &nbsp;→</LearnMoreLink>
            </TextContent>
          </ContentContainer>
          
          <SocialIcons>
            <IconLink href="https://github.com/FelipeCantu" target="_blank">
              <FaGithub />
            </IconLink>
            <IconLink href="https://linkedin.com/in/felipe-cantu-jr" target="_blank">
              <FaLinkedin />
            </IconLink>
            <IconLink href="https://instagram.com/son_of_robot_" target="_blank">
              <FaInstagram />
            </IconLink>
            <IconLink href="https://facebook.com/profile.php?id=100064306140476" target="_blank">
              <FaFacebook />
            </IconLink>
          </SocialIcons>
        </Wrapper>
      </Main>
    </>
  );
}

// Animations
const ovalOrbit = keyframes`
  0% { transform: rotate(0deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(-360deg); }
`;

const ovalOrbitReverse = keyframes`
  0% { transform: rotate(0deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.1; }
`;

const ping = keyframes`
  0% { transform: scale(0.8); opacity: 0.8; }
  70% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(0.8); opacity: 0; }
`;

const rotate = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const rotateReverse = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(-360deg); }
`;

// Entrance animations
const fadeInScale = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0.5) rotate(-10deg);
  }
  100% { 
    opacity: 1; 
    transform: scale(1) rotate(0deg);
  }
`;

const slideInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(60px);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(-60px);
  }
  100% { 
    opacity: 1; 
    transform: translateX(0);
  }
`;

const popIn = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0) translateY(20px);
  }
  50% {
    transform: scale(1.1) translateY(-5px);
  }
  100% { 
    opacity: 1; 
    transform: scale(1) translateY(0);
  }
`;

const backgroundZoom = keyframes`
  0% { 
    transform: scale(1.2);
    filter: blur(10px);
  }
  100% { 
    transform: scale(1);
    filter: blur(0px);
  }
`;

// Styled Components
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
  animation: ${backgroundZoom} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 30, 0.85);
  padding: 2rem;
  position: relative;
  animation: fadeIn 0.8s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PulsingCircles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const PulseCircle = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  border: ${props => props.border};
  border-radius: 50%;
  opacity: ${props => props.opacity || 0.2};
  /*
   * Removed margin-top: 13rem — it was pushing the ring group far below
   * the visual center of the hero. These are absolutely positioned within
   * PulsingCircles which is itself centered with translate(-50%, -50%).
   */
  animation: ${props =>
    props.animation === 'ping' ? ping :
    props.animation === 'rotate' ?
      (props.reverse ? rotateReverse : rotate) :
      pulse}
    ${props => props.duration || '2.5s'}
    ${props => props.animation === 'ping' ? 'ease-out' : 'linear'}
    infinite;

  /* Respect user's motion preference */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const OrbitBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 2rem;
  z-index: 2;
  position: relative;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: center;
    gap: 4rem;
  }
`;

const OvalOrbitRing = styled.div`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props => props.border};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => props.reverse ? rotateReverse : rotate} 
    ${props => props.duration || '30s'} linear infinite;
  opacity: ${props => props.opacity || 0.5};
`;

const OrbitingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const OrbitCircle = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color || 'radial-gradient(circle, #1e90ff, #00bfff)'};
  border-radius: 50%;
  --radiusX: ${props => props.radiusX};
  --radiusY: ${props => props.radiusY};
  animation: ${props => props.reverse ? ovalOrbitReverse : ovalOrbit} 
    ${props => props.duration} linear infinite;
  animation-delay: ${props => props.delay};
  box-shadow: 0 0 20px ${props => props.color || 'rgba(30, 144, 255, 0.7)'};
  z-index: 1;
`;

const OrbitDot = styled.div`
  position: absolute;
  width: ${props => props.size || '8px'};
  height: ${props => props.size || '8px'};
  background: white;
  border-radius: 50%;
  --radiusX: ${props => props.radiusX};
  --radiusY: ${props => props.radiusY};
  animation: ${props => props.reverse ? ovalOrbitReverse : ovalOrbit} 
    ${props => props.duration} linear infinite;
  animation-delay: ${props => props.delay};
  box-shadow: ${props => props.glow || '0 0 10px white'};
  z-index: 1;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 220px;
  height: 250px;
  z-index: 2;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: linear-gradient(135deg, rgba(0,191,255,0.3), rgba(30,144,255,0.1));
  padding: 8px;
  animation: ${fadeInScale} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const OvalAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  filter: sepia(0.1) brightness(1.05);
  transition: all 0.4s ease;
  
  &:hover {
    transform: scale(1.03) rotate(2deg);
    filter: sepia(0) brightness(1.1);
  }
`;

const TextContent = styled.div`
  max-width: 560px;
  color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  animation: ${slideInRight} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
`;

const Title = styled.h1`
  /*
   * Syne at this size has just enough quirk to be memorable.
   * Gradient anchors at the accent blue and fades to pure white —
   * matches the color system in index.css.
   */
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  background: linear-gradient(110deg, var(--color-accent-light, #38bdf8) 0%, #ffffff 55%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${slideInUp} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s backwards;
`;

const Description = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  font-weight: 300;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.80);
  animation: ${slideInUp} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards;
`;

const LearnMoreLink = styled(Link)`
  /*
   * Replaced float:right (broken in a flex column context) with
   * align-self so it naturally left-aligns under the description
   * text while still sitting at the end of the flex column flow.
   */
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  margin-top: 1.5rem;
  padding: 0.55rem 1.25rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-accent-light, #38bdf8);
  text-decoration: none;
  border: 1.5px solid rgba(14, 165, 233, 0.38);
  border-radius: 9999px;
  background: rgba(14, 165, 233, 0.08);
  transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.22s ease;

  &:hover {
    background: rgba(14, 165, 233, 0.18);
    border-color: var(--color-accent, #0ea5e9);
    color: white;
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`;

const SocialIcons = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  display: flex;
  gap: 1.25rem;
  z-index: 3;
  /*
   * Padding gives the box-shadow glow on each icon room to render
   * without being clipped by Main's overflow:hidden. The bottom/right
   * values account for the absolute positioning offset so the visual
   * placement stays identical.
   */
  padding: 12px;
  margin: -12px;

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    margin-left: -12px;
    margin-right: -12px;
    justify-content: center;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  animation: ${popIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;

  &:nth-child(1) { animation-delay: 1.1s; }
  &:nth-child(2) { animation-delay: 1.25s; }
  &:nth-child(3) { animation-delay: 1.4s; }
  &:nth-child(4) { animation-delay: 1.55s; }

  &:hover {
    color: white;
    transform: translateY(-4px);
    background: ${({ href }) =>
      href.includes('linkedin') ? 'rgba(0, 119, 181, 0.35)' :
      href.includes('github')   ? 'rgba(110, 84, 148, 0.35)' :
      href.includes('instagram')? 'rgba(225, 48, 108, 0.35)' :
                                  'rgba(24, 119, 242, 0.35)'};
    border-color: ${({ href }) =>
      href.includes('linkedin') ? 'rgba(0, 119, 181, 0.7)' :
      href.includes('github')   ? 'rgba(110, 84, 148, 0.7)' :
      href.includes('instagram')? 'rgba(225, 48, 108, 0.7)' :
                                  'rgba(24, 119, 242, 0.7)'};
    box-shadow: ${({ href }) =>
      href.includes('linkedin') ? '0 4px 16px rgba(0, 119, 181, 0.25)' :
      href.includes('github')   ? '0 4px 16px rgba(110, 84, 148, 0.25)' :
      href.includes('instagram')? '0 4px 16px rgba(225, 48, 108, 0.25)' :
                                  '0 4px 16px rgba(24, 119, 242, 0.25)'};
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`;

export default Home;