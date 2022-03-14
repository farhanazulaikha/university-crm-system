import React, {useState, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import Axios from 'axios'
import { UserContext, UserTypeContext } from './../Helper/Context';

function AddComment(props){

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [comment, setComment] = useState("");

    var projectId = props.itemID;

    const addNewComment = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addcomment", {
            comment: comment,
            userId: userId,
            userType: type,
            projectId: projectId,
        }).then((res) => {
            window.alert('Comment has been added!');
        })

    }

    return(
        <div>
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
        </div>
    )
}

export default AddComment;