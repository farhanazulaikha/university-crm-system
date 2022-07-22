import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Row, Table} from 'react-bootstrap';
import { UserContext } from './../Helper/Context';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import { BsArrowLeftCircle } from "react-icons/bs";


function ViewCompany() {

  const link = window.location.pathname;
  const split = link.split("/");
  const companyId = split[4];

  const arrow = <span><BsArrowLeftCircle/></span>


  const {userId, setUserId} = useContext(UserContext);

  const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyContact, setCompanyContact] = useState("");
    const [companyPreferences, setCompanyPreferences] = useState("");
    const [companySector, setCompanySector] = useState("");
    const [companyCategory, setCompanyCategory] = useState("");

    const [projectList, setProjectList] = useState([]);
    const [companyProject, isCompanyProject] = useState (false);


  useEffect(()=>{

        Axios.get(`http://localhost:3001/lecturer/${userId}/company/${companyId}`,{
            userId: userId,
            companyId: companyId,
    })
    .then((res) => {
        setCompanyName(res.data.companyName);
        setCompanyEmail(res.data.companyEmail);
        setCompanyContact(res.data.companyContact);
        setCompanyCategory(res.data.companyCategory);
        setCompanySector(res.data.companySector);
        setCompanyPreferences(res.data.companyPreferences);
    })
  });

  useEffect(()=>{

    Axios.get(`http://localhost:3001/lecturer/${userId}/compproject/${companyId}`,{
        userId: userId,
        companyId: companyId,
    })
    .then((res) => {
        setProjectList(res.data);
    })
    });

  return (
    <div className="d-flex justify-content-center">
    <Card className = "border m-3 p-5" style={{ width: '80%' }}>
    <Row  className = "mb-3">
                
        <Col className="d-flex justify-content-start">
            <Link to = '/lecturer/:id/companylist'>{arrow} Back to Company List</Link>
        </Col>
        </Row>
        
        <Row>
            <Card.Title><strong>{companyName}</strong></Card.Title>
        </Row>
        <hr/>
        <Card.Body>
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Email
                </Col>
                <Col className = "col-8">
                    {companyEmail}
                </Col>
            </Row>
            
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Contact Number
                </Col>
                <Col className = "col-8">
                    {companyContact}
                </Col>
            </Row>
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Category
                </Col>
                <Col className = "col-8">
                    {companyCategory}
                </Col>
            </Row>
            <Row className = "mb-3">
                <Col className = "text-muted col-4">
                    Sector
                </Col>
                <Col className = "col-8">
                    {companySector}
                </Col>
            </Row>
            <Row className = "mb-1">
                <Col className = "text-muted col-4">
                    Preferences
                </Col>
                <Col className = "col-8">
                    {companyPreferences}
                </Col>
            </Row>
            <hr/>
            <Row>
                Project List
            </Row>
            <Row>
                {companyProject &&
                
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            {/* <th>No.</th> */}
                            <th>Title</th>
                            <th>Information</th>
                            <th>Type</th>
                            <th>Field</th>
                            <th>Representative</th>
                        </tr>
                        </thead>
                        {projectList.map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                            <td>
                                {val.project_title}
                                
                            </td>
                                <td>{val.project_information}</td>
                                <td>{val.project_type_label}</td>
                                <td>{val.project_field_label}</td>
                                <td>{val.representative_name}</td>
                            </tr>
                            </tbody>
                        );
                        })}
                    </Table>
                }

                        {!companyProject &&
                            <p className = "text-center">No project by the company yet!</p>
                        }
            </Row>
        </Card.Body>
    </Card>
</div>
  )
}

export default ViewCompany