import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import './Profile.css'
import RepresentativeProject from './RepresentativeProject';
import RepresentativeActivity from './RepresentativeActivity';
import RepresentativeProfile from './RepresentativeProfile';

function RepresentativeDashboard(){
    return(
        <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
                <Card.Body className = "m-3">
                <h3 className = "m-3">Personal Information</h3>
                <hr/>
                <Row >
                    <Col>
                        <RepresentativeProfile/>
                    </Col>
                    <Col>
                        <RepresentativeProject/>
                    </Col>
                    <Col>
                        <RepresentativeActivity/>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RepresentativeDashboard;