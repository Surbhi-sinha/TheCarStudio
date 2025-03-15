import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">The CarStudio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Radial View Area</Nav.Link>
            <Nav.Link as={Link} to="/preview">Hover Preview</Nav.Link>
            <Nav.Link as={Link} to="/configurator">3D Configurator</Nav.Link>
            <Nav.Link as={Link} to="/video">Video Optimization</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Picture Gallery</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
