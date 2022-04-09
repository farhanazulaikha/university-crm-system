import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Row, Button, Form, Modal} from 'react-bootstrap';
import {Image} from 'cloudinary-react';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import AddActivity from './AddActivity';
// import AddComment from './AddComment';
import './ViewProject.css';
// import { BsArrowLeftCircle } from "react-icons/bs";
import user from './../assets/user.png'

var moment = require('moment');

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
    const [lecturerId, setLecturerId] = useState("");
    const [lecturerName, setLecturerName] = useState("");
    const [representativeId, setRepresentativeId] = useState("");
    const [representativeName, setRepresentativeName] = useState("");

    const [name, setName] = useState("");
    // const [commenterName, setCommenterName] = useState("");

    const [isBelong, setIsBelong] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const [isActivity, setIsActivity] = useState(false);
    const [isAttachment, setIsAttachment] = useState(false);
    const [isDiscussion, setIsDiscussion] = useState(false);

    const [modalActivity, setModalActivity] = useState(false);
    // const [modalAttachment, setModalAttachment] = useState(false);

    const [fileSelected, setFile] = useState();


    const [activityList, setActivityList] = useState([]);
    const [attachmentList, setAttachmentList] = useState([]);
    const [discussionList, setDiscussionList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const [comment, setComment] = useState("");

    const [showComment, setShowComment] = useState(false);
    const handleClose1 = () => setShowComment(false);

    // const arrow = <span><BsArrowLeftCircle/></span>

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


            if(userId === representativeId || lecturerId){
                setIsBelong(true);
            }

            if(type === projectOwner){
                setIsOwner(true);
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
            }

            if (projectOwner === 'Lecturer'){
                setName(lecturerName);
            }
            else if(projectOwner === 'Representative'){
                setName(representativeName);
            }
            
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
        Axios.get(`http://localhost:3001/${projectId}/attachment`,{
            projectId: projectId,
        })
        .then((response) => {
            if(response.data.length > 0){
                setIsAttachment(true);
                setAttachmentList(response.data);
            }
            else{
                setIsAttachment(false);
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

    const addNewComment = async(e) => {

        e.preventDefault();

        const re = await Axios.post("http://localhost:3001/addcomment", {
            comment: comment,
            userId: userId,
            userType: type,
            projectId: projectId,
        }).then((res) => {
            setShowComment(true);
            // window.alert('Comment has been added!');
        })

    }

    const updateProject = () => {
        history.push(`/lecturer/${userId}/editproject/${projectId}`)
    }
    
    const uploadImage = async(e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("file", fileSelected);
        formData.append("upload_preset", "sudzesie");

        const r = await Axios.post("https://api.cloudinary.com/v1_1/farhana19/image/upload", formData).then((response) => {
        // console.log(response);
        uploadPicture(response, e);
    })
    }

    const uploadPicture = async(res, event) => {

        event.preventDefault();

        const resp = await Axios.post("http://localhost:3001/uploadattachment",{
            projectId: projectId,
            imageUrl: res.data.secure_url,
        }).then(() => {
            setShowModal(true);
        })
    }

    return(
        <div className="d-flex justify-content-center">
            <Card className = "border m-3 p-5" style={{ width: '80%' }}>
                {/* <Row>

                    <Col className="d-flex justify-content-start">
                        {arrow}  <Link to = '/lecturer/:id/yourproject'>Back</Link>
                    </Col>
                </Row>
                <br/>
                <br/> */}
                <Row>
                    <Col>
                        <Card.Title><strong>{projectTitle}</strong></Card.Title>
                    </Col>
                    {isOwner &&
                        <Col className = "d-flex justify-content-end">
                            <Button variant = "link" className = "btn btn-link d-flex justify-content-end"
                            onClick = {updateProject}>Edit</Button>
                        </Col>
                    }
                </Row>
                <hr/>
                <Card.Body>
                    <Row className = "mb-3">
                        <Col className = "text-muted col-4">
                            Project Information
                        </Col>
                        <Col className = "col-8">
                            {projectInformation}
                        </Col>
                    </Row>
                    {/* <strong>Project Information:</strong> {projectInformation} */}
                    {/* <br/> */}
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
                    <Row className = "mb-1">
                        <Col className = "text-muted col-4">
                            Project Field
                        </Col>
                        <Col className = "col-8">
                            {projectField}
                        </Col>
                    </Row>
                    {/* <strong>Project Status:</strong> {projectStatus}
                    <br/>
                    <strong>Project Type:</strong> {projectType}
                    <br/>
                    <strong>Project Field:</strong> {projectField} */}
                    {/* <br/> */}
                    <br/>
                    <strong>Posted by</strong>
                    {
                        isOwner ?
                        <Row>
                            <p>{name}</p>
                        </Row>
                        :
                        <Row>
                            <Button variant = "link" className = "btn btn-link d-flex justify-content-start">{name}</Button>
                        </Row>
                    }
                    <hr/>
                    {
                        isBelong &&
                        <Row>
                            <Col className = "d-flex justify-content-start fw-bold">
                                Activity
                            </Col>
                            <Col className = "d-flex justify-content-end">
                                <Button variant="link" onClick={ () => setModalActivity(true)}>+ Add</Button>
                                <AddActivity
                                    show={modalActivity}
                                    itemID={projectCode}
                                    onHide={()=> setModalActivity(false)}
                                />
                            </Col>
                        <hr/>
                        </Row>
                    }
                    
                    {
                        isBelong ?
                        ( isActivity ?
                        <Row className = "mb-5 text-center">
                            <Col className = "fw-bold">Title</Col>
                            <Col className = "fw-bold">Information</Col>
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
                                    </Row>
                                    
                                    </div>
                                )
                            })}
                        </Row>
                        :
                        <Row>
                            <p className = "text-center">No activity has been added yet!</p>
                        </Row>
                        ):<span></span>
                    }
                    {
                        isBelong &&
                        <Row>
                        <Col>
                            <Row className = "d-flex justify-content-start fw-bold">
                                Attachment
                            </Row>
                            <hr/>
                            <Row>
                                    <Form>
                                        {/* <Form.Group className="mb-3" controlId="projectId">
                                            <Form.Label>Project ID: {projectId}</Form.Label>
                                        </Form.Group> */}
                                        <Form.Group className="mb-3" controlId="image">
                                            {/* <Form.Label>Upload file</Form.Label> */}
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
                                            {/* <div className = "px-3">
                                            <Button onClick={props.onHide} className = "mr-3">Close</Button>
                                            </div> */}
                                            <div>
                                                <Button onClick={uploadImage}>Save</Button>
                                            {/* <Button onClick={addAttachment}>Save</Button> */}
                                            </div>
                                        </div>
                                    </Form>
                                </Row>

                                <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>SUCCESSFUL</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>You have successfully uploaded an image!</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                                    {/* <Button variant="link" onClick={ () => setModalAttachment(true)}>+ Add</Button>
                                        <AddAttachment
                                            show={modalAttachment}
                                            itemID={projectCode}
                                            onHide={()=> setModalAttachment(false)}
                                        /> */}
                        </Col>   
                        </Row>  
                    }
                    {
                        isBelong ?
                        (
                            isAttachment ?
                            <Row className = "mb-5 text-center">
                                <Col className = "fw-bold">Image</Col>
                                {attachmentList.map((val2, key2) => {
                                    return(
                                        <div key = {key2}>
                                        
                                        <Row>
                                            <Col>
                                                <Image
                                                    style={{width: 200}}
                                                    className="d-flex justify-content-center"
                                                    cloudName="farhana19"
                                                    publicId={val2.project_attachment_url}
                                                />
                                                
                                            </Col>
                                        </Row>
                                        
                                        </div>
                                    )
                                })}
                            </Row>
                            :
                            <Row>
                                <p className = "text-center">No attachment has been added yet!</p>
                            </Row>
                        ):
                        <span></span>
                    }
                    <Row>
                        <Col className = "mb-3 fw-bold">
                            Discussion
                        </Col>
                    <hr/>
                    </Row>
                    <Row>
                        <Form onSubmit={addNewComment}>
                            <Form.Group className="mb-3" controlId="commentId">
                                <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                                    onChange = {(event) => {
                                        setComment(event.target.value);
                                    }}
                                />
                            </Form.Group>
                            
                            <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                                <Button type="submit">Post</Button>
                            </div>
                        </Form>

                        <Modal show={showComment} onHide={handleClose1}>
                            <Modal.Header closeButton>
                            <Modal.Title>SUCCESSFUL</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Your comment has been posted!</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* <AddComment 
                        itemID={projectCode}
                        /> */}
                    </Row>
                    {/* <Row> */}
                    {
                            isDiscussion
                            ?
                            <Col className = "mb-3">
                                {discussionList.map((val1, key1) => {
                                return(
                                    <div key = {key1}>
                                    <Row className = "border p-3 mb-3">
                                        <Col className = "col-3">
                                            <Image className = "user-img1" src = {user} />
                                        </Col>
                                        <Col className = "col-9">
                                            <Row>
                                                <strong>{val1.lecturer_name}</strong>
                                                <strong>{val1.representative_name}</strong>
                                                {/* <i>commented...</i> */}
                                            </Row>
                                            <Row>
                                                {val1.project_comment_info}
                                            </Row>
                                        </Col>
                                        <br/>
                                    </Row>
                                    </div>
                                )
                                }
                                )}
                            </Col>
                            :
                            <p className = "text-center">No comment has been made yet!</p>
                    }
                    {/* </Row> */}
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default ViewProject;