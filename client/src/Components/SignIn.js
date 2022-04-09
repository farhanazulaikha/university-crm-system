import React, {useState, useContext} from 'react'
import { Form, InputGroup, Button} from 'react-bootstrap';
import './SignIn.css'
import { useHistory } from 'react-router-dom';
import { SignInContext, UserTypeContext, UserContext } from './../Helper/Context';
import Axios from 'axios'


function SignIn(){

  const history = useHistory();

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const {signedIn, isSignedIn} = useContext(SignInContext);
  const {type, isUserType} = useContext(UserTypeContext);
  const {userId, setUserId} = useContext(UserContext);

  const[passwordShown, setPasswordShown] = useState(false);

  const signIn = (e) => {

    e.preventDefault();

    Axios.post("http://localhost:3001/signin", {
      userEmail: userEmail,
      userPassword: userPassword,
    }).then((res) => {
      
      if(res.data.isAuthorized){
        isSignedIn(true);
        // console.log(res.data.type);
        const id = res.data.id;
        
        if(res.data.type === 'Admin'){
          isUserType("Admin");
          setUserId(id);
          history.push(`/admin/${id}/dashboard`)
        }
        else if(res.data.type === 'Lecturer'){
          isUserType("Lecturer");
          setUserId(id);
          history.push(`/lecturer/${id}/dashboard`)
        }
        else{
          isUserType("Representative");
          setUserId(id);
          history.push(`/representative/${id}/dashboard`)
        }
        // setUserId(id);
      }
      else{
        window.alert("Wrong email/password!");
        // console.log('wrong');
      }
  })};

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

    return(
        <div className="d-flex justify-content-center">
          <Form onSubmit = {signIn} className = "border m-3 p-5 signInForm text-white">
            <h3>Sign In</h3>

            <hr/>
            <div className = "form-group">
            <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                />
            </div>
            <div className = "form-group">
            <Form.Label>Password</Form.Label>
              <InputGroup>
                  <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter your password here"
                  onChange = {(event) => {
                  setPassword(event.target.value);
                  }}
                  required
                  />
              <Button className = "showPBtn signInBtn" onClick = {togglePassword}>Show</Button>
                </InputGroup>
            </div>

            <div className = "d-flex flex-end  justify-content-end align-items-end mt-4">
            <Button className = "d-flex flex-end justify-content-end align-items-end signInBtn" variant="primary" type="submit">
                Sign In
            </Button>
          </div>

          </Form>
        </div>
    )
}

export default SignIn;