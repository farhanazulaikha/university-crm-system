import React, {useContext} from 'react'
import {Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import webLogo from './../assets/logo.png';
import { SignInContext, UserTypeContext } from './../Helper/Context';
import './Navigation.css';

function Navigation(){

    const {signedIn, isSignedIn} = useContext(SignInContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const signOut = () => {
      isSignedIn(false);
    }

    // const [userType, isUserType] = useState("");

    return(
        <SignInContext.Provider value={ {signedIn, isSignedIn} }>
            <Navbar className="mainNav">
                <Container>
                    <Navbar.Brand><Image className="web-logo" src={webLogo}></Image></Navbar.Brand>
                        <Nav className="right-side me-auto">
                        {signedIn ?

                            <Nav className="right-side me-auto text-white">
                              {type === "Admin" &&
                                <Nav.Link as = {Link} to = '/admin/:id/dashboard' className="text-white p-3">Dashboard</Nav.Link>
                              }
                              {type === "Lecturer" &&
                                <Nav.Link as = {Link} to = '/lecturer/:id/dashboard' className="text-white p-3">Dashboard</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {Link} to = '/representative/:id/dashboard' className="text-white p-3">Dashboard</Nav.Link>
                              }
                              {type === "Lecturer" &&
                              <Nav.Link as = {Link} to = '/lecturer/:id/companylist' className="text-white p-3">Company</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {Link} to = '/representative/:id/lecturerlist' className="text-white p-3">Lecturer</Nav.Link>
                              }
                              <NavDropdown title="Project" id ="nav-dropdown">
                                {type === "Lecturer" &&
                                  <NavDropdown.Item as = {Link} to = '/lecturer/:id/companyprojectlist'>Company Project</NavDropdown.Item>
                                }
                                {type === "Representative" &&
                                  <NavDropdown.Item as = {Link} to = '/representative/:id/lecturerprojectlist'>Lecturer Project</NavDropdown.Item>
                                }
                                {type === "Lecturer" &&
                                  <NavDropdown.Item as = {Link} to = '/lecturer/:id/yourproject'>Your Project</NavDropdown.Item>
                                }
                                {type === "Representative" &&
                                  <NavDropdown.Item as = {Link} to = '/representative/:id/yourproject'>Your Project</NavDropdown.Item>
                                }
                              </NavDropdown>
                              
                              {type === "Lecturer" &&
                              <Nav.Link as = {Link} to = '/lecturer/:id/news' className="text-white p-3">News</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {Link} to = '/representative/:id/news' className="text-white p-3">News</Nav.Link>
                              }
                              <Nav.Link as = {Link} to = '/' className="text-white p-3" onClick={signOut}>Sign Out</Nav.Link>
                            </Nav>

                        :
                            <Nav className="right-side me-auto text-white">
                                <Nav.Link as = {Link} to = '/' className="text-white p-3">Sign In</Nav.Link>
                                <Nav.Link as = {Link} to = '/signup' className="p-3 text-white">Sign Up</Nav.Link>
                            </Nav>
                        }
                            
                        </Nav>
                </Container>
      </Navbar>
      </SignInContext.Provider>
    )
}

export default Navigation;