import React, { useState} from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './SignUp.css'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'


function SignUp(){

    const history = useHistory();

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userFullName, setFullName] = useState("");
    const [userContact, setContact] = useState(0);
    const [userType, setType] = useState("");


    const[passwordShown, setPasswordShown] = useState(false);

    const addUser = (e) => {
        e.preventDefault();

        // let type = userType.charAt(0).toUpperCase() + userType.slice(1);

        Axios.post("http://localhost:3001/signup", {
            userEmail: userEmail,
            userPassword: userPassword,
            userFullName: userFullName,
            userContact: userContact,
            userType: userType,
            userStatus: "Inactive",
        }).then((res) => {
            if(res.data.checkUser){
                history.push('/');
            }
            else{
                window.alert('Email has already been used!');
            }
        })
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return(
        <div className="d-flex justify-content-center">
          <Form onSubmit = {addUser} className = "border m-3 p-5 signUpForm text-white">
            <h3>Sign Up</h3>

            <hr/>
            
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userPassword">
            <Form.Label>Password</Form.Label>
              <InputGroup>
                    <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter your password here"
                    onChange = {(event) => {
                    setPassword(event.target.value);
                    }}
                    required
                    />
                <Button className = "showPBtn signUpBtn" onClick = {togglePassword}>Show</Button>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                    required
                    />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter contact number here" 
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userType">
                <Form.Label>User Type</Form.Label>
                <Form.Control as="select" 
                    onChange = {(event) => {
                        setType(event.target.value);
                    }}
                >
                    <option className="text-muted disabled">Select your user type here...</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="representative">Company representative</option>
                </Form.Control>
            </Form.Group>
            
            


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button className = "d-flex flex-end justify-content-end align-items-end signUpBtn" variant="primary" type="submit">
                Sign Up
            </Button>
          </div>

          </Form>
        </div>
    )
}

export default SignUp;