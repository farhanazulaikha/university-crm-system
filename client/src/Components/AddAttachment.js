import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import Axios from 'axios'

function AddAttachment(props){

    const [fileSelected, setFile] = useState();
    const [fileName, setFileName] = useState("");

    var projectId = props.itemID;

    // const saveFile = (e) => {
    //     setFile(e.target.files[0]);
    //     setFileName(e.target.files[0].name);
    //   };

    const uploadImage = () => {
        // console.log(files[0]);

        const formData = new FormData();

        formData.append("file", fileSelected);
        formData.append("upload_preset", "sudzesie");

            Axios.post("https://api.cloudinary.com/v1_1/farhana19/image/upload", formData).then((response) => {
            console.log(response);
            // uploadPicture(response);
            props.onHide();
    })
    }

    // const uploadPicture = async(res) => {
    //     Axios.post("http://localhost:3001/uploadattachment",{
    //         url: res.secure_url,
    //         projectId: projectId,
    //     }
    //     )
    // }

    // const addAttachment = async (e) => {

    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("image", file);
    //     formData.append("fileName", fileName);
    //     formData.append("projectId", projectId);
    //     try{
    //         const res = await Axios.post("http://localhost:3001/addattachment",
    //             formData
    //         ).then((res) => {
    //             window.alert('Attachment has been added!');
    //             props.onHide();
    //         })
    //     } catch(ex){
    //         console.log(ex);
    //     }
    // }

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
                <Form.Group className="mb-3" controlId="projectId">
                    <Form.Label>Project ID: {projectId}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Upload file</Form.Label>
                    {/* <Form.Control type="file" name='image' placeholder="Upload your attachment here"  
                        onChange = {saveFile}
                        required
                    /> */}
                    <Form.Control type="file"
                        onChange={(event) => {
                            setFile(event.target.files[0]);
                        }}
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
                        <Button onClick={uploadImage}>Save</Button>
                    {/* <Button onClick={addAttachment}>Save</Button> */}
                    </div>
                </div>
            </Form>
            {/* <p>{props.itemId}</p> */}
        </Modal.Body>
        </Modal>
    )
}

export default AddAttachment;