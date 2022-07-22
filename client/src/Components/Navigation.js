import React, {useContext, useState, useEffect} from 'react'
import {Navbar, Nav, Container, Image, NavDropdown, Button } from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import webLogo from './../assets/logo.png';
import { SignInContext, UserTypeContext } from './../Helper/Context';
import './Navigation.css';
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";

function Navigation() {

    const {signedIn, isSignedIn} = useContext(SignInContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const signOut = () => {
      isSignedIn(false);
    }

    
    var navDropdownTitle;

    if(type === 'Lecturer'){
      navDropdownTitle = <span className ="fw-bold">LECTURER <BsFillPersonFill/></span>
    }
    else if(type === 'Representative'){
      navDropdownTitle = <span className ="fw-bold">REPRESENTATIVE <BsFillPersonFill/></span>
    }
    else if(type === 'Admin'){
      navDropdownTitle = <span className ="fw-bold">ADMIN <BsFillPersonFill/></span>
    }
    const chat = <span><BsFillChatLeftTextFill/></span>

    return(
        <SignInContext.Provider value={ {signedIn, isSignedIn} }>
            <Navbar className="mainNav">
                <Container>
                    <Navbar.Brand><Image className="web-logo" src={webLogo}></Image></Navbar.Brand>
                        <Nav className="right-side me-auto">
                        {signedIn ?

                            <Nav className="right-side me-auto text-white">
                              {type === "Lecturer" &&
                                <Nav.Link as = {Link} to = '/lecturer/:id/chat' className="text-white p-3 navStyle" activeClassName="fw-bold">{chat}</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {Link} to = '/representative/:id/chat' className="text-white p-3 navStyle" activeClassName="fw-bold">{chat}</Nav.Link>
                              }
                              {type === "Admin" &&
                                <Nav.Link as = {NavLink} to = '/admin/:id/dashboard' className="text-white p-3 navStyle" activeClassName="fw-bold">Dashboard</Nav.Link>
                              }
                              
                              {type === "Lecturer" &&
                                <Nav.Link as = {NavLink} to = '/lecturer/:id/dashboard' className="text-white p-3 navStyle" activeClassName="fw-bold">Dashboard</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {NavLink} to = '/representative/:id/dashboard' className="text-white p-3 navStyle" activeClassName="fw-bold">Dashboard</Nav.Link>
                              }

                              {type === "Admin" &&
                                <Nav.Link as = {NavLink} to = '/admin/:id/users' className="text-white p-3 navStyle" activeClassName="fw-bold">Users</Nav.Link>
                              }
                              {type === "Lecturer" &&
                              <Nav.Link as = {NavLink} to = '/lecturer/:id/companylist' className="text-white p-3 navStyle" activeClassName="fw-bold">Company</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {NavLink} to = '/representative/:id/lecturerlist' className="text-white p-3 navStyle" activeClassName="fw-bold">Lecturer</Nav.Link>
                              }

                              {type === "Admin" &&
                              <Nav.Link as = {NavLink} to = '/admin/:id/companylist' className="text-white p-3 navStyle" activeClassName="fw-bold">Company</Nav.Link>
                              }
                              {type !== "Admin" &&
                                  <NavDropdown title="Project" id ="nav-dropdown" className="navStyle" activeClassName="fw-bold">
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
                              }
                              
                              {type === "Lecturer" &&
                              <Nav.Link as = {NavLink} to = '/lecturer/:id/news' className="text-white p-3 navStyle" activeClassName="fw-bold">News</Nav.Link>
                              }
                              {type === "Representative" &&
                                <Nav.Link as = {NavLink} to = '/representative/:id/news' className="text-white p-3 navStyle" activeClassName="fw-bold">News</Nav.Link>
                              }
                              <NavDropdown title={navDropdownTitle} id ="nav-dropdown" className="navStyle" activeClassName="fw-bold">
                              
                                {type === "Lecturer" &&
                                  <NavDropdown.Item as = {Link} to = '/lecturer/:id/editprofile'>Edit Profile</NavDropdown.Item>
                                }
                                {type === "Representative" &&
                                  <NavDropdown.Item as = {Link} to = '/representative/:id/editprofile'>Edit Profile</NavDropdown.Item>
                                }
                                {type === "Admin" &&
                                  <NavDropdown.Item as = {Link} to = '/' onClick={signOut}>Sign Out</NavDropdown.Item>
                                }
                                {type === "Lecturer" &&
                                  <NavDropdown.Item as = {Link} to = '/' onClick={signOut}>Sign Out</NavDropdown.Item>
                                }
                                {type === "Representative" &&
                                  <NavDropdown.Item as = {Link} to = '/'onClick={signOut}>Sign Out</NavDropdown.Item>
                                }
                              </NavDropdown>
                             
                            </Nav>

                        :
                            <Nav className="right-side me-auto text-white">
                                <Nav.Link as = {Link} to = '/' className="text-white p-3 navStyle" activeClassName="navStyle--active">Sign In</Nav.Link>
                                <Nav.Link as = {Link} to = '/signup' className="p-3 text-white navStyle" activeClassName="navStyle--active">Sign Up</Nav.Link>
                            </Nav>
                        }
                            
                        </Nav>
                </Container>
      </Navbar>
      </SignInContext.Provider>
    )
}

export default Navigation;