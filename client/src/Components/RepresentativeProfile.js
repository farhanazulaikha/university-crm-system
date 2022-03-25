import React, {useContext, useEffect, useState} from 'react'
import {Row, Col, Image, Card} from 'react-bootstrap'
import user from './../assets/user.png'
import { UserContext, UserTypeContext } from './../Helper/Context';
import './Profile.css'
import Axios from 'axios';

function RepresentativeProfile(){

    const {userId, setUserId} = useContext(UserContext);
    const {userType, isUserType} = useContext(UserTypeContext);

    const [userImg, setUserImg] = useState(false);


    const [repEmail, setREmail] = useState("");
    const [repName, setRName] = useState("");
    const [repImage, setRImage] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/repprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setREmail(res.data.email);
            setRName(res.data.name);
            setRImage(res.data.image);
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
                    <Image className="user-img" src={repImage}></Image>
                    : 
                    <Image className = "rounded user-img" src = {user}></Image>
                }
                
            </Row>
            <Row>
                <Col>
                <Row>
                {repName}
                </Row>
                <Row>
                {repEmail}
                </Row>
                </Col>
            </Row>
            </Card>
        </div>
    )
}

export default RepresentativeProfile;