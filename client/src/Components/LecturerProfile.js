import React, {useContext, useEffect, useState} from 'react'
import {Row, Col, Image, Card} from 'react-bootstrap'
import user from './../assets/user.png'
import { UserContext, UserTypeContext } from './../Helper/Context';
import './Profile.css'
import Axios from 'axios';

function LecturerProfile(){

    const {userId, setUserId} = useContext(UserContext);
    const {userType, isUserType} = useContext(UserTypeContext);

    const [userImg, setUserImg] = useState(false);

    const [lecturerEmail, setLEmail] = useState("");
    const [lecturerName, setLName] = useState("");
    const [lecturerImage, setLImage] = useState("");


    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setLEmail(res.data.email);
            setLName(res.data.name);
            setLImage(res.data.image);
            // setUserImage(res.data.userImage);

            // console.log(res.data.image);

            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
            // console.log(res.data.userEmail);
        })
    })

    return(
        <div className = "text-center">
            <Card className = "p-5">
            <Row>
                {userImg
                    ?
                    <Image className="user-img" src={lecturerImage}></Image>
                    : 
                    <Image className = "rounded user-img" src = {user}></Image>
                }
                
            </Row>
            <Row>
                <Col>
                <Row>
                {lecturerName}
                </Row>
                <Row>
                {lecturerEmail}
                </Row>
                </Col>
            </Row>
            </Card>
        </div>
    )
}

export default LecturerProfile;