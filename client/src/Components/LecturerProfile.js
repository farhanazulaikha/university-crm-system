import React, {useContext, useEffect, useState} from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import user from './../assets/user.png'
import { UserContext, UserTypeContext } from './../Helper/Context';
import './Profile.css'
import Axios from 'axios';

function LecturerProfile(){

    const {userId, setUserId} = useContext(UserContext);
    const {userType, isUserType} = useContext(UserTypeContext);

    const [lecturerEmail, setLEmail] = useState("");
    const [lecturerName, setLName] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setLEmail(res.data.email);
            setLName(res.data.name);
            // setUserImage(res.data.userImage);


            // if(res.data.userImage === ""){
            //     setUserImg(false);
            // }
            // else{
            //     setUserImg(true);
            // }
            // console.log(res.data.userEmail);
        })
    })

    return(
        <div className = "text-center">
            <Row>
                <Image className = "rounded user-img" src = {user}/>
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
        </div>
    )
}

export default LecturerProfile;