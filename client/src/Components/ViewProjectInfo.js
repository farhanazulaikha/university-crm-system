import React, {useEffect, useState, useContext} from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap';
import Axios from 'axios';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';

var moment = require('moment');

function ViewProjectInfo({itemID, isOwner}) {

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const history = useHistory();

    var projectId = itemID;
    // var isOwner=props.isOwner;

    const [projectTitle, setProjectTitle] = useState("");
    const [projectInformation, setProjectInformation] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectField, setProjectField] = useState("");
    const [projectOwner, setProjectOwner] = useState("");
    const [lecturerName, setLecturerName] = useState("");
    const [representativeName, setRepresentativeName] = useState("");
    const [projectDate, setProjectDate] = useState(new Date());
    const [projectTime, setProjectTime] = useState("");
    const [projectDay, setProjectDay] = useState("");

    const [uname, setName] = useState("");
    const [cName, setCName] = useState("");

    useEffect(()=>{

        if(type === 'Lecturer'){
            Axios.get(`http://localhost:3001/lecturer/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            setProjectTitle(res.data.projectTitle);
            setProjectInformation(res.data.projectInformation);
            setProjectStatus(res.data.projectStatus);
            setProjectType(res.data.projectType);
            setProjectField(res.data.projectField);
            setProjectOwner(res.data.projectOwner);
            setLecturerName(res.data.lecturerName);
            setRepresentativeName(res.data.representativeName);
            setProjectDate(res.data.projectDate);
            setProjectTime(res.data.projectTime);
            setProjectDay(res.data.projectDay);


            if (projectOwner === 'Lecturer'){
                setName(lecturerName);
                if(res.data.representativeName === null){
                    setCName("None");
                }
                else{
                    setCName(representativeName);
                }
            }
            else if(projectOwner === 'Representative'){
                setName(representativeName);

                if(res.data.lecturerName === null){
                    setCName("None");
                }
                else{
                    setCName(lecturerName);
                }
            }

            if (projectOwner === 'Lecturer'){
                setName(lecturerName);
            }
            else if(projectOwner === 'Representative'){
                setName(representativeName);
            }
        })
        }
        else if(type === 'Representative'){
            Axios.get(`http://localhost:3001/representative/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            setProjectTitle(res.data.projectTitle);
            setProjectInformation(res.data.projectInformation);
            setProjectStatus(res.data.projectStatus);
            setProjectType(res.data.projectType);
            setProjectField(res.data.projectField);
            setLecturerName(res.data.lecturerName);
            setRepresentativeName(res.data.representativeName);
            setProjectOwner(res.data.projectOwner);
            setProjectDate(res.data.projectDate);
            setProjectTime(res.data.projectTime);
            setProjectDay(res.data.projectDay);

            if (projectOwner === 'Lecturer'){
                setName(lecturerName);
                if(res.data.representativeName === null){
                    setCName("None");
                }
                else{
                    setCName(representativeName);
                }
            }
            else if(projectOwner === 'Representative'){
                setName(representativeName);

                if(res.data.lecturerName === null){
                    setCName("None");
                }
                else{
                    setCName(lecturerName);
                }
            }
            
        })
        }
    });

    const updateProject = () => {

        if(type==='Lecturer'){
            history.push(`/lecturer/${userId}/editproject/${projectId}`)
        }
        else if(type==='Representative'){
            history.push(`/representative/${userId}/editproject/${projectId}`)
        }
    }

  return (
    <div>
        <Row>
            <Col className="col-10">
                <Card.Title><strong>{projectTitle}</strong></Card.Title>
            </Col>
            {isOwner &&
                <Col className = "d-flex justify-content-end col-1">
                    <Button style={{color:'white', backgroundColor:'#104271'}}  className = "d-flex justify-content-end pr-3"
                    onClick = {updateProject}>Edit</Button>
                </Col>
            }
        </Row>
        <hr/>
        <Row className = "mb-3">
                        <Col className = "text-muted col-4">
                            Project Information
                        </Col>
                        <Col className = "col-8">
                            {projectInformation}
                        </Col>
                    </Row>
                    <Row className = "mb-3">
                        <Col className = "text-muted col-4">
                            Project Status
                        </Col>
                        <Col className = "col-8">
                            {projectStatus}
                        </Col>
                    </Row>
                    <Row className = "mb-3">
                        <Col className = "text-muted col-4">
                            Project Type
                        </Col>
                        <Col className = "col-8">
                            {projectType}
                        </Col>
                    </Row>
                    <Row className = "mb-3">
                        <Col className = "text-muted col-4">
                            Project Field
                        </Col>
                        <Col className = "col-8">
                            {projectField}
                        </Col>
                    </Row>
                    <Row className = "mb-1">
                        <Col className = "text-muted col-4">
                            Project Collaborator
                        </Col>
                        <Col className = "col-8">
                            {cName}
                        </Col>
                    </Row>
                    <br/>
                    <strong>Posted by</strong>
                    <Row>
                        <p>{uname}, <span className="text-muted">{projectDay} {moment(projectDate).format('DD-MM-YYYY')} at {projectTime}</span></p>
                    </Row>
    </div>
  )
}

export default ViewProjectInfo