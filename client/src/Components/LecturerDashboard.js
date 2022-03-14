import React from 'react'
import LecturerProfile from './LecturerProfile';
import {Card, Row, Col} from 'react-bootstrap'
import './Profile.css'
import LecturerProject from './LecturerProject';

function LecturerDashboard(){
    return(
        <div className="d-flex justify-content-center">
            <Card>
                <Card.Body className = "m-3">
                <h3 className = "m-3">Personal Information</h3>
                <hr/>
                <Row >
                    <Col>
                        <LecturerProfile/>
                    </Col>
                    <Col>
                        <LecturerProject/>
                    </Col>
                    <Col>
                    activity
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LecturerDashboard;