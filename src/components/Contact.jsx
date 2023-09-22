import React from 'react';
import styled from "styled-components";
import Form from '../components/Form';
import { FaGithub, FaLinkedin, FaInstagram, FaMapPin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from 'react-icons/md'

function Contact() {
  return (
    <div>
      <Main>
        <Wapper>
          <img src="images/mainbg.jpg" />
          <Section>
            <Content>
              <img src="images/bgblue.jpeg" />
              <Form />
            </Content>
            <Contacts>
              <ContactIcons>
                <h1>
                  Contact
                </h1>
                <h2><FaMapPin />Address</h2>
                <p>2727 W Jefferson Blvd, Dallas Tx</p>
                <h2><FaPhoneAlt />Phone</h2>
                <p>817-999-7951</p>
                <h2><MdEmail />Email</h2>
                <a href="mailto: cantujr.felipe@gmail.com">cantujr.felipe@gmail.com</a>
              </ContactIcons>
              <SoicalIcons>
                <a href="https://github.com/FelipeCantu" target="_blank"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/felipe-cantu-jr/" target="_blank"><FaLinkedin /></a>
                <a href="https://www.instagram.com/son_of_robot_/" target="_blank"><FaInstagram /></a>
              </SoicalIcons>
            </Contacts>
          </Section>
        </Wapper>
      </Main>
    </div>
  );
}

const Main = styled.div`
img {
  position: absolute;
height: 100vh;
width: 100%;
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
overflow: auto;
`;

const Section = styled.div`
display: flex;
position: relative;
margin: auto;
width: 75%;
margin-top: 150px;
margin-bottom: 50px;
color: white;
@media (max-width: 1126px) {
  // background: purple;
  display: grid;
  height: 110%;
  margin-bottom: 150px;
}
`

const Content = styled.div`
  // background: red;
  width: 100%;
  z-index: 3;
  @media (max-width: 1126px) {
    height: 300px
    margin-bottom: 1px;
  }
`
const Contacts = styled.div`
  z-index: 3;
  background: black;
  display: flex;
  float: right;
  width: 60%;
  color: white;
  @media (max-width: 1126px) {
    width: 100%;
    height: 500px;

  }
`

const ContactIcons = styled.div`
  // background: green;
  h1 {
    margin: auto;
    text-decoration: underline;
    // background: purple;
  }
  h2 {
    // background: red;
    font-size: 25px;
    margin: 0 0 -30px 0;
  }
  p {
    // background: pink;
    margin: -25px 0 0 0;
  }
  a {
    // background: yellow;
    color: white;
    margin: -25px 0 0 0;
    :hover {
      color: #0077b5;
    }
  }
  display: grid;
  padding: 10px;
  @media (max-width: 1126px) {
    width: 100%;
    margin-bottom: 50px;
    h1 {
      font-size: 25px;
    }
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 15px;
    }
    a {
      font-size: 15px;
     }
  }
`

const SoicalIcons = styled.div `
  position: absolute;
  right: 150px;
  bottom: 0;
  font-size: 30px;
  a {
    margin-right: 5px;
    color: white;
    :hover {
      color: #0077b5;
    }
  }
  @media (max-width: 1126px) {
    // background: purple;
    margin: auto;
    padding: 0 40px 30px 0;
    right: 30%;
   a {
    font-size: 30px;
   }
  }
`
export default Contact;