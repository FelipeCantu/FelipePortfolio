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
              <h2></h2>
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

const Section = styled.div`
display: flex;
position: relative;
background: black;
margin: auto;
padding: auto;
height: 60%;
width: 55%;
margin-top: 150px;
img {
  width: 500px;
  height: 500px;
  padding-right: 50px;
  }
  h2 {
    color: white;
  }
`

const Content = styled.div`
z-index: 3;
width: 70%
`
const Contacts = styled.div`
  // background: blue;
  display: flex;
  float: right;
  width: 490px;
  color: white;
  margin-left: 100px;

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

  }
  display: grid;
  padding: 10px;
`

const SoicalIcons = styled.div `
  position: absolute;
  right: 150px;
  bottom: 0;
  font-size: 30px;
  a {
    margin-right: 5px;
    color: white;
    
  }
`
export default Contact;