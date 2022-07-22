import React, {useEffect, useContext, useState} from 'react';
import { UserContext} from './../Helper/Context';
import {Card, Table, Row, Tabs, Tab, Nav, Col, Button, Modal} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";

function AdminDashboard(){

    const {userId, setUserId} = useContext(UserContext);

    const [lect, isLect] = useState (false);
    const [lectList, setLectList] = useState([]);

    const [rep, isRep] = useState (false);
    const [repList, setRepList] = useState([]);

    const [modalAccept, setModalAccept] = useState(false);
    const closeAccept = () => setModalAccept(false);

    const [modalReject, setModalReject] = useState(false);
    const closeReject = () => setModalReject(false);

    const [lectId, setLectId] = useState ("");
    const [repId, setRepId] = useState ("");

    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumber2, setPageNumber2] = useState(0);

    const [pageNumber1, setPageNumber1] = useState(0);
    const [pageNumber3, setPageNumber3] = useState(0);


    useEffect(()=> {
        Axios.get('http://localhost:3001/lecturerrecord')
        .then((res) => {
            if(res.data.length > 0){
                isLect(true);
                setLectList(res.data);
            }
            else{
                isLect(false);
            }
        });
    },[lectList]);

    useEffect(()=> {
        Axios.get('http://localhost:3001/reprecord')
        .then((res) => {
            if(res.data.length > 0){
                isRep(true);
                setRepList(res.data);
            }
            else{
                isRep(false);
            }
        });
    },[repList]);
    
    const acceptUser = (e, lecturer_id) => {

        e.preventDefault();

        Axios.put(`http://localhost:3001/updatelectstatus/${userId}`,{
            userId: lecturer_id,
            lecturer_status: "Active",
        }).then((res) => {
                setModalAccept(true);
            
        })
    }

    const acceptUser1 = (e, representative_id) => {

        e.preventDefault();

        Axios.put(`http://localhost:3001/updaterepstatus/${userId}`,{
            userId: representative_id,
            representative_status: "Active",
        }).then((res) => {
                setModalAccept(true);
            
        })


    }

    const rejectUser = (e, lecturer_id) => {

        e.preventDefault();

        Axios.put(`http://localhost:3001/updatelectstatus/${userId}`,{
            userId: lecturer_id,
            lecturer_status: "Inactive",
        }).then((res) => {
                setModalReject(true);
        })
    }

    const rejectUser1 = (e, representative_id) => {

        e.preventDefault();

        Axios.put(`http://localhost:3001/updaterepstatus/${userId}`,{
            userId: representative_id,
            representative_status: "Inactive",
        }).then((res) => {
                setModalReject(true);
        })
    }

    const lecturerPerPage = 10;
    const pagesVisited = pageNumber * lecturerPerPage;

    const pageCount = Math.ceil(lectList.length / lecturerPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    const repPerPage = 10;
    const pagesVisited1 = pageNumber1 * repPerPage;

    const pageCount1 = Math.ceil(repList.length / repPerPage);

    const changePage1 = ({ selected }) => {
        setPageNumber1(selected);
    };


    return(
        <div className = "m-5">
            <Card className="m-3 p-5">
                <Card.Title>List of Users</Card.Title>
                <hr/>
                <Tabs
                defaultActiveKey="lecturer"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 justify-content-center"
                >
                <Tab eventKey="lecturer" title="Lecturer">
                    {lect ?
                    <Row>
                        <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action(Allow/Reject User Access?)</th>
                        </tr>
                        </thead>
                        {lectList.slice(pagesVisited, pagesVisited + lecturerPerPage).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                <td>{val.lecturer_name}</td>
                                <td>{val.lecturer_email}</td>
                                <td>{val.lecturer_status}</td>
                                <td>{val.lecturer_status === 'Pending' ?
                                <Row>
                                    <Col className="col-2">
                                    <Button style={{color:'white', backgroundColor:'#104271'}}
                                    onClick={(event) => {
                                        acceptUser(event, val.lecturer_id);
                                    }}>Allow</Button>
                                    </Col>
                                    <Col className="col-4">
                                    <Button style={{color:'white', backgroundColor:'#104271'}} 
                                    onClick={(event) => {
                                        rejectUser(event, val.lecturer_id);
                                    }}
                                    >Reject</Button>
                                    </Col>
                                </Row>    
                                :
                                <span>None</span>
                                }</td>
                            </tr>
                            </tbody>
                        );
                        })}
                        </Table>
                        <Row className="mb-3">
                        </Row>
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        activeClassName={"paginationActive"}
                    />
                    </Row>
                    :
                    <span>No user in this list yet!</span>
                    }
                </Tab>
                <Tab eventKey="representative" title="Representative">
                {rep ?
                    <Row>
                        <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action(Allow/Reject User Access?)</th>
                        </tr>
                        </thead>
                        {repList.slice(pagesVisited1, pagesVisited1 + repPerPage).map((val1, key1) => {
                        return (
                            <tbody key={key1}>
                            <tr>
                                <td>{val1.representative_name}</td>
                                <td>{val1.representative_email}</td>
                                <td>{val1.representative_status}</td>
                                <td>{val1.representative_status === 'Pending' ?
                                <Row>
                                    <Col className="col-2">
                                    <Button className = "mx-1" style={{color:'white', backgroundColor:'#104271'}}
                                    onClick={(event) => {
                                        acceptUser1(event, val1.representative_id);
                                    }}>Allow</Button>
                                    </Col>
                                    <Col className="col-2">
                                    <Button style={{color:'white', backgroundColor:'#104271'}} 
                                    onClick={(event) => {
                                        rejectUser1(event, val1.representative_id);
                                    }}
                                    >Reject</Button>
                                    </Col>
                                </Row>    
                                :
                                <span>None</span>
                                }</td>
                            </tr>
                            </tbody>
                        );
                        })}
                        </Table>
                        <Row className="mb-3">
                        </Row>
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount1}
                        onPageChange={changePage1}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        activeClassName={"paginationActive"}
                    />
                    </Row>
                    :
                    <span>No user in this list yet!</span>
                    }
                </Tab>
            </Tabs>

            <Modal show={modalAccept} onHide={closeAccept}>
                <Modal.Header closeButton>
                <Modal.Title>Accept</Modal.Title>
                </Modal.Header>
                <Modal.Body>User request has been accepted!</Modal.Body>
                <Modal.Footer>
                <Button style={{color:'white', backgroundColor:'#104271'}} variant="secondary" onClick={closeAccept}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalReject} onHide={closeReject}>
                <Modal.Header closeButton>
                <Modal.Title>Reject</Modal.Title>
                </Modal.Header>
                <Modal.Body>User request has been rejected!</Modal.Body>
                <Modal.Footer>
                <Button style={{color:'white', backgroundColor:'#104271'}} variant="secondary" className = "mr-3" onClick={closeReject}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            </Card>
        </div>
    )
}

export default AdminDashboard;