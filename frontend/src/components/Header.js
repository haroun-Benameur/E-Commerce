import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/UserAction';
import { useEffect } from 'react';
function Header() {
  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin) 
  const {userInfo}=userLogin 



  const logoutHandler =()=> {
    dispatch(logout())
  }

  useEffect( ()=> {

  },[userInfo] )
  return (
    <Navbar expand="lg" variant='dark' className="bg-dark collapseOnSelect "  >
      <Container >
      <LinkContainer to='/' >
      
        <Navbar.Brand >proshop</Navbar.Brand>
      
      </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
        <Navbar.Collapse className="justify-content-end"  id="basic-navbar-nav">
          <Nav className="mr-auto">
            
          <LinkContainer to="/cart">

            <Nav.Link> <i className='fas fa-shopping-cart' ></i> cart</Nav.Link>
          </LinkContainer>
    
               { userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile' >
                            <NavDropdown.Item> Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler} > lOGOUT</NavDropdown.Item>
                  </NavDropdown>
               ): <LinkContainer to='/login'>
                
               <Nav.Link > <i className='fas fa-user' ></i> login</Nav.Link>
     
             </LinkContainer>
       }
               
          
            <NavDropdown  title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;