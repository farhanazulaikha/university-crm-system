import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import { UserContext } from './../Helper/Context';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';

function ViewLecturer() {

    const link = window.location.pathname;
    const split = link.split("/");
    const lecturerId = split[4];

  const {userId, setUserId} = useContext(UserContext);

    const [lecturerName, setLecturerName] = useState("");
    const [lecturerEmail, setLecturerEmail] = useState("");
    const [lecturerContact, setLecturerContact] = useState("");
    const [lecturerPreferences, setLecturerPreferences] = useState("");

  useEffect(()=>{

        Axios.get(`http://localhost:3001/representative/${userId}/lecturer/${lecturerId}`,{
            userId: userId,
            lecturerId: lecturerId,
    })
    .then((res) => {
        setLecturerName(res.data.lecturerName);
        setLecturerEmail(res.data.lecturerEmail);
        setLecturerContact(res.data.lecturerContact);
        setLecturerPreferences(res.data.lecturerPreferences);
    })
  });

  return (
    <div className="d-flex justify-content-center">
    <Card className = "border m-3 p-5" style={{ width: '80%' }}>
        
        <Row>
                <Card.Title><strong>{lecturerName}</strong></Card.Title>
        </Row>
        <hr/>
        <Card.Body>
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Email
                </Col>
                <Col className = "col-8">
                    {lecturerEmail}
                </Col>
            </Row>
            
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Contact Number
                </Col>
                <Col className = "col-8">
                    {lecturerContact}
                </Col>
            </Row>
            <Row className = "mb-1">
                <Col className = "text-muted col-4">
                    Preferences
                </Col>
                <Col className = "col-8">
                    {lecturerPreferences}
                </Col>
            </Row>
            <hr/>
            <Row>
                Project List
            </Row>
            <Row>
                {}
            </Row>
        </Card.Body>
    </Card>
    </div>
  )
}

export default ViewLecturer