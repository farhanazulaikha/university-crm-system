import React, {useState, useContext, useEffect} from 'react'
import {Form, Button, Row, Col, Image} from 'react-bootstrap'
import Axios from 'axios'
import { UserContext, UserTypeContext } from './../Helper/Context';
// import './ViewProject.css';
import { BsArrowReturnRight } from "react-icons/bs";
import Comment from './Comment';
import './News.css'


function News() {

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [news, setNews] = useState("");   

    const arrow = <span><BsArrowReturnRight/></span>

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var d = new Date(date);
    var day = d.toLocaleDateString('en-us', {weekday:'long'});

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


    const [newsList, setNewsList] = useState([]);

    const rootNews = newsList.filter(
        (newList) => newList.reply_of === null
    );
    

    useEffect(()=>{
        
        Axios.get('http://localhost:3001/news',{  
        })
        .then((response) => {
            if(response.data.length > 0){

                setNewsList(response.data);
            
            }

        })

    },[newsList]);


    const addNews = async(e) => {

        e.preventDefault();


        const res = await Axios.post("http://localhost:3001/addpost", {
            post: news,
            userId: userId,
            userType: type,
            date: date,
            day: day,
            time: time,
        }).then(() => {
            setNews(null);
        })

    }

    


  return (
    <div className = "news p-5">
        <h3 className="news-title">News</h3>
        <Form onSubmit={addNews}>
                <Form.Group className="mb-3" controlId="postId">
                    <Form.Control as="textarea" rows={2} placeholder="Enter your post here"  
                        onChange = {(event) => {
                            setNews(event.target.value);
                        }}
                    />
                </Form.Group>
                
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <Button style={{color:'white', backgroundColor:'#104271'}} type="submit">Post</Button>
                </div>
        </Form>
        <div className = "comments-container">
            {rootNews.map((rootNew, key) => (
                <div key={key}>
                    <Comment  
                    comment={rootNew}
                    newsList={newsList}
                    />
                </div>
            ))}
        </div>                      
        </div>
  )
}

export default News