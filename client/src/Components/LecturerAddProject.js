import React, {useContext, useState, useEffect} from 'react'
import { UserContext, UserTypeContext } from '../Helper/Context';
import { Form, Button, Card} from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function LecturerAddProject(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [projectTitle, setTitle] = useState("");
    const [projectInformation, setInformation] = useState("");
    const [projectStatus, setStatus] = useState("");
    const [projectType, setType] = useState("");
    const [projectField, setField] = useState("");

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var d = new Date(date);
    var day = d.toLocaleDateString('en-us', {weekday:'long'});

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const addNewProject = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addnewprojectl", {
            userId: userId,
            projectTitle: projectTitle,
            projectInformation: projectInformation,
            projectStatus: projectStatus,
            projectType: projectType,
            projectField: projectField,
            projectDate: date,
            projectTime: time,
            projectDay: day,
            projectOwner: type,
        })
        .then((res) => {

            if(res){

                window.alert("Successfully added new project!");
                history.push(`/lecturer/${userId}/dashboard`);
            }
            else{
                window.alert("Try again!");
            }
        })};

        const backToProfile = (e) => {
            e.preventDefault();

            history.push(`/lecturer/${userId}/dashboard`);
        }

    return(
        <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
            <Form onSubmit = {addNewProject} className = "m-3 p-5" >
            <h3>Add Project</h3>

            <hr/>
            <span>(Note: Only projects related to Research and Development (RnD) and Teaching and Learning (TnL) can be added)</span>
            <br/><br/>
            
            <Form.Group className="mb-3" controlId="projectTitle">
            <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Enter your project title here"  
                  onChange = {(event) => {
                    setTitle(event.target.value);
                  }}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectInformation">
            <Form.Label>Project Information</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your project information here"  
                  onChange = {(event) => {
                    setInformation(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectStatus">
                <Form.Label>Project Status</Form.Label>
                <Form.Control as="select" 
                    onChange = {(event) => {
                        setStatus(event.target.value);
                    }}
                >
                    <option className = "text-muted">Select your project status here...</option>
                    <option value="Available">Available</option>
                    <option value="Taken">Taken</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectType">
                    <Form.Label>Project Type</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setType(event.target.value);
                    }}
                >
                    
                    <option className = "text-muted">Select your project type here...</option>
                    <option value="RND">Research and Development</option>
                    <option value="TNL">Teaching and Learning</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectField">
                    <Form.Label>Project Field</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setField(event.target.value);
                    }}
                >
                    <option className = "text-muted">Select your project field here...</option>
                    <option value="CI1">Embedded Systems</option>
                    <option value="CI2">Information Security and Assurance</option>
                    <option value="IC1">Intelligent Systems and Data Analytics</option>
                    <option value="IC2">Media and Visual Computing</option>
                    <option value="SE1">Information Systems Development</option>
                    <option value="SE2">Specialised Systems Development</option>
                    
                </Form.Control>
            </Form.Group>
            


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end mx-3" type="button" onClick = {backToProfile}>Cancel</Button>
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end" variant="primary" type="submit">
                Add
            </Button>
            
          </div>

          </Form>
          </Card>
        </div>
    )
}

export default LecturerAddProject;