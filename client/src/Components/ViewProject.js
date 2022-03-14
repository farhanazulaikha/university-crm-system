import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Row, Button} from 'react-bootstrap';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import LecturerAddActivity from './LecturerAddActivity';
import LecturerAddAttachment from './LecturerAddAttachment';
import AddComment from './AddComment';

function ViewProject (){

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const history = useHistory();

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    const [projectCode, setProjectCode] = useState(0);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectInformation, setProjectInformation] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectField, setProjectField] = useState("");
    const [projectOwner, setProjectOwner] = useState("");
    const [lecturerId, setLecturerId] = useState(0);
    const [lecturerName, setLecturerName] = useState("");
    const [representativeId, setRepresentativeId] = useState(0);
    const [representativeName, setRepresentativeName] = useState("");

    const [name, setName] = useState("");
    const [commenterName, setCommenterName] = useState("");

    const [isBelong, setIsBelong] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const [isActivity, setIsActivity] = useState(false);
    const [isAttachment, setIsAttachment] = useState(false);
    const [isDiscussion, setIsDiscussion] = useState(false);

    const [modalActivity, setModalActivity] = useState(false);
    const [modalAttachment, setModalAttachment] = useState(false);

    const [activityList, setActivityList] = useState([]);
    const [discussionList, setDiscussionList] = useState([]);

    useEffect(()=>{

        if(type === 'Lecturer'){
            Axios.get(`http://localhost:3001/lecturer/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            setProjectCode(res.data.projectId);
            setProjectTitle(res.data.projectTitle);
            setProjectInformation(res.data.projectInformation);
            setProjectStatus(res.data.projectStatus);
            setProjectType(res.data.projectType);
            setProjectField(res.data.projectField);
            setProjectOwner(res.data.projectOwner);
            setLecturerId(res.data.lecturerId);
            setLecturerName(res.data.lecturerName);
            setRepresentativeId(res.data.representativeId);
            setRepresentativeName(res.data.representativeName);

            // console.log(userId, lecturerId, representativeId);

            if(userId === representativeId || lecturerId){
                setIsBelong(true);
            }

            if(type === projectOwner){
                setIsOwner(true);

                if (projectOwner === 'Lecturer'){
                    setName(lecturerName);
                }
                else if(projectOwner === 'Representative'){
                    setName(representativeName);
                }
            }
        })
        }
        else if(type === 'Representative'){
            Axios.get(`http://localhost:3001/representative/${userId}/viewproject/${projectId}`,{
                userId: userId,
                projectId: projectId,
        })
        .then((res) => {
            
        })
        }
    });

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
        })
    });
    
    useEffect(()=>{
        Axios.get(`http://localhost:3001/${projectId}/discussion`,{
            projectId: projectId,
        })
        .then((response) => {
            if(response.data.length > 0){
                setIsDiscussion(true);
                setDiscussionList(response.data);

                // console.log(discussionList);


                // for (var row = 0; row < discussionList.length; row++) {
                //     for (var col = 0; col < discussionList[row].length; col++){
                //         if(discussionList[row][col].length > 0){
                //             setCommenterName(discussionList[3]);
                //         }
                //         else if(discussionList[row][col].length > 0){
                //             setCommenterName(discussionList[4]);
                //         }
                //     }
                //   }
                
            }
            else{
                setIsDiscussion(false);
            }
        })
    });
    

    return(
        <div className="d-flex justify-content-center">
            <Card className = "border m-3 p-5">
                <Card.Title><strong>{projectTitle}</strong></Card.Title>
                <hr/>
                <Card.Body>
                    <strong>Project Information:</strong> {projectInformation}
                    <br/>
                    <strong>Project Status:</strong> {projectStatus}
                    <br/>
                    <strong>Project Type:</strong> {projectType}
                    <br/>
                    <strong>Project Field:</strong> {projectField}
                    <br/>
                    <br/>
                    <strong>Posted by</strong>
                    {
                        isOwner ?
                        <Row>
                            <p>{name}</p>
                        </Row>
                        :
                        <Row>
                            <Button variant="link">{name}</Button>
                        </Row>
                    }
                    <hr/>
                    {
                        isBelong &&
                        <Row>
                            <Col className = "d-flex justify-content-start">
                                Activity
                            </Col>
                            <Col className = "d-flex justify-content-end">
                                <Button variant="link" onClick={ () => setModalActivity(true)}>+ Add</Button>
                                <LecturerAddActivity
                                    show={modalActivity}
                                    itemID={projectCode}
                                    onHide={()=> setModalActivity(false)}
                                />
                            </Col>
                        <hr/>
                        </Row>
                    }
                    
                    {
                        isBelong && isActivity ?
                        <Row className = "mb-5">
                            <Col className = "fw-bold">Title</Col>
                            <Col className = "fw-bold">Information</Col>
                            <Col className = "fw-bold">Start Date</Col>
                            <Col className = "fw-bold">End Date</Col>
                            {activityList.map((val, key) => {
                                return(
                                    <div key = {key}>
                                    
                                    <Row>
                                        <Col>
                                            {val.project_activity_title}
                                        </Col>
                                        <Col>
                                            {val.project_activity_information}
                                        </Col>
                                        <Col>
                                            {val.project_activity_startdate}
                                        </Col>
                                        <Col>
                                            {val.project_activity_enddate}
                                        </Col>
                                    </Row>
                                    
                                    </div>
                                )
                            })}
                        </Row>
                        :
                        <Row>
                            <p className = "text-center">No activity has been added yet!</p>
                        </Row>
                    }
                    {
                        isBelong &&
                        <Row>
                            <Col className = "d-flex justify-content-start">
                                Attachment
                            </Col>
                            <Col className = "d-flex justify-content-end">
                            <Button variant="link" onClick={ () => setModalAttachment(true)}>+ Add</Button>
                                <LecturerAddAttachment
                                    show={modalAttachment}
                                    itemID={projectCode}
                                    onHide={()=> setModalAttachment(false)}
                                />
                            </Col>
                        <hr/>
                        </Row>
                        
                    }
                    {
                        isBelong && isAttachment ?
                        <Row className = "mb-5">
                            <p>try</p>
                        </Row>
                        :
                        <Row>
                            <p className = "text-center">No attachment has been added yet!</p>
                        </Row>
                    }
                    <Row>
                        <Col className = "mb-3">
                            Discussion
                        </Col>
                    <hr/>
                    </Row>
                    <Row>
                        <AddComment 
                        itemID={projectCode}
                        />
                    </Row>
                    <Row>
                    {
                            isDiscussion
                            ?
                            <Row className = "mb-3">
                                {discussionList.map((val1, key1) => {
                                return(
                                    <div key = {key1}>
                                        <Row>
                                            {val1.commenterName}
                                        </Row>
                                        <Row>
                                            {val1.project_comment_info}
                                        </Row>
                                    </div>
                                )
                                }
                                )}
                            </Row>
                            :
                            <p className = "text-center">No comment has been made yet!</p>
                    }
                    </Row>
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default ViewProject;