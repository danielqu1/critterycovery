import React, {useState} from 'react'; 
import logo from '../../images/logo.png';
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap'
import {Search} from 'react-bootstrap-icons'
  
const NavbarMain = () => { 
  const [searchQ, setSearchQ] = useState('')
  return ( 
    <>
      <Navbar sticky="top" bg="success" style={{backgroundColor:'green', padding:0}} expand="lg">
        <Navbar.Brand href="/" style={{paddingLeft: '4%'}}>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="CritteryCovery logo"
        />
        critterycovery
       </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='nav-links' href="/">Home</Nav.Link>
            <Nav.Link className='nav-links' href="/about">About</Nav.Link>
            <Nav.Link className='nav-links' href="/species">Species</Nav.Link>
            <Nav.Link className='nav-links' href="/habitats">Habitats</Nav.Link>
            <Nav.Link className='nav-links' href="/countries">Countries</Nav.Link>
          </Nav>
          <Form inline style={{backgroundColor:'grey', padding: '.5% 2%'}}>
            <FormControl type="q" placeholder="Search" className="mr-sm-2" onChange={e => setSearchQ(e.target.value)} />
            <Button variant="dark" style={{verticalAlign:'center' }} href={'/search?q='+searchQ}><Search /></Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  ); 
}; 
  
export default NavbarMain;
