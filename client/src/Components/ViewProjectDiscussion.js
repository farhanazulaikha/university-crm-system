import React, {useEffect, useState, useContext} from 'react'
import Axios from 'axios';
import {Col, Row, Button, Modal, Form, Image} from 'react-bootstrap';
import user from './../assets/user.png'
import { UserContext, UserTypeContext } from './../Helper/Context';
import DiscussionComment from './DiscussionComment';

var moment = require('moment');

function ViewProjectDiscussion({itemID}) {

    var projectId = itemID;

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [discussionList, setDiscussionList] = useState([]);

    const [comment, setComment] = useState("");

    const rootDiscussion = discussionList.filter(
        (discussList) => discussList.project_comment_replyof === null
    );
    

    useEffect(()=>{
        Axios.get(`http://localhost:3001/${projectId}/discussion`,{
            projectId: projectId,
        })
        .then((response) => {
                setDiscussionList(response.data);
        })
    },[discussionList]);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var d = new Date(date);
    var day = d.toLocaleDateString('en-us', {weekday:'long'});

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const addNewComment = async(e) => {

        e.preventDefault();

        const re = await Axios.post("http://localhost:3001/addcomment", {
            comment: comment,
            userId: userId,
            userType: type,
            date: date,
            day: day,
            time: time,
            projectId: projectId,
        })

    }

  return (
    <div className = "news">
        <Col className = "mb-3 fw-bold">
            Discussion
        </Col>
        <hr/>
        <Form onSubmit={addNewComment}>
        <Form.Group className="mb-3" controlId="commentId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                        onChange = {(event) => {
                            setComment(event.target.value);
                        }}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Post</Button>
                </div>
        </Form>
        <span>Comments ({discussionList.length})</span>
        <hr/>
            {discussionList.length > 0 ?
            <div className = "comments-container">
            {rootDiscussion.map((rootDiscuss, key) => (
                <div key={key}>
                    <DiscussionComment
                    discomment={rootDiscuss}
                    discussionList={discussionList}
                    />
                </div>
            ))}
            </div>
            :
            <p className = "text-center">No comment has been made yet!</p>

            }
    </div>
  )
}

export default ViewProjectDiscussion