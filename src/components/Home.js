import styled from "styled-components";

const Home = () => {
    return (
        <Main>
            <img src="images/mainbg.jpg" />
        </Main>
    )
}


const Main = styled.div`
    background: #bbb;    
img {
    display: absolute;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background-size: cover;
}
@media (max-width: 400px) {
    height: 50vh;
    z-index: 2;
  }
`
export default Home;