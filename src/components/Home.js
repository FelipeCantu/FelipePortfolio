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
`
export default Home;