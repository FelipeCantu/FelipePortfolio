import styled from "styled-components";


const Home = () => {
    return (
        <Main>
            <img src="images/mainbg.jpg" />
            <Container>
                <img src="images/avatarpic.png" />
                <h1>Full Stack Web Developer</h1>
                <p>Full Stack Developer Motivated tech enthusiast and problem solver with a background in computer tech. Experience with project team building and critical thinking. </p>
                <li><a href="">Learn More</a></li>
            </Container>
        </Main>
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
    height: 50vh;
    z-index: 2;
  }
`

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 20%;
  width: 60%;
  height: 500px;
  margin-top: 200px;
  background: rgba(60, 60, 60, 0.7);
  img {
      z-index: 6;
      border-radius: 50%;
      width: 120%;
      height: 140%;
      grid-area: 3 / 2 / 7 / 4;
      margin-top: -50px;
      margin-left: -35%;
  }
  h1 {
    color: #fff;
    grid-area: 3 / 4 / 4 / 8;
    text-decoration: underline;
    font-size: 2.5rem;
    // background: blue;
    text-align: center;
    padding-bottom: 20px;
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
    //   background: red;
      grid-area: 7 / 7 / 8 / 8;
      @media (max-width: 1220px) {
        // background: red;
        margin-top: 25px;
      }
      list-style: none;
        a{
            text-decoration: none;
            color: #fff;
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
    margin-top: 60px;
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
      // background:  yellow;
    }
    p {
      grid-area: 5 / 2 / 8 / 4;
      // background: red;
    }
    li {
      
      // background: blue;
      margin-bottom: 50px;
      grid-area: 7 / 3 / 8 / 4;
    }
`



export default Home;