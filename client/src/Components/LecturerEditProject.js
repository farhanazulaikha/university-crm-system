import React, {useContext, useState, useEffect} from 'react'
import { UserContext, UserTypeContext } from '../Helper/Context';
import { Form, Button, Card } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function LecturerEditProject(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [projectCode, setProjectCode] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [projectInformation, setProjectInformation] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectField, setProjectField] = useState("");
    const [collaboratorId, setCollaboratorId] = useState("");

    const [repList, setRepList] = useState([]);

    // const [projectCode, setProjectCode] = useState("");
    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");
    const [status, setStatus] = useState("");
    const [pType, setPType] = useState("");
    const [field, setField] = useState("");
    const [collabId, setCollabId] = useState("");

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    useEffect(()=>{
        Axios.get(`http://localhost:3001/lecturer/${userId}/viewproject/${projectId}`,{
            userId: userId,
            projectId: projectId,
        })
        .then((res) => {
            setProjectCode(res.data.projectId);
            setProjectTitle(res.data.projectTitle);
            setProjectInformation(res.data.projectInformation);
            setProjectStatus(res.data.projectStatus);
            setProjectType(res.data.projectTypeId);
            setProjectField(res.data.projectFieldId);
            setCollaboratorId(res.data.representativeId);

            // let pType = res.data.projectTypeId.toLowerCase();
            // let field = res.data.projectFieldId.toLowerCase();
            // let status = res.data.projectStatus.charAt(0).toLowerCase() + res.data.projectStatus.slice(1);

            // console.log(pType, field, status);

            // setProjectStatus(status);
            // setProjectType(pType);
            // setProjectField(field);
        })
    });

    useEffect(() => {
        const fetchRep = async () => {
            const res = await Axios.get(`/lecturer/${userId}/representativelist`).then((response) =>{
                setRepList(response.data);
            })
        }

        fetchRep();
    }, []);

    const updateProject = async(event) => {
        event.preventDefault();

        if(title === ""){
            setTitle(projectTitle);
        }

        if(information === ""){
            setInformation(projectInformation);
        }

        if(status === ""){
            setStatus(projectStatus);
        }

        if(pType === ""){
            setPType(projectType);
        }

        if(field === ""){
            setField(projectField);
        }

        if(collabId === ""){
            setCollabId(collaboratorId);
        }

        const res = await Axios.put(`http://localhost:3001/lecteditproject/${projectId}`,{
                projectId: projectId,
                projectTitle: title,
                projectInformation: information,
                projectStatus: status,
                projectType: pType,
                projectField: field,
                collaboratorId: collabId,
        }).then((response) => {
                // if(response.data.updateSuccess){
                if(response){
                    window.alert('Your project has been updated!');
                    history.push(`/lecturer/${userId}/viewproject/${projectId}`);
                }
                else{
                    window.alert('Update is unsuccessful!');
                }
                // }
                // else{
                //     window.alert('Update is unsuccessful!')
                // }
                
            })
    }

    const backToProject = (e) => {
        e.preventDefault();

        history.push(`/lecturer/${userId}/viewproject/${projectId}`);
    }

    return(
        <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
            <Form onSubmit = {updateProject} className = "m-3 p-5">
            <h3>Edit Project</h3>
            <hr/>
            
            <Form.Group className="mb-3" controlId="projectTitle">
            <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Enter your project title here"  
                  onChange = {(event) => {
                    setTitle(event.target.value);
                  }}
                  defaultValue = {projectTitle}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectInformation">
            <Form.Label>Project Information</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your project information here"  
                  onChange = {(event) => {
                    setInformation(event.target.value);
                  }}
                    defaultValue = {projectInformation}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectStatus">
                <Form.Label>Project Status</Form.Label>
                <Form.Control as="select" 
                    onChange = {(event) => {
                        setStatus(event.target.value);
                    }}
                    value = {projectStatus}
                >
                    <option className = "text-muted">Select your project status here...</option>
                    <option value="Available">Available</option>
                    <option value="Taken">Taken</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectType">
                    <Form.Label>Project Type</Form.Label>
                    <Form.Control as="select" 
                    value={projectType}
                    onChange = {(event) => {
                        setPType(event.target.value);
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
                    // onChange={onChangeProjectField}
                    onChange = {(event) => {
                        setField(event.target.value);
                        // console.log(event.target.value);
                    }}
                    value = {projectField}
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

            <Form.Group className="mb-3" controlId="projectCollaborator">
                    <Form.Label>Collaborator</Form.Label>
                    <Form.Control type="text" placeholder="Enter your project collaborator ID here"  
                        onChange = {(event) => {
                            setCollabId(event.target.value);
                        }}
                        defaultValue = {collaboratorId}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectCol">
                    <Form.Label>Project Field</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setCollabId(event.target.value);
                    }}
                >  
                    <option className = "text-muted">Select your project collaborator here...</option>
                    {repList.map((val1, key1) => {
                        return(
                                <option key = {key1} value = {val1.representative_id}>{val1.representative_name}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
            


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button className = "d-flex flex-end justify-content-end align-items-end mx-3" type="submit" 
            onClick={(event) => {
                backToProject(event, projectCode);
            }}>Cancel</Button>
            <Button className = "d-flex flex-end justify-content-end align-items-end" variant="primary" type="submit">
                Update
            </Button>
          </div>

          </Form>
          </Card>
        </div>
    )
}

export default LecturerEditProject;