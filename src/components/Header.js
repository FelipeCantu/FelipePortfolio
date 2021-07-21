import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Header = () => {
    return (
        <Nav>
            <Logo>
                <img src="/images/logo.png" alt="Logo" />
                <StyledTypography variant='caption'>
                        Felipe Cantu Jr
                </StyledTypography>
            </Logo>
        </Nav>
    )
}

const Nav = styled.nav`
    postion: fixed;
    top: 0;
    left: 0;
    right: 0;
    heigth: 60px;
    background: none;
`

const Logo = styled.a`
    padding: 0;
    width: 80px;
    
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`
const StyledTypography = styled(Typography)`
    && {
        font-family: Roboto;
        display: block;
        
    }
`

export default Header;

