import styled from 'styled-components';

const Header = () => {
    return (
        <Nav>
            <Logo>
                <img src="/images/logo.png" alt="Logo" />
            </Logo>
        </Nav>
    )
}

const Nav = styled.nav `
    postion: fixed;
    top: 0;
    left: 0;
    right: 0;
    heigth: 60px;
`

const Logo = styled.a `
    padding: 0;
    width: 80px;
    max-height: 70px;
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`

export default Header;

