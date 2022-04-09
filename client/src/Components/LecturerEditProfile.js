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

    const [lEmail, setLEmail] = useState("");
    const [lName, setLFullName] = useState("");
    const [lContact, setLContact] = useState("");
    const [lImage, setImage] = useState("");

    const [lecturerEmail, setEmail] = useState("");
    const [lecturerName, setFullName] = useState("");
    const [lecturerContact, setContact] = useState("");

    var [file, setFile] = useState();
    var [fileName, setFileName] = useState("");

    const [preferenceList, setPreference] = useState([]);

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
            // console.log(res.data.userEmail);
        })
    })


    // const saveImage = (e) => {
    //     setFile(e.target.files[0]);
    //     setFileName(e.target.files[0].name);
    //   };

    const updateUser = async(e) => {

        e.preventDefault();

        // const formData = new FormData();

        // formData.append("userImage", file);
        // formData.append("fileName", fileName);
        // formData.append("userId", userId);
        // formData.append("lecturerEmail", lecturerEmail);
        // formData.append("lecturerName", lecturerName);
        // formData.append("lecturerContact", lecturerContact);
        if(lecturerEmail === ""){
            setEmail(lEmail);
        }

        if(lecturerName === ""){
            setFullName(lName);
        }

        if(lecturerContact === ""){
            setContact(lContact);
        }
        // console.log(lecturerEmail, lecturerContact);
        
        const re = await Axios.put(`http://localhost:3001/updatelecturer/${userId}`,{
                userId: userId,
                lecturerEmail: lecturerEmail,
                lecturerName: lecturerName,
                lecturerContact: lecturerContact,
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

    const choosePreference = async(e) => {
        // const checkedValue = e.target.value;

        // current array of options
    // const options = this.state.options
        e.preventDefault();

        let index

        // check if the check box is checked or unchecked
        if (e.target.checked) {
        // add the numerical value of the checkbox to options array
            preferenceList.push(e.target.value)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = preferenceList.indexOf(+e.target.value)
            preferenceList.splice(index, 1)
        }


        // console.log(preferenceList);
    // update the state with the new array of options
    // this.setState({ options: options })
// to get the checked name
// const checkedName = e.target.name;
        }

  return (
    <div className="d-flex justify-content-center">
        <Card className = "border m-3 p-5" style={{ width: '80%' }}>
        <Form onSubmit = {updateUser}>
            <h3>Edit Profile</h3>

            <hr/>

            {/* <Form.Group className="mb-3" controlId="userImage">
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
                        // onChange = {saveImage}
                    />
                    </div>
            </Form.Group> */}
            
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                defaultValue={lEmail}
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                 
                />
                {/* {lecturerEmail} */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    defaultValue={lName}
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                    />
                    {/* {lecturerName} */}
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
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="Artificial Intelligence"
                            name="group1"
                            type={type}
                            id="ArtificialIntelligence"
                            value="Artificial Intelligence"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Machine Learning"
                            name="group1"
                            type={type}
                            id="MachineLearning"
                            value="Machine Learning"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Natural Language Processing"
                            name="group1"
                            type={type}
                            id="NaturalLanguageProcessing"
                            value="Natural Language Processing"
                            onChange={choosePreference}
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
                            value="Multimedia System"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Computer Graphics"
                            name="group2"
                            type={type}
                            id="ComputerGraphics"
                            value="Computer Graphics"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Visual Processing"
                            name="group2"
                            type={type}
                            id="VisualProcessing"
                            value="Visual Processing"
                            onChange={choosePreference}
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
                            value="Networking"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Cloud Computing"
                            name="group3"
                            type={type}
                            id="Cloud Computing"
                            value="Cloud Computing"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Internet of Things"
                            name="group3"
                            type={type}
                            id="InternetofThings"
                            value="Internet of Things"
                            onChange={choosePreference}
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
                            id="Cybersecurity"
                            value="Cybersecurity"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Forensics"
                            name="group4"
                            type={type}
                            id="Forensics"
                            value="Forensics"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Cryptography"
                            name="group4"
                            type={type}
                            id="Cryptography"
                            value="Cryptography"
                            onChange={choosePreference}
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
                            value="Database"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Enterprise Architecture"
                            name="group5"
                            type={type}
                            id="EnterpriseArchitecture"
                            value="Enterprise Architecture"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Information Systems"
                            name="group5"
                            type={type}
                            id="InformationSystems"
                            value="Information Systems"
                            onChange={choosePreference}
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
                            value="Software Development"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Web Development"
                            name="group6"
                            type={type}
                            id="WebDevelopment"
                            value="Web Development"
                            onChange={choosePreference}
                        />
                        <Form.Check
                            inline
                            label="Mobile and Game Development"
                            name="group6"
                            type={type}
                            id="MobileandGameDevelopment"
                            value="Mobile and Game Development"
                            onChange={choosePreference}
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