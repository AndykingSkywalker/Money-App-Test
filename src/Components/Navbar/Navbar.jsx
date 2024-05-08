import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { lightTheme, darkTheme, GlobalStyles } from '../../themes';
import styled, {ThemeProvider} from 'styled-components';

const StyledApp = styled.div`
color: ${(props) => props.theme.fontColor}`;

function NavigationBar() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => 
    window.localStorage.getItem('theme') || 'light');

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const themeToggler= () => {
    theme === 'light' ? setTheme("dark") : setTheme("light");
  };

  if (location.pathname === "/LoginPage") {
    return null;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <StyledApp>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Tampa</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Booking">Booking</Nav.Link>
                <Nav.Link href="/budget">Budget Tool</Nav.Link>
                <Nav.Link href="/expenses">Expenses Tracker</Nav.Link>
                <Nav.Link href="/MortgageCalculator">Mortgage Calculator</Nav.Link>

              <Nav.Link href="/videomessages">Video Messages</Nav.Link>
              </Nav>
              <Button variant="outline-secondary" onClick={themeToggler}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </StyledApp>
    </ThemeProvider>
  );
}

export default NavigationBar;