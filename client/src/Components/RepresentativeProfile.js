import React, {useContext, useEffect, useState} from 'react'
import { UserContext, UserTypeContext } from './../Helper/Context';
import { Button } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import './LectProfile.css'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import RepresentativeChart from './RepresentativeChart';
import RepresentativeProject from './RepresentativeProject';

function RepresentativeProfile(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [userImg, setUserImg] = useState(false);


    const [repEmail, setREmail] = useState("");
    const [repName, setRName] = useState("");
    const [repContact, setRContact] = useState("");
    const [repPref, setRPref] = useState("");
    const [repType, setRType] = useState("");
    const [repCom, setRCom] = useState("");

    const reprName = <span><BsFillPersonFill/></span>
    const reprEmail = <span><VscMail/></span>
    const reprContact = <span><BsFillTelephoneFill/></span>
    const reprPref = <span><AiFillLike/></span>
    const reprType = <span><BsChevronDoubleRight/></span>
    const reprCompany = <span><BsBuilding/></span>

    const addProject = () => {

        history.push(`/representative/${userId}/representativeaddproject`);
    }


    const moreProject = () => {

        history.push(`/representative/${userId}/yourproject`);
    }

    useEffect(()=>{

        Axios.get(`http://localhost:3001/repprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            setREmail(res.data.email);
            setRName(res.data.name);
            setRContact(res.data.contactNo);

            if(res.data.ttype === null){
                setRType("No representative type set yet");
            }
            else{
                setRType(res.data.tttype);
            }

            if(res.data.com_name === null){
                setRCom("No company set yet");
            }
            else{
                setRCom(res.data.com_name);
            }

            if(res.data.preferences === null || res.data.preferences === ""){
                setRPref("No preferences set yet");
            }
            else{
                setRPref((res.data.preferences).replace(/,/g, ", "));

            }


            if(res.data.image === null){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
        })
    },[])

    return(
        <div className = "profile">
            <div className = "profileItem">
            <span className = "profileTitle">Profile</span>
                <div className="profileContainer">
                    <span className="icon">
                        {reprName}
                    </span>
                    <span className="info">
                        {repName}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {reprEmail}
                    </span>
                    <span className="info">
                        {repEmail}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {reprType}
                    </span>
                    <span className="info">
                        {repType}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {reprContact}
                    </span>
                    <span className="info">
                        {repContact}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {reprPref}
                    </span>
                    <span className="info">
                        {repPref}
                    </span>
                </div>
                <div className="profileContainer">
                    <span className="icon">
                        {reprCompany}
                    </span>
                    <span className="info">
                        {repCom}
                    </span>
                </div>
            </div>
            <div className = "profileItem">
                <span className = "profileTitle">Project Category</span>
                <div className="profileContainer">
                    <RepresentativeChart/>
                </div>
                
            </div>
            <div className = "profileItem">
                <span className = "profileTitle">Project List
                    <span className="featuredSub px-3 pt-1">Including three latest projects</span>
                </span>
                <div className="profileContainer">
                    <RepresentativeProject/>
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

export default RepresentativeProfile;