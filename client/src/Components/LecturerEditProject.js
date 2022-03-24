import React, {useContext, useState, useEffect} from 'react'
import { UserContext, UserTypeContext } from '../Helper/Context';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function LecturerEditProject(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [projectTitle, setProjectTitle] = useState("");
    const [projectInformation, setProjectInformation] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectField, setProjectField] = useState("");
    const [representativeId, setRepresentativeId] = useState("");

    const [pType, setPType] = useState([]);
    const [pField, setPField] = useState([]);

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    useEffect(() => {
        Axios.get('http://localhost:3001/type').then((response) => {
            setPType(response.data);
        })
    });

    useEffect(()=>{
        Axios.get(`http://localhost:3001/lecturer/${userId}/viewproject/${projectId}`,{
            userId: userId,
            projectId: projectId,
        })
        .then((res) => {
            setProjectTitle(res.data.projectTitle);
            setProjectInformation(res.data.projectInformation);
            setProjectStatus(res.data.projectStatus);
            setProjectType(res.data.projectType);
            setProjectField(res.data.projectField);
        })
    });

    return(
        <div>
            <Form className = "border m-3 p-5">
            <h3>Edit Project</h3>
            <hr/>
            
            <Form.Group className="mb-3" controlId="projectTitle">
            <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Enter your project title here"  
                  onChange = {(event) => {
                    setProjectTitle(event.target.value);
                  }}
                  value = {projectTitle}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectInformation">
            <Form.Label>Project Information</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your project information here"  
                  onChange = {(event) => {
                    setProjectInformation(event.target.value);
                  }}
                  value = {projectInformation}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectStatus">
                <Form.Label>Project Status</Form.Label>
                <Form.Control as="select" 
                    onChange = {(event) => {
                        setProjectStatus(event.target.value);
                    }}
                    value = {projectStatus}
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
                        setProjectType(event.target.value);
                    }}
                    value={projectType}
                >
                    <option className = "text-muted">Select your project type here...</option>
                    {pType.map((val, key) => {
                        return(
                                <option key = {key} value = {val.project_type_label}>{val.project_type_label}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectField">
                    <Form.Label>Project Field</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setProjectField(event.target.value);
                    }}
                    value = {projectField}
                >
                    <option className = "text-muted">Select your project field here...</option>
                    <option value="ci1">Embedded Systems</option>
                    <option value="ci2">Information Security and Assurance</option>
                    <option value="ic1">Intelligent Systems and Data Analytics</option>
                    <option value="ic2">Media and Visual Computing</option>
                    <option value="se1">Information Systems Development</option>
                    <option value="se2">Specialised Systems Development</option>
                </Form.Control>
            </Form.Group>
            


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button className = "d-flex flex-end justify-content-end align-items-end" variant="primary" type="submit">
                Update
            </Button>
          </div>

          </Form>
        </div>
    )
}

export default LecturerEditProject;