import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import Axios from 'axios'

function LecturerAddActivity(props){

    const [activityTitle, setTitle] = useState("");
    const [activityInformation, setInformation] = useState("");
    const [activityStartDate, setStartDate] = useState(new Date());
    const [activityEndDate, setEndDate] = useState(new Date());

    var projectId = props.itemID;

    const addActivity = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addactivityl", {
            activityTitle: activityTitle,
            activityInformation: activityInformation,
            activityStartDate: activityStartDate,
            activityEndDate: activityEndDate,
            projectId: projectId,
        }).then((res) => {
            window.alert('Activity has been added!');
            props.onHide();
        })

    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add new activity
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
                <Form.Group className="mb-3" controlId="activityStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" 
                        onChange = {(event) => {
                            setStartDate(event.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="activityEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" 
                        onChange = {(event) => {
                            setEndDate(event.target.value);
                        }}
                    />
                </Form.Group>
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <div className = "px-3">
                    <Button onClick={props.onHide} className = "mr-3">Close</Button>
                    </div>
                    <div>
                    <Button type = "submit" onClick={addActivity}>Save</Button>
                    </div>
                </div>
            </Form>
            {/* <p>{props.itemId}</p> */}
        </Modal.Body>
        </Modal>
    )
}

export default LecturerAddActivity;