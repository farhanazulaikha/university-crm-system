import React, {useState, useContext} from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext, UserTypeContext } from './../Helper/Context';

function AddActivity(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    //for save
    const [activityTitle, setTitle] = useState("");
    const [activityInformation, setInformation] = useState("");
    // const [activityDueDate, setDueDate] = useState(new Date());
    const [activityStatus, setStatus] = useState("");

    const backToProject = (e) => {
        e.preventDefault();

        if(type === 'Lecturer'){
            history.push(`/lecturer/${userId}/viewproject/${projectId}`);
        }
        else if(type === 'Representative'){
            history.push(`/representative/${userId}/viewproject/${projectId}`);
        }
    }

    const addNew = (e) => {

        e.preventDefault();


        Axios.post("http://localhost:3001/addnewact", {
            activityTitle: activityTitle,
            activityInformation: activityInformation,
            activityStatus: activityStatus,
            projectId: projectId,
        }).then((res) => {

            

            if(res.data.addSuccess){

                if(type === 'Lecturer'){
                    window.alert('Activity has been added!');
                    history.push(`/lecturer/${userId}/viewproject/${projectId}`);
                }
                else if(type === 'Representative'){
                    window.alert('Activity has been added!');
                    history.push(`/representative/${userId}/viewproject/${projectId}`);
                }
            }

        
        })

    }

    return(
        <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
            <Form onSubmit={addNew} className = "m-3 p-5">
                <h3>                
                    Add new activity
                </h3>
                <hr/>
                <Form.Group className="mb-3" controlId="activityTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter activity title here"  
                        onChange = {(event) => {
                            setTitle(event.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="activityInformation">
                    <Form.Label>Information</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter activity information here"  
                        onChange = {(event) => {
                            setInformation(event.target.value);
                        }}
                    />
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="activityStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setStatus(event.target.value);
                    }}
                >
                    <option className = "text-muted">Select your activity status here...</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Deferred">Deferred</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>

                </Form.Control>
            </Form.Group>
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <div className = "px-3">
                    <Button style={{color:'white', backgroundColor:'#104271'}} onClick={backToProject} className = "mr-3">Cancel</Button>
                    </div>
                    <div>
                    <Button style={{color:'white', backgroundColor:'#104271'}} type = "submit">Save</Button>
                    </div>
                </div>
            </Form>
            </Card>
            </div>
    )
}

export default AddActivity;