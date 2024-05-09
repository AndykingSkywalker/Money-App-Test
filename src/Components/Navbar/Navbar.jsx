import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { lightTheme, darkTheme, GlobalStyles } from "../../themes";
import styled, { ThemeProvider } from "styled-components";
import Switch from 'react-switch';
import { GrContact } from "react-icons/gr";
import Logo from "../../Images/TAMPA.png"



const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-image: ${(props) => props.theme.backgroundImage};
`;

function NavigationBar() {
  const location = useLocation();

  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const themeToggler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
      <Navbar style={{ backgroundColor: '#B4738D', fontFamily: 'crimsonpro' }} expand="lg">          <Container               checked={theme === 'dark'}
>
            <Navbar.Brand href="/">< img src={Logo} alt="logo" width="90" height="50"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="crimsonpro" href="/login">Login</Nav.Link>
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="/Booking">Booking</Nav.Link>
                <NavDropdown title="Budget Planner" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/budget">
                  Budget Tool                  </NavDropdown.Item>
                  <NavDropdown.Item href="/expenses">
                  Expenses Tracker                  </NavDropdown.Item>
                </NavDropdown>
               

                <NavDropdown title="Calculators" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/savingsCalculator">
                    Savings Calculator
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/MortgageCalculator">
                    Mortgage Calculator
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/videomessages">Video Messages</Nav.Link>
              </Nav>

              <Nav.Link style={{color: "black"}} href="/contactUs">Contact Us <GrContact />
</Nav.Link>

              &emsp;               <Switch
              onChange={themeToggler}
              checked={theme === 'dark'}
              onColor="#2C041C"
              onHandleColor="#B4738D "
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
              height={20}
              width={48}
            />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </StyledApp>
    </ThemeProvider>
  );
}

export default NavigationBar;
