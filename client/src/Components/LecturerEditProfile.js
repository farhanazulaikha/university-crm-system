import React, { useState, useContext, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Image } from 'react-bootstrap'
import user from './../assets/user.png'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { UserContext } from '../Helper/Context';
import './Profile.css';
import { Checkbox, Row as RowAntd, Col  as ColAntd} from 'antd';



function LecturerEditProfile() {

    const [pref, setPref] = useState([]);

    function onChange(checkedValues) {
        setPref(checkedValues);
    }


    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [userImg, setUserImg] = useState(false);

    //for viewing old input
    const [lEmail, setLEmail] = useState("");
    const [lName, setLFullName] = useState("");
    const [lContact, setLContact] = useState("");
    const [lImage, setImage] = useState("");
    const [preference, setPreference] = useState([]);

    //for updating new one
    const [lecturerEmail, setEmail] = useState("");
    const [lecturerName, setFullName] = useState("");
    const [lecturerContact, setContact] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setLEmail(res.data.email);
            setLFullName(res.data.name);
            setLContact(res.data.contactNo);
            setImage(res.data.image);

            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
        })
    },[lEmail, lName, lContact, lImage, userImg])

    const updateUser = (e) => {

        e.preventDefault();
        
        Axios.put(`http://localhost:3001/updatelecturer/${userId}`,{
                userId: userId,
                lecturerEmail: lecturerEmail,
                lecturerName: lecturerName,
                lecturerContact: lecturerContact,
                lecturerPref: pref,
        }).then((response) => {
                if(response){
                    window.alert('Your profile has been updated!');
                    history.push(`/lecturer/${userId}/dashboard`)
                }
                else{
                    window.alert('Update is unsuccessful!')
                }
                
            })
        
        }

  return (
    <div className="d-flex justify-content-center">
        <Card className = "border m-3 p-5" style={{ width: '80%' }}>
        <Form onSubmit= {updateUser}>
            <h3>Edit Profile</h3>

            <hr/>
            
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                defaultValue={lEmail}
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    defaultValue={lName}
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                    />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label className="fw-bold">Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter contact number here" 
                    defaultValue={lContact}
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPreferences">
                    <Form.Label className="fw-bold">Preferences (Tick any below)</Form.Label>

                            <Checkbox.Group onChange={onChange}>
                                <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                
                                        <Checkbox style={{marginRight: '15px'}} value="Artificial Intelligence">Artificial Intelligence</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Machine Learning">Machine Learning</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Data Mining">Data Mining</Checkbox>
                                </div>
                                <div style={{display: 'block', marginRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Multimedia System">Multimedia System</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Computer Graphics">Computer Graphics</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Visual Processing">Visual Processing</Checkbox>
                                </div>
                                
                                    <div style={{display: 'block', marginRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Networking">Networking</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Cloud Computing">Cloud Computing</Checkbox>
                                        <Checkbox style={{marginRight: '15px'}} value="Internet of Things">Internet of Things</Checkbox>
                                        </div>
                                
                                    <div style={{display: 'block', marginRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Cybersecurity">Cybersecurity</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Forensics">Forensics</Checkbox>
                                        <Checkbox style={{marginRight: '15px'}} value="Cryptography">Cryptography</Checkbox>
                                        </div>
                                    
                                    <div style={{display: 'block', marginRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Database">Database</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Enterprise Architecture">Enterprise Architecture</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Information Systems">Information Systems</Checkbox>
                                        </div>
                                    
                                    <div style={{display: 'block', marginRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Software Development">Software Development</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Web Development">Web Development</Checkbox>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Mobile and Game Development">Mobile and Game Development</Checkbox>
                                        </div>
                                    
                            </Checkbox.Group>
                        

            </Form.Group>


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end signUpBtn" variant="primary" type="submit" onClick={updateUser}>
                Update
            </Button>
          </div>

          </Form>
          </Card>
    </div>
  )
}

export default LecturerEditProfile;