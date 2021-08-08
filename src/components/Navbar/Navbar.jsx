import React from 'react';
import Menu from './Menu';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Navbar = () => {
    return (
        <Nav>
            <img src="/images/logo.png" alt="Logo" />
            <StyledTypography variant='caption'>
                    Felipe Cantu Jr
                </StyledTypography>
            <Menu />
        </Nav>
    )
}

const Nav = styled.nav`
  position: absolute;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  background: rgba(128,128,128,0.5);
  justify-content: space-between;
  img {
      width: 60px;
  }
`
const StyledTypography = styled(Typography)`
    && {
        position: absolute;
        font-family: Roboto;
        display: inline-block;
        padding-top: 10px;
        padding-left: 75px;
        font-size: 1.5em;
        color: #fff;
    }
`

export default Navbar

