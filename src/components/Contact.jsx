import React from 'react';
import styled from "styled-components";


function Contact() {
  return (
    <div>
      <Main>
        <Wapper>
          <img src="images/mainbg.jpg" />
          <Section>
            <img src="images/bgblue.jpeg" />
            <Content>
              <h2>Write your messsage here</h2>
            </Content>
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
  width: 50%;
  margin-top: 150px;
  img {
    z-index: 2;
    width: 500px;
    height: 500px;
  }
  h2 {
    color: white;
  }
`

const Content = styled.div `
  z-index: 3;
`

export default Contact;