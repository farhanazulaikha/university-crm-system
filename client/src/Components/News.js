import React, {useState, useContext, useEffect} from 'react'
import {Form, Button, Modal, Row, Col} from 'react-bootstrap'
import Axios from 'axios'
import { UserContext, UserTypeContext } from './../Helper/Context';

function News() {

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [news, setNews] = useState("");

    const [newsL, setNewsL] = useState("");
    const [isNewsL, setIsNewsL] = useState(false);
    const [newsListL, setNewsListL] = useState([]);

    const [newsR, setNewsR] = useState("");
    const [isNewsR, setIsNewsR] = useState(false);
    const [newsListR, setNewsListR] = useState([]);

    const [newsList, setNewsList] = useState([]);

    const [showNews, setShowNews] = useState(false);
    const handleClose = () => setShowNews(false);

    useEffect(()=>{
        Axios.get(`http://localhost:3001/lecturerpost`,{
            
        })
        .then((response) => {
            if(response.data.length > 0){
                // setIsNews(true);
                setNewsList(response.data);
            }
        })
    });

    // useEffect(()=>{
    //     Axios.get(`http://localhost:3001/representativepost`,{
            
    //     })
    //     .then((response) => {
    //         if(response.data.length > 0){
    //             setIsNewsR(true);
    //             setNewsListR(response.data);
    //         }
    //         else{
    //             setIsNewsR(false);
    //         }
    //     })
    // });

    // newsList = newsListL.concat(newsListR);

    // console.log(newsList);

    const addNews = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:3001/addpost", {
            post: news,
            userId: userId,
            userType: type,
            date: date,
            time: time,
        }).then((res) => {
            setShowNews(true);
        })

    }

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return (
    <div className = "p-5">
            <Form onSubmit={addNews}>
                <Form.Group className="mb-3" controlId="postId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your post here"  
                        onChange = {(event) => {
                            setNews(event.target.value);
                        }}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <Button type="submit">Post</Button>
                </div>
            </Form>

            <Col className = "mb-5 text-center">
                {newsList.map((val, key) => {
                    return(
                        <div key = {key}>
                            <Row>
                                {val.lecturer_id}
                            </Row>
                            <Row>
                                {val.lecturer_news_title}
                            </Row>
                            <Row>
                                {val.date}
                            </Row>
                            <Row>
                                {val.time}
                            </Row>                   
                        </div>
                    )
                })}
            </Col>

            <Modal show={showNews} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>SUCCESSFUL</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your post has been published!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            

        </div>
  )
}

export default News