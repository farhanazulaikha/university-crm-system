import React from 'react'
import RepresentativeProfile from './RepresentativeProfile';
import ProjectRecommendation from './ProjectRecommendation';
import RepresentativeFeaturedInfo from './RepresentativeFeaturedInfo';

function RepresentativeDashboard(){
    return(
        <div className="home">
            <h4 className = "px-4 pb-1 pt-3">Dashboard<hr/></h4>
            <RepresentativeFeaturedInfo/>
            <RepresentativeProfile/>
            <ProjectRecommendation/>
        </div>
        // <div className="d-flex justify-content-center">
        //     <Card style={{ width: '70%' }}>
        //         <Card.Body className = "m-3">
        //         <h3 className = "m-3">Personal Information</h3>
        //         <hr/>
        //         <Row >
        //             <Col className = "col-4">
        //                 <RepresentativeProfile/>
        //             </Col>
        //             <Col className = "col-8">
        //                 <Row className = "pb-3">
        //                     <Col>
        //                         <RepresentativeProject/>
        //                     </Col>
        //                     <Col>
        //                         <RepresentativeActivity/>
        //                     </Col>
        //                 </Row>
        //                 <Row className = "rec">
        //                     <ProjectRecommendation/>
        //                 </Row>
        //             </Col>
        //         </Row>
        //         </Card.Body>
        //     </Card>
        // </div>
    )
}

export default RepresentativeDashboard;