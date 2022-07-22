import React, { useState, useContext, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { UserContext } from '../Helper/Context';
import './Profile.css'


function RepresentativeEditProfile() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [userImg, setUserImg] = useState(false);

    const [rEmail, setREmail] = useState("");
    const [rName, setRFullName] = useState("");
    const [rContact, setRContact] = useState("");
    const [rType, setRType] = useState("");
    const [cName, setCName] = useState("");

    const [rImage, setImage] = useState("");

    //for update

    const [repEmail, setEmail] = useState("");
    const [repName, setFullName] = useState("");
    const [repContact, setContact] = useState("");
    const [repType, setRepType] = useState("");
    const [companyName, setCompanyName] = useState("");

    var [file, setFile] = useState();
    var [fileName, setFileName] = useState("");

    const [preferenceList, setPreference] = useState([]);
    const [companyList, setCompanyList] = useState([]);


    useEffect(()=>{

        Axios.get(`http://localhost:3001/repprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setREmail(res.data.email);
            setRFullName(res.data.name);
            setRContact(res.data.contactNo);
            setRType(res.data.ttype);
            setCName(res.data.com_id);
            setImage(res.data.image);

            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
        })
    })

    useEffect(()=>{

        getCompany();
    });

    function getCompany() {
        Axios.get(`http://localhost:3001/lecturer/${userId}/companylist`)
      .then(response => {
          setCompanyList(response.data);
        });
    };


    const updateUser = (e) => {

        e.preventDefault();
        
        Axios.put(`http://localhost:3001/updaterepresentative/${userId}`,{
                userId: userId,
                repEmail: repEmail,
                repName: repName,
                repContact: repContact,
                repType: repType,
                companyName: companyName,
        }).then((response) => {
                if(response){
                    window.alert('Your profile has been updated!');
                    history.push(`/representative/${userId}/dashboard`)
                }
                else{
                    window.alert('Update is unsuccessful!')
                }
                
            })
        
    }

    const choosePreference = async(e) => {
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
        console.log(preferenceList);
        }

  return (
    <div className="d-flex justify-content-center">
        <Card className = "border m-3 p-5" style={{ width: '80%' }}>
        <Form onSubmit={updateUser}>
            <h3>Edit Profile</h3>

            <hr/>
            
            <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                defaultValue={rEmail}
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
                 
                />
                {/* {lecturerEmail} */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    defaultValue={rName}
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                    />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label className="fw-bold">Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter contact number here" 
                    defaultValue={rContact}
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" 
                    value={rType}
                    onChange = {(event) => {
                        setRepType(event.target.value);
                    }}
                >
                    <option className = "text-muted">Select your representative type here...</option>
                    <option value="HR">Human Resource (HR)</option>
                    <option value="PIC">Person In Charge (PIC)</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectCol">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control as="select" 
                    value={cName}
                    onChange = {(event) => {
                        setCompanyName(event.target.value);
                    }}
                >  
                    <option className = "text-muted">Select your company here...</option>
                    {companyList.map((val1, key1) => {
                        return(
                            <option key = {key1} value = {val1.company_id}>{val1.company_name}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end signUpBtn" variant="primary" type="submit">
                Update
            </Button>
            </div>

          </Form>
          </Card>
    </div>
  )
}

export default RepresentativeEditProfile