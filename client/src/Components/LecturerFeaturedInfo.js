import React, {useEffect, useState, useContext} from 'react'
import { IoInformationCircleSharp } from "react-icons/io5";
import './LecturerFeaturedInfo.css'
import Axios from 'axios';
import { UserContext } from './../Helper/Context';
import { FaClipboardList } from "react-icons/fa";

function LecturerFeaturedInfo() {

    const {userId, setUserId} = useContext(UserContext);

    const [projectNumber, setProjectNumber] = useState(0);
    const [pendingActivity, setPendingActivity] = useState(0);
    

    useEffect(()=>{

        Axios.get(`http://localhost:3001/${userId}/totalproject1`,{
            id: userId,
    })
        .then((res) => {
                setProjectNumber(res.data.projectTotal);
            
        });
    }, [projectNumber]);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/${userId}/pendinglect`,{
            id: userId,
    })
        .then((res) => {
            setPendingActivity(res.data.pendingTotal);
        });
    }, [pendingActivity]);

  return (
    <div className = "featured">
        <div className = "featuredItem">
            <span className = "featuredTitle">Project Total <IoInformationCircleSharp className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {projectNumber}
                </span>
                
            </div>
            <span className="featuredSub">Including RnD and TnL projects</span>
        </div>
        <div className = "featuredItem">
            <span className = "featuredTitle">Pending Activity <FaClipboardList className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {pendingActivity}                
                    </span>
                
            </div>
            <span className="featuredSub">Including unresolved activities from project</span>
        </div>
    </div>
  )
}

export default LecturerFeaturedInfo