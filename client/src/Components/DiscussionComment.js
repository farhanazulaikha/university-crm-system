import React, {useContext, useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import './News.css'
import { UserContext, UserTypeContext } from './../Helper/Context';
import Axios from 'axios';

var moment = require('moment');

function DiscussionComment({discomment, discussionList}) {

    const disreplies = discussionList.filter((discussion) => discussion.project_comment_replyof === discomment.project_comment_id);

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [displayForm, setDisplayForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [comment, setComment] = useState("");
    const [edComment, setEdComment] = useState("");

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var d = new Date(date);
    var day = d.toLocaleDateString('en-us', {weekday:'long'});

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();



    const addComment = async(e, project_comment_id, project_id) => {

        e.preventDefault();

        const res = await Axios.post("http://localhost:3001/adddiscussioncomment", {
            post: comment,
            userId: userId,
            userType: type,
            date: date,
            day: day,
            time: time,
            reply_of: project_comment_id,
            project_id: project_id,
        }).then(()=> {
            setDisplayForm(false);
        })

    }

    const editComment = (e, project_comment_id) => {

        e.preventDefault();

        Axios.put("http://localhost:3001/editprojectcomment", {
            project_comment_id: project_comment_id,
            comment_title: edComment,
            userType: type,
            
        }).then(()=> {
            setEditForm(false);
        })

    }

    const cancelReply = (e) => {
        e.preventDefault();

        setDisplayForm(false);
    }

    const cancelEdit = (e) => {
        e.preventDefault();

        setEditForm(false);
    }

  return (
    <div className="comment">
    <div className="comment-image-container">
        <img src = "/user-icon.png" />
    </div>
    <div className="comment-right-part">
        <div className="comment-content">
            <div className="comment-author">
                {discomment.lecturer_name}
                {discomment.representative_name}
            </div>
            <div>{discomment.project_comment_day}, {moment(discomment.project_comment_date).format('DD-MM-YYYY')} at {discomment.project_comment_time}</div>
        </div>
        <div className="comment-text">{discomment.project_comment_info}</div>
        <div className="comment-actions">
            <Button className = "comment-action" onClick={(event) => {
                    setDisplayForm(discomment.project_comment_id);
            }} variant="link">Reply</Button>
            {discomment.lecturer_id === userId || discomment.representative_id === userId ?
                    <Button className = "comment-action" onClick={() => {
                        setEditForm(discomment.project_comment_id);
                    }} variant="link">Edit</Button>
                    :<span></span>
                }
            
        </div>
        {displayForm === discomment.project_comment_id && (
            <Form className="pt-3" onSubmit={(e) => addComment(e, discomment.project_comment_id, discomment.project_id)}>
            <Form.Group className="mb-3" controlId="commentId">
                <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                    onChange = {(event) => {
                        setComment(event.target.value);
                    }}
                />
            </Form.Group>
            
            <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                <Button  className = "mx-3" onClick={cancelReply} style={{color:'white', backgroundColor:'#104271'}} type="button">Cancel</Button>
                <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Comment</Button>
            </div>
            </Form>
        )}
        {editForm === discomment.project_comment_id && (
                <Form className="pt-3" onSubmit={(e) => editComment(e, discomment.project_comment_id)}>
                <Form.Group className="mb-3" controlId="commentId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                        onChange = {(event) => {
                            setEdComment(event.target.value);
                        }}
                        defaultValue={discomment.project_comment_info}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3 mr-3">
                    <Button className = "mx-3" onClick={cancelEdit} style={{color:'white', backgroundColor:'#104271'}} type="button">Cancel</Button>
                    <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Edit</Button>
                </div>
                </Form>
            )}
        {disreplies.length > 0 && (
            <div className="replies">
                {disreplies.map((reply, key) => (
                    <div key={key}>
                    <DiscussionComment discomment={reply} discussionList={discussionList}/>
                    </div>
                ))}
            </div>
        )}
    </div>
</div>
  )
}

export default DiscussionComment