import React, {useEffect, useState, useContext} from 'react'
import Axios from 'axios';
import {Col, Row, Button, Modal, Table, Form} from 'react-bootstrap';
import {Image} from 'cloudinary-react';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';


function ViewProjectAttachment({itemID, isBelong}) {

    var projectId = itemID;

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const history = useHistory();

    const [attachmentList, setAttachmentList] = useState([]);

    const [delAttachment, setDelAttachment] = useState (false);
    const handleDelete2 = () => setDelAttachment(false);

    useEffect(()=>{
        
        Axios.get(`http://localhost:3001/${projectId}/attachment`,{
            projectId: projectId,
        })
        .then((response) => {
            
                setAttachmentList(response.data);
            
        })
    },[attachmentList]);

    const addNewAtt = () => {
        if(type === 'Lecturer'){
            history.push(`/lecturer/${userId}/addattachment/${projectId}`);
        }
        else if(type === 'Representative'){
            history.push(`/representative/${userId}/addattachment/${projectId}`);
        }
    }

    const deleteAttachment = (e, attachment_id) => {

        e.preventDefault();

        const attachmentId = attachment_id;

        Axios.delete(`http://localhost:3001/delattachment/${attachmentId}`, {
            attachmentId: attachmentId,
        })
        .then((respon) => {
            
            handleDelete2();
            window.alert("Attachment has been deleted!");
            
         })
    }

  return (
    <div>
            <Row>
                <Col className = "d-flex justify-content-start fw-bold">
                    Attachment
                </Col>
                <Col className = "d-flex justify-content-end">
                    <Button variant="link" onClick={addNewAtt}>+ Add</Button>
                </Col>
            <hr/>
            </Row>
            

            {attachmentList.length > 0 ?
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr style={{color:'white', backgroundColor:'#104271'}}>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {attachmentList.map((val, key) => {
                            return(
                                <tbody key = {key}>
                                    <tr style={{backgroundColor:'#e7ecf0'}}>
                                        <td>
                                            <a href={val.project_attachment_url} target="_blank" rel="noopener noreferrer">{val.project_attachment_url}</a>
                                        </td>
                                        <td>
                                        <Button variant="link"
                                            onClick={() => setDelAttachment(val.project_attachment_id)}
                                        >Delete</Button>
                                        <Modal show={delAttachment === val.project_attachment_id} onHide={handleDelete2}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>ALERT</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Delete Attachment no. {val.project_attachment_id}?</Modal.Body>
                                            <Modal.Footer>
                                            <Button style={{color:'white', backgroundColor:'#104271'}} variant="primary" className="mr-3"
                                            onClick={handleDelete2}>
                                                Close
                                            </Button>
                                            <Button style={{color:'white', backgroundColor:'#104271'}} variant="primary" 
                                            onClick={(event) => deleteAttachment(event, val.project_attachment_id)}>Yes, delete</Button>
                                            </Modal.Footer>
                                        </Modal>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                </Row>
            : 
            <Row>
                    <p className = "text-center">No attachment has been added yet!</p>
            </Row>
            }
            
    </div>
  )
}

export default ViewProjectAttachment