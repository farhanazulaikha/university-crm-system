import React, {useState, useContext} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import Axios from 'axios'
import { UserContext, UserTypeContext } from './../Helper/Context';

function AddComment(props){

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [comment, setComment] = useState("");

    const [showComment, setShowComment] = useState(false);
    const handleClose = () => setShowComment(false);


    var projectId = props.itemID;

    const addNewComment = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addcomment", {
            comment: comment,
            userId: userId,
            userType: type,
            projectId: projectId,
        }).then((res) => {
            setShowComment(true);
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

            <Modal show={showComment} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>SUCCESSFUL</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your comment has been posted!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddComment;