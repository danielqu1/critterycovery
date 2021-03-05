import React from 'react'; 
import { 
  Nav, 
  NavLink, 
  Bars, 
  NavMenu, 
  NavBtn, 
  NavBtnLink, 
} from './NavbarElements'; 
  
const Navbar = () => { 
  return ( 
    <> 
      <Nav> 
        <Bars /> 

        <NavMenu> 
          <NavLink exact to='/' activeStyle={{'color': '#000000'}}> 
            Home 
          </NavLink> 
          <NavLink to='/about' activeStyle={{'color': '#000000'}}> 
            About 
          </NavLink>
          <NavLink to='/species' activeStyle={{'color': '#000000'}}> 
            Species 
          </NavLink>
          <NavLink to='/habitats' activeStyle={{'color': '#000000'}}> 
            Habitats 
          </NavLink>
          <NavLink to='/countries' activeStyle={{'color': '#000000'}}> 
            Countries 
          </NavLink>
        </NavMenu>
      </Nav> 
    </> 
  ); 
}; 
  
export default Navbar;
