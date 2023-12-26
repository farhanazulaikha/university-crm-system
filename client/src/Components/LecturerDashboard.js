import React from 'react'
import LecturerProfile from './LecturerProfile';
import LecturerProject from './LecturerProject';
import LecturerFeaturedInfo from './LecturerFeaturedInfo';
import ProjectRecommendation from './ProjectRecommendation';

function LecturerDashboard(){
    return(
        <div className="home">
            <h4 className = "px-4 pb-1 pt-3">Dashboard<hr/></h4>
            <LecturerFeaturedInfo/>
            <LecturerProfile/>
            <ProjectRecommendation/>
        </div>
    )
}

export default LecturerDashboard;