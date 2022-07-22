import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Row, Modal, Button, Table} from 'react-bootstrap';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './ViewProject.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import ViewProjectInfo from './ViewProjectInfo';
import ViewProjectActivity from './ViewProjectActivity';
import ViewProjectAttachment from './ViewProjectAttachment';
import ViewProjectDiscussion from './ViewProjectDiscussion';
import { useHistory } from 'react-router-dom';
import EditActivity from './EditActivity';


function ViewProject (){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    const [projectOwner, setProjectOwner] = useState("");
    const [lecturerId, setLecturerId] = useState("");
    const [representativeId, setRepresentativeId] = useState("");

    const [isBelong, setIsBelong] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const arrow = <span><BsArrowLeftCircle/></span>

    useEffect(()=>{

        if(type === 'Lecturer'){
            Axios.get(`http://localhost:3001/lecturer/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            setProjectOwner(res.data.projectOwner);
            setLecturerId(res.data.lecturerId);
            setRepresentativeId(res.data.representativeId);

            if(userId === lecturerId){
                setIsBelong(true);
            }
            

            // console.log(isBelong);
            if(type === projectOwner){
                setIsOwner(true);
            }
        })
        }
        else if(type === 'Representative'){
            Axios.get(`http://localhost:3001/representative/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            setProjectOwner(res.data.projectOwner);
            setLecturerId(res.data.lecturerId);
            setRepresentativeId(res.data.representativeId);


            if(userId === representativeId){
                setIsBelong(true);
            }

            if(type === projectOwner){
                setIsOwner(true);
            }
            
        })
        }
    });



    return(
        <div className="d-flex justify-content-center">
            <Card className = "border m-3 p-5" style={{ width: '80%' }}>
                <Row className = "mb-3">
                    {type === 'Lecturer' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/lecturer/:id/dashboard'>{arrow} Back to Dashboard</Link>
                        </Col>
                    }
                    {type === 'Representative' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/representative/:id/dashboard'>{arrow} Back to Dashboard</Link>
                        </Col>
                    }
                </Row>
                <Row  className = "mb-3">
                {type === 'Lecturer' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/lecturer/:id/companyprojectlist'>{arrow} Back to Company Project List</Link>
                        </Col>
                    }
                    {type === 'Representative' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/representative/:id/lecturerprojectlist'>{arrow} Back to Lecturer Project List</Link>
                        </Col>
                    }
                </Row>
                <Row>
                {type === 'Lecturer' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/lecturer/:id/yourproject'>{arrow} Back to Your Project List</Link>
                        </Col>
                }
                {type === 'Representative' &&
                        <Col className="d-flex justify-content-start">
                            <Link to = '/representative/:id/yourproject'>{arrow} Back to Your Project List</Link>
                        </Col>
                }
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                <br/>
                
                    <ViewProjectInfo itemID={projectId}
                        isOwner={isOwner}
                    />
                <Card.Body>
                
                    <ViewProjectActivity itemID={projectId}
                        isBelong={isBelong}
                    />
                    {isBelong &&
                        <ViewProjectAttachment itemID={projectId}
                        isBelong={isBelong}/>
                    }
                    
                    <ViewProjectDiscussion itemID={projectId}/>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ViewProject;