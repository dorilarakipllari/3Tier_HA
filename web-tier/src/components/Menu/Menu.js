import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Component
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #FFFFFF;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

// Functional Component
const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <nav>
        <ul>
          <li>
            <Link to="/" tabIndex={tabIndex} style={{ outline: 'none', border: 'none' }}>
              <div style={{ paddingBottom: '2em', float: 'left' }}>Homepage</div>
            </Link>
          </li>
          <li>
            <Link to="/db" tabIndex={tabIndex} style={{ outline: 'none', border: 'none' }}>
              <div style={{ paddingBottom: '2em', float: 'left' }}>Database Demo</div>
            </Link>
          </li>
        </ul>
      </nav>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
