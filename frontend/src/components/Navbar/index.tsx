import React from 'react'; 
import {Navbar, NavDropdown, Nav, Form, Button, FormControl} from 'react-bootstrap'
  
const Navbar_main = () => { 
  return ( 
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">critterycovery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/species">Species</Nav.Link>
            <Nav.Link href="/habitats">Habitats</Nav.Link>
            <Nav.Link href="/countries">Countries</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  ); 
}; 
  
export default Navbar_main;
