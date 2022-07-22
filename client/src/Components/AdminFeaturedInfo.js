import React, {useEffect, useState} from 'react'
import './FeaturedInfo.css'
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";
import { RiBuilding4Fill } from "react-icons/ri";
import Axios from 'axios';


function AdminFeaturedInfo() {

    const [projectNumber, setProjectNumber] = useState(0);
    const [lectNumber, setLectNumber] = useState(0);
    const [repNumber, setRepNumber] = useState(0);
    const [compNumber, setCompNumber] = useState(0);


    useEffect(()=>{

        Axios.get('http://localhost:3001/projecttotal')
        .then((res) => {
                setProjectNumber(res.data.projectTotal);
            
        });
    }, [projectNumber]);

    useEffect(()=>{

        Axios.get('http://localhost:3001/lecttotal')
        .then((res) => {
                setLectNumber(res.data.lectTotal);
            
        });
    }, [lectNumber]);

    useEffect(()=>{

        Axios.get('http://localhost:3001/reptotal')
        .then((res) => {
                setRepNumber(res.data.repTotal);
            
        });
    }, [repNumber]);

    useEffect(()=>{

        Axios.get('http://localhost:3001/comptotal')
        .then((res) => {
                setCompNumber(res.data.compTotal);
            
        });
    }, [compNumber]);

  return (
    <div className = "featured">
        <div className = "featuredItem">
            <span className = "featuredTitle">Project Total <IoInformationCircleSharp className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {projectNumber}
                </span>
                
            </div>
            
        </div>
        <div className = "featuredItem">
            <span className = "featuredTitle">Lecturer Total <IoPeopleCircleSharp className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {lectNumber}
                </span>
                
            </div>
            
        </div>
        <div className = "featuredItem">
            <span className = "featuredTitle">Representative Total <IoPeopleCircleSharp className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {repNumber}
                </span>
                
            </div>
            
        </div>
        <div className = "featuredItem">
            <span className = "featuredTitle">Company Total <RiBuilding4Fill className ="featuredIcon"/></span>
            <div className="featuredContainer">
                <span className="featuredInfo">
                    {compNumber}
                </span>
                
            </div>
            
        </div>
    </div>
  )
}

export default AdminFeaturedInfo