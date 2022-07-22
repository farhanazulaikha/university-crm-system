import React, {useContext, useState} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import './News.css'
import Axios from 'axios'
import { UserContext, UserTypeContext } from './../Helper/Context';

var moment = require('moment');


function Comment({comment, newsList}) {

    const replies = newsList.filter((newList) => newList.reply_of === comment.news_id);

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [commen, setComment] = useState("");
    const [edComment, setEdComment] = useState("");

    const [displayForm, setDisplayForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var d = new Date(date);
    var day = d.toLocaleDateString('en-us', {weekday:'long'});

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const addComment = async(e, news_id) => {

        e.preventDefault();

        const res = await Axios.post("http://localhost:3001/addpostcomment", {
            post: commen,
            userId: userId,
            userType: type,
            date: date,
            day: day,
            time: time,
            reply_of: news_id,
        }).then(()=> {
            setDisplayForm(false);
        })

    }

    const editComment = (e, news_id) => {

        e.preventDefault();

        Axios.put("http://localhost:3001/editpostcomment", {
            news_id: news_id,
            post_title: edComment,
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
                    {comment.lecturer_name}
                    {comment.representative_name}
                </div>
                <div>{comment.day}, {moment(comment.date).format('DD-MM-YYYY')} at {comment.time}</div>
            </div>
            <div className="comment-text">{comment.news_title}</div>
            <div className="comment-actions">
                <Button className = "comment-action" onClick={() => {
                        setDisplayForm(comment.news_id);
                }} variant="link">Reply</Button>
                {comment.lecturer_id === userId || comment.representative_id === userId ?
                    <Button className = "comment-action" onClick={() => {
                        setEditForm(comment.news_id);
                    }} variant="link">Edit</Button>
                    :<span></span>
                }
                
            </div>
            {displayForm === comment.news_id && (
                <Form className="pt-3" onSubmit={(e) => addComment(e, comment.news_id)}>
                <Form.Group className="mb-3" controlId="commentId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                        onChange = {(event) => {
                            setComment(event.target.value);
                        }}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3 mr-3">
                    <Button  className = "mx-3" onClick={cancelReply} style={{color:'white', backgroundColor:'#104271'}} type="button">Cancel</Button>
                    <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Comment</Button>
                </div>
                </Form>
            )}
            {editForm === comment.news_id && (
                <Form className="pt-3" onSubmit={(e) => editComment(e, comment.news_id)}>
                <Form.Group className="mb-3" controlId="commentId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your comment here"  
                        onChange = {(event) => {
                            setEdComment(event.target.value);
                        }}
                        defaultValue={comment.news_title}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3 mr-3">
                    <Button className = "mx-3" onClick={cancelEdit} style={{color:'white', backgroundColor:'#104271'}} type="button">Cancel</Button>
                    <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Edit</Button>
                </div>
                </Form>
            )}
        
            {replies.length > 0 ? (
                <div className="replies">
                    {replies.map((reply, key) => (
                        <div key={key}>
                          <Comment comment={reply} newsList={newsList}/>
                        </div>
                    ))}
                </div>
            )
            :
            <span></span>
        }
        </div>
    </div>
  )
}

export default Comment