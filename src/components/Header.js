import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Header = () => {
    return (
        <Nav>
            <Head>
                <Logo>
                    <img src="/images/logo.png" alt="Logo" />
                </Logo>
                <StyledTypography variant='caption'>
                    Felipe Cantu Jr
                </StyledTypography>
                <NavMenu>
                    <a href="/home">
                        <span>Home</span>
                    </a>
                    <a href="/blogs">
                        <span>Blogs</span>
                    </a>
                    <a href="/project">
                        <span>Project</span>
                    </a>
                    <Button>
                        <a href="Contact">
                            <span>Contact</span>
                        </a>
                    </Button>
                </NavMenu>
            </Head>
        </Nav>
    )
}

const Nav = styled.nav`
   position: absolute;
   background: rgba(128,128,128,0.5);
   width: 100%;
`

const Head = styled.div`
    position: relative;
    margin: 0 150px 0 150px;
`

const Logo = styled.a`
    postion: absolute;
    margin-bottom: -4px;
    width: 80px;
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`
const StyledTypography = styled(Typography)`
    && {
        position: absolute;
        font-family: Roboto;
        display: inline-block;
        padding-top: 25px;
        padding-left: 10px;
        font-size: 1.5em;
        color: #fff;
    }
`
const NavMenu = styled.div`
    positon: relative;
    float: right;
    padding-top: 20px;
    margin: 10px;
    a {
        margin-left: 10px;
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }
`
const Button = styled.div`
    position: relative;
    float: right;
    background-color: #0077b5;
    font-size: 20px;
    padding: 5px;
    padding-bottom: 5px;
    margin-top: -10px;
    text-align: center;
`

export default Header;