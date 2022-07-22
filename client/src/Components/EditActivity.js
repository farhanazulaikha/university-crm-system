import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import Axios from 'axios';

function EditActivity(props) {

    const [activityTitle, setTitle] = useState("");
    const [activityInformation, setInformation] = useState("");
    const [activityStatus, setStatus] = useState("");
    const [pCode, setPCode] = useState("");

    // for display
    const [activityT, setATitle] = useState("");
    const [activityI, setAInformation] = useState("");
    const [activityS, setAStatus] = useState("");
    const [projectI, setProjectI] = useState("");

    var activityId = props.activityid;
    var projectId = props.itemID;


    useEffect(()=>{
        Axios.get(`http://localhost:3001/${projectId}/getactivity/${activityId}`,{
            projectId: projectId,
            activityId: activityId,
        })
        .then((response) => {
            setPCode(response.data.id);
            setATitle(response.data.title);
            setAInformation(response.data.information);
            // setADueDate(response.data.duedate);
            setAStatus(response.data.status);
            setProjectI(response.data.projectCode);
        })
    },[pCode, activityT, activityI, activityS, projectI]);

    const updateActivity = (e) => {

        e.preventDefault();

        // if(activityInformation === ""){
        //     setInformation("-");
        // }

        Axios.put(`http://localhost:3001/updateactivity/${activityId}`, {
            activityId: activityId,
            activityTitle: activityTitle,
            activityInformation: activityInformation,
            // activityDueDate: activityDueDate,
            activityStatus: activityStatus,
            projectId: projectId,
        }).then((res) => {
            window.alert('Activity has been edited!');
            props.onHide();
        })

    }
    

    const handleClose = () => {
        props.onHide();
    }
  return (
    <div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit activity {pCode}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                
                <Form.Group className="mb-3" controlId="activityTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter activity title here"  
                        onChange = {(event) => {
                            setTitle(event.target.value);
                        }}
                        required
                        defaultValue={activityT}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="activityInformation">
                    <Form.Label>Information</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter activity information here"  
                        onChange = {(event) => {
                            setInformation(event.target.value);
                        }}
                        defaultValue={activityI}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="activityStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setStatus(event.target.value);
                    }}
                    defaultValue={activityS}
                >
                    <option className = "text-muted">Select your activity status here...</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Deferred">Deferred</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>

                </Form.Control>
            </Form.Group>

                {/* {projectI} */}

                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <div className = "px-3">
                    <Button style={{color:'white', backgroundColor:'#104271'}} onClick={handleClose} className = "mr-3">Close</Button>
                    </div>
                    <div>
                    <Button style={{color:'white', backgroundColor:'#104271'}} type = "submit" onClick={updateActivity}>Save</Button>
                    </div>
                </div>
            </Form>
        </Modal.Body>
        </Modal>

    </div>
  )
}

export default EditActivity