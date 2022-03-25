import React, { useState, useContext, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Image } from 'react-bootstrap'
import user from './../assets/user.png'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { UserContext } from '../Helper/Context';
import './Profile.css'


function LecturerEditProfile() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [userImg, setUserImg] = useState(false);

    // const [lEmail, setLEmail] = useState("");
    // const [lName, setLFullName] = useState("");
    // const [lContact, setLContact] = useState("");
    const [lImage, setImage] = useState("");

    const [lecturerEmail, setEmail] = useState("");
    const [lecturerName, setFullName] = useState("");
    const [lecturerContact, setContact] = useState("");

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setEmail(res.data.email);
            setFullName(res.data.name);
            setContact(res.data.contactNo);
            setImage(res.data.image);

            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
            // console.log(res.data.userEmail);
        })
    })


    const saveImage = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const updateUser = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("userImage", file);
        formData.append("fileName", fileName);
        formData.append("userEmail", lecturerEmail);
        formData.append("userFullName", lecturerName);
        formData.append("userContact", lecturerContact);

        // console.log(lecturerName);

        try{
            const res = await Axios.put(`http://localhost:3001/updatelecturer/${userId}`,
                formData
            ).then((response) => {
                if(response.data.updateSuccess){
                    window.alert('Your profile has been updated!');
                    history.push(`/lecturer/${userId}/dashboard`)
                }
                else{
                    window.alert('Update is unsuccessful!')
                }
                
            })
        } catch(ex){
            console.log(ex);
        }
    }

  return (
    <div className="d-flex justify-content-center">
        <Card className = "border m-3 p-5" style={{ width: '80%' }}>
        <Form onSubmit = {updateUser}>
            <h3>Edit Profile</h3>

            <hr/>

            <Form.Group className="mb-3" controlId="userImage">
                    <Form.Label className="fw-bold">Upload user picture</Form.Label>
                    <br/>
                    <div className = "pb-3">Your current profile picture:<br/>
                    {userImg
                    ?
                    <Image className="user-img" src={lImage}/>
                    : 
                    <Image className="user-img" src = {user}/>
                    }
                    </div>
                    <div>
                    <Form.Control type="file" name='userImage' placeholder="Upload your attachment here"
                        onChange = {saveImage}
                    />
                    </div>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                defaultValue={lecturerEmail}
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                 
                />
                {/* {lecturerEmail} */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    defaultValue={lecturerName}
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                                        />
                    {/* {lecturerName} */}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label className="fw-bold">Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter contact number here" 
                    defaultValue={lecturerContact}
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPreferences">
                    <Form.Label className="fw-bold">Preferences (Tick any below)</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Artificial Intelligence"
                            name="group1"
                            type={type}
                            id="ArtificialIntelligence"
                        />
                        <Form.Check
                            inline
                            label="Machine Learning"
                            name="group1"
                            type={type}
                            id="MachineLearning"
                        />
                        <Form.Check
                            inline
                            label="Natural Language Processing"
                            name="group1"
                            type={type}
                            id="NaturalLanguageProcessing"
                        />
                        </div>
                    ))}
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Multimedia System"
                            name="group2"
                            type={type}
                            id="MultimediaSystem"
                        />
                        <Form.Check
                            inline
                            label="Computer Graphics"
                            name="group2"
                            type={type}
                            id="ComputerGraphics"
                        />
                        <Form.Check
                            inline
                            label="Visual Processing"
                            name="group2"
                            type={type}
                            id="VisualProcessing"
                        />
                        </div>
                    ))}
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Networking"
                            name="group3"
                            type={type}
                            id="Networking"
                        />
                        <Form.Check
                            inline
                            label="Cloud Computing"
                            name="group3"
                            type={type}
                            id="Cloud Computing"
                        />
                        <Form.Check
                            inline
                            label="Internet of Things"
                            name="group3"
                            type={type}
                            id="InternetofThings"
                        />
                        </div>
                    ))}
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Cybersecurity"
                            name="group4"
                            type={type}
                            id="Cryptography"
                        />
                        <Form.Check
                            inline
                            label="Forensics"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="Cryptography"
                            name="group4"
                            type={type}
                            id="Cryptography"
                        />
                        </div>
                    ))}
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Database"
                            name="group5"
                            type={type}
                            id="Database"
                        />
                        <Form.Check
                            inline
                            label="Enterprise Architecture"
                            name="group5"
                            type={type}
                            id="EnterpriseArchitecture"
                        />
                        <Form.Check
                            inline
                            label="Information Systems"
                            name="group5"
                            type={type}
                            id="InformationSystems"
                        />
                        </div>
                    ))}
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Software Development"
                            name="group6"
                            type={type}
                            id="SoftwareDevelopment"
                        />
                        <Form.Check
                            inline
                            label="Web Development"
                            name="group6"
                            type={type}
                            id="WebDevelopment"
                        />
                        <Form.Check
                            inline
                            label="Mobile and Game Development"
                            name="group6"
                            type={type}
                            id="MobileandGameDevelopment"
                        />
                        </div>
                    ))}
            </Form.Group>



            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button className = "d-flex flex-end justify-content-end align-items-end signUpBtn" variant="primary" type="submit">
                Update
            </Button>
          </div>

          </Form>
          </Card>
    </div>
  )
}

export default LecturerEditProfile