import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import Axios from 'axios'

function LecturerAddAttachment(props){

    const [attachmentUrl, setUrl] = useState("");

    var projectId = props.itemID;

    const addAttachment = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addattachmentl", {
            attachmentUrl: attachmentUrl,
            projectId: projectId,
        }).then((res) => {
            window.alert('Attachment has been added!');
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
                Add new attachment
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="attachmentUrl">
                    <Form.Label>Title</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="Enter activity title here"  
                        onChange = {(event) => {
                            setUrl(event.target.value);
                        }}
                        required
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <div className = "px-3">
                    <Button onClick={props.onHide} className = "mr-3">Close</Button>
                    </div>
                    <div>
                    <Button onClick={addAttachment}>Save</Button>
                    </div>
                </div>
            </Form>
            {/* <p>{props.itemId}</p> */}
        </Modal.Body>
        </Modal>
    )
}

export default LecturerAddAttachment;