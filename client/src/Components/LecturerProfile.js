import React, {useContext, useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { BsFillPersonFill } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import './LectProfile.css';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import LecturerChart from './LecturerChart';
import LecturerProject from './LecturerProject';

function LecturerProfile(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {userType, isUserType} = useContext(UserTypeContext);

    const [userImg, setUserImg] = useState(false);

    const [lecturerEmail, setLEmail] = useState("");
    const [lecturerName, setLName] = useState("");
    const [lecturerContact, setLContact] = useState("");
    const [lecturerPreferences, setLPreferences] = useState("");
    const [lecturerImage, setLImage] = useState("");

    const lectName = <span><BsFillPersonFill/></span>
    const lectEmail = <span><VscMail/></span>
    const lectContact = <span><BsFillTelephoneFill/></span>
    const lectPref = <span><AiFillLike/></span>

    const addProject = () => {

        // const id = userId;
        history.push(`/lecturer/${userId}/lectureraddproject`);
    }


    const moreProject = () => {

        history.push(`/lecturer/${userId}/yourproject`);
    }

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setLEmail(res.data.email);
            setLName(res.data.name);
            setLContact(res.data.contactNo);

            if(res.data.preferences === null || res.data.preferences === ""){
                setLPreferences("No preferences set yet");
            }
            else{
                setLPreferences((res.data.preferences).replace(/,/g, ", "));

            }
            setLImage(res.data.image);

            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
        })
    }, []);

    return(
        <div className = "profile">
            <div className = "profileItem">
            <span className = "profileTitle">Profile</span>
                <div className="profileContainer">
                    <span className="icon">
                        {lectName}
                    </span>
                    <span className="info">
                        {lecturerName}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {lectEmail}
                    </span>
                    <span className="info">
                        {lecturerEmail}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {lectContact}
                    </span>
                    <span className="info">
                        {lecturerContact}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {lectPref}
                    </span>
                    <span className="info">
                        {lecturerPreferences}
                    </span>
                </div>
            </div>
            <div className = "profileItem">
                <span className = "profileTitle">Project Category</span>
                <div className="profileContainer">
                    <LecturerChart/>
                </div>
                
            </div>
            <div className = "profileItem">
                <span className = "profileTitle">Project List
                <span className="featuredSub px-3 pt-1">Including three latest projects</span>
                
                </span>
                <div className="profileContainer">
                    <LecturerProject/>
                </div>
                <div className="d-flex flex-end  justify-content-end align-items-end mt-1">
                <Button style={{color:'white', backgroundColor:'#104271', fontSize:'15px'}} type = "submit" className = "addBtn btn-link text-black bg-white border-0 text-right" onClick={addProject}>
                                 Add
                </Button>
                <Button style={{color:'white', backgroundColor:'#104271', fontSize:'15px'}} type = "submit" className = "addBtn btn-link text-black bg-white border-0 text-right" onClick={moreProject}>
                                 More
                </Button>
                </div>
                
            </div>
    </div>
    )
}

export default LecturerProfile;