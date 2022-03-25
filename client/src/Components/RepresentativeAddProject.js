import React, {useContext, useState, useEffect} from 'react'
import { UserContext, UserTypeContext } from '../Helper/Context';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function RepresentativeAddProject() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [projectTitle, setTitle] = useState("");
    const [projectInformation, setInformation] = useState("");
    const [projectStatus, setStatus] = useState("");
    const [projectType, setType] = useState("");
    const [projectField, setField] = useState("");

    const [pType, setPType] = useState([]);
    const [pField, setPField] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/type').then((response) => {
            setPType(response.data);
        })
    }, [userId]);

    useEffect(() => {
        Axios.get('http://localhost:3001/field').then((response) => {
            setPField(response.data);
        })
    }, [userId]);

    const addNewProject = (e) => {

        e.preventDefault();

        // let pType = projectType.toUpperCase();
        // let field = projectField.toUpperCase();
        let status = projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1);

        Axios.post("http://localhost:3001/addnewprojectr", {
            userId: userId,
            projectTitle: projectTitle,
            projectInformation: projectInformation,
            projectStatus: status,
            projectType: projectType,
            projectField: projectField,
            projectOwner: type,
        })
        .then((res) => {
            if(res.data.addSuccess){
                window.alert("Successfully added new project!");
                history.push(`/representative/${userId}/dashboard`);
            }
            else{
                window.alert("Try again!");
            }
        })};

  return (
    <div>
        <Form onSubmit = {addNewProject} className = "border m-3 p-5">
            <h3>Add Project</h3>

            <hr/>
            
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
                    <option value="available">Available</option>
                    <option value="taken">Taken</option>
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
                    {pType.map((val, key) => {
                        return(
                                <option key = {key} value = {val.project_type_id}>{val.project_type_label}</option>
                        )
                    })}
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
                    {pField.map((val1, key1) => {
                        return(
                                <option key = {key1} value = {val1.project_field_id}>{val1.project_field_label}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
            


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button className = "d-flex flex-end justify-content-end align-items-end" variant="primary" type="submit">
                Add
            </Button>
          </div>

          </Form>
    </div>
  )
}

export default RepresentativeAddProject