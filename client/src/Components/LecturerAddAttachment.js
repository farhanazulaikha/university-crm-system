import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import Axios from 'axios'

function LecturerAddAttachment(props){

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    var projectId = props.itemID;

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const addAttachment = async (e) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("projectId", projectId);
        try{
            const res = await Axios.post("http://localhost:3001/addattachmentl",
                formData
            ).then((res) => {
                window.alert('Attachment has been added!');
                props.onHide();
            })
        } catch(ex){
            console.log(ex);
        }
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
                    <Form.Label>Upload file</Form.Label>
                    <Form.Control type="file" placeholder="Upload your attachment here"  
                        onChange = {saveFile}
                        required
                    />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="attachmentName">
                    <Form.Label>File name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your file name here"  
                        onChange = {(event) => {
                            setName(event.target.value);
                        }}
                        required
                    />
                </Form.Group> */}
                
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