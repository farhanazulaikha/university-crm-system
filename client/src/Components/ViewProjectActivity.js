import React, {useEffect, useState, useContext} from 'react'
import Axios from 'axios';
import {Col, Row, Button, Modal, Form, Table} from 'react-bootstrap';
import EditActivity from './EditActivity';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';

var moment= require('moment');

function ViewProjectActivity({itemID, isBelong}) {

    var projectId = itemID;

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const history = useHistory();


    const [isActivity, setIsActivity] = useState(false);
    const [edActivity, setEdActivity] = useState(false);
    const [activityList, setActivityList] = useState([]);

    const [delActivity, setDelActivity] = useState(false);
    const handleDelete = () => setDelActivity(false);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/${projectId}/activity`,{
            projectId: projectId,
        })
        .then((response) => {

            if(response.data.length > 0){
                setIsActivity(true);
                setActivityList(response.data);
            }
            else{
                setIsActivity(false);
            }
        }

        )
    },[activityList]);

    const addNewAct = () => {
        if(type === 'Lecturer'){
            history.push(`/lecturer/${userId}/addactivity/${projectId}`);
        }
        else if(type === 'Representative'){
            history.push(`/representative/${userId}/addactivity/${projectId}`);
        }
    }

    const deleteActivity = (e, activity_id) => {

        e.preventDefault();

        const activityKey = activity_id;


        Axios.delete(`http://localhost:3001/delactivity/${activityKey}`, {
            activityKey: activityKey,
        })
        .then((respon) => {
            handleDelete();
            window.alert("Activity has been deleted!");
            
         })
    }

  return (
    <div>
        {
            isBelong &&
            <Row>
                <Col className = "d-flex justify-content-start fw-bold">
                    Activity
                </Col>
                <Col className = "d-flex justify-content-end">
                    <Button variant="link" onClick={addNewAct}>+ Add</Button>
                </Col>
            <hr/>
            </Row>
        }
        {
            isBelong ?
            ( isActivity ?
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr style={{color:'white', backgroundColor:'#104271'}}>
                            <th>Title</th>
                            <th>Information</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {activityList.map((val, key) => {
                        return(
                            <tbody key = {key}>
                                <tr style={{backgroundColor:'#e7ecf0'}}>
                                    <td>
                                        {val.project_activity_title}
                                    </td>
                                    <td>
                                        {val.project_activity_information}
                                    </td>
                                    
                                    <td>
                                        {val.project_activity_status}
                                    </td>
                                    <td>
                                        <Col>
                                            <Button variant="link" className = "btn btn-link mr-3"
                                            onClick=
                                            { () => setEdActivity(val.project_activity_id)
                                            }
                                            >Edit</Button>
                                            <EditActivity
                                            activityid={val.project_activity_id}
                                            itemID={projectId}
                                            show={edActivity === val.project_activity_id}
                                            
                                            onHide={() => setEdActivity(undefined)}
                                            />
                                        </Col>
                                        <Col>
                                            <Button variant="link" className="btn btn-link"
                                            onClick={() => setDelActivity(val.project_activity_id)}
                                            >Delete</Button>
                                            <Modal show={delActivity === val.project_activity_id} onHide={handleDelete}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>ALERT</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Delete Activity no. {val.project_activity_id}?</Modal.Body>
                                                <Modal.Footer>
                                                <Button style={{color:'white', backgroundColor:'#104271'}} variant="primary" className="mr-3"
                                                onClick={handleDelete}>
                                                    Close
                                                </Button>
                                                <Button style={{color:'white', backgroundColor:'#104271'}} variant="primary" 
                                                onClick={(event) => deleteActivity(event, val.project_activity_id)}>Yes, delete</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </td>
                                </tr>
                            </tbody>
                    )
                })}
                </Table>
            </Row>
            :
            <Row>
                <p className = "text-center">No activity has been added yet!</p>
            </Row>
            ):<span></span>
        }
    </div>
  )
}

export default ViewProjectActivity