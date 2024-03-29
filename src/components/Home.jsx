import styled from "styled-components";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Helmet } from 'react-helmet-async'

function Home() {
  return (
    <>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="As a Full Stack Developer, I'm a tech enthusiast with a strong background in computer technology, proficient in front-end and back-end development." />
      <link rel="canonical" href="/Home" />
    </Helmet>
      <Main>
        <img src="images/mainbg.jpg" />
        <Wapper>
          <Container>
            <img src="images/avatarpic.png" />
            <h1>Full Stack Web Developer</h1>
            <p>As a Full Stack Developer, I am a highly motivated tech enthusiast and a skilled problem solver. My journey in the world of technology has been characterized by a strong background in computer technology, which has equipped me with a solid foundation in both front-end and back-end development.</p>
          </Container>
          <Icons>
            <h1>
              <a href="https://github.com/FelipeCantu" target="_blank"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/felipe-cantu-jr/" target="_blank"><FaLinkedin /></a>
              <a href="https://www.instagram.com/son_of_robot_/" target="_blank"><FaInstagram /></a>
            </h1>
          </Icons>
        </Wapper>
      </Main>
    </>
  )
}


const Main = styled.div`
img {
    position: absolute;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background-size: cover;
    z-index: -1;
}
@media (max-width: 400px) {
    height: 100vh;
    z-index: 2;
    
  }
`

const Wapper = styled.div`
  background: rgba(60, 60, 60, 0.7);
  z-index: 10;
  width: 100%;
  height: 100vh;
  padding-top: -10px;
`;

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 20%;
  width: 60%;
  height: 550px;
  margin-top: 150px;
  // background: green;
  img {
      z-index: 6;
      border-radius: 50%;
      width: 120%;
      height: 130%;
      grid-area: 3 / 2 / 7 / 4;
      margin-top: -50px;
      margin-left: -35%;
      @media (max-width: 1220px) {
        height: 100%;
      }
  }
  h1 {
    color: white;
    grid-area: 3 / 4 / 4 / 8;
    text-decoration: underline;
    font-size: 2rem;
    text-align: center;
    padding-bottom: 20px;
    // background: red;
    @media (max-width: 1274px) {
      font-size: 1.5rem;
    }
  }
  p {
    grid-area: 4 / 4 / 7 / 8;
    text-align: center;
    color: #fff;
    font-size: 25px;
    line-height: 1;
    // background: green;
  }
  li {
      // background: blue;
      grid-area: 6 / 7 / 8 / 8;
      right: 0;
      bottom: 0;
      text-align: right;
      @media (max-width: 1220px) {
        margin-top: 25px;
      }
      list-style: none;
        a{
            text-decoration: none;
            color: #fff;
        }
        a:hover {
          color: black;
        }
  }
  @media (min-width: 1655px) {
    width: 50%;
    margin-left: 24%;
  }
  @media (max-width: 1655px) {
    p {
      font-size: 20px;
    }
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 94vh;
    width: 100%;
    margin-top: 120px;
    margin-left: 0;
    
    img {
      grid-area: 1 / 2 / 4 / 4;
      width: 90%;
      height: 90%;
      margin-left: 3%;
      margin-top: 10px;
    }
    h1 {
      grid-area: 4 / 2 / 5 / 4;
      @media (max-width: 474px) {
        // font-size: 1.5rem;
        padding-bottom: 10px;
      }
      // background:  yellow;
    }
    p {
      grid-area: 5 / 2 / 8 / 4;
      // background: red;
      @media (max-width: 450px) {
        font-size: .9rem;
      }
    }
    li {
      // background: blue;
      margin-bottom: 50px;
      grid-area: 7 / 3 / 8 / 4;
      margin-top: -50px;
      padding-left: 50px;
      @media (max-width: 474px) {
        // background: purple;
        position: relative;
        padding: 15px 0;
      }
      @media (max-width: 675px) {
        font-size: .75rem;
      }
      @media (max-width: 450px) {
        // background: blue;
        font-size: .5rem;
        
      }
    }
  }
`

const Icons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 100px;
  a {
    color: white;
    padding: 0 5px 0 5px;
  }
  a:hover {
    color: #0077b5;
  }
  @media (max-width: 765px) {
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 20px;
  }
`



export default Home;