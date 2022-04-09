import React, {useEffect, useContext, useState} from 'react';
import { UserContext} from './../Helper/Context';
import {Card, Table, Row, Tabs, Tab, Nav, Col} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";

function AdminDashboard(){

    const {userId, setUserId} = useContext(UserContext);

    const [lecturer, isLecturer] = useState (false);
    const [lecturerList, setLecturerList] = useState([]);

    const [lecturerInactive, isLecturerInactive] = useState (false);
    const [lecturerListInactive, setLecturerListInactive] = useState([]);

    const [representative, isRepresentative] = useState (false);
    const [representativeList, setRepresentativeList] = useState([]);

    const [representativeInactive, isRepresentativeInactive] = useState (false);
    const [representativeListInactive, setRepresentativeListInactive] = useState([]);

    const [active, setActive] = useState (false);

    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumber2, setPageNumber2] = useState(0);

    const [pageNumber1, setPageNumber1] = useState(0);
    const [pageNumber3, setPageNumber3] = useState(0);


    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectureractive`)
        .then((res) => {

            if(res.data.length > 0){
                isLecturer(true);
                setLecturerList(res.data);
            }
            else{
                isLecturer(false);
            }
        });
    }, [userId]);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lecturerinactive`)
        .then((res) => {

            if(res.data.length > 0){
                isLecturerInactive(true);
                setLecturerListInactive(res.data);
            }
            else{
                isLecturerInactive(false);
            }
        });
    }, [userId]);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/representativeactive`)
        .then((res) => {

            if(res.data.length > 0){
                isRepresentative(true);
                setRepresentativeList(res.data);
            }
            else{
                isRepresentative(false);
            }
        });
    }, [userId]);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/representativeinactive`)
        .then((res) => {

            if(res.data.length > 0){
                isRepresentativeInactive(true);
                setRepresentativeListInactive(res.data);
            }
            else{
                isRepresentativeInactive(false);
            }
        });
    }, [userId]);

    const lecturerPerPage = 10;
    const pagesVisited = pageNumber * lecturerPerPage;

    const pageCount = Math.ceil(lecturerList.length / lecturerPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const lecturerPerPageIn = 10;
    const pagesVisited2 = pageNumber2 * lecturerPerPageIn;

    const pageCount2 = Math.ceil(lecturerListInactive.length / lecturerPerPageIn);

    const changePage2 = ({ selected }) => {
        setPageNumber2(selected);
    };


    const repPerPage = 10;
    const pagesVisited1 = pageNumber1 * repPerPage;

    const pageCount1 = Math.ceil(representativeList.length / repPerPage);

    const changePage1 = ({ selected }) => {
        setPageNumber1(selected);
    };

    const repPerPageIn = 10;
    const pagesVisited3 = pageNumber3 * repPerPageIn;

    const pageCount3 = Math.ceil(representativeListInactive.length / repPerPageIn);

    const changePage3 = ({ selected }) => {
        setPageNumber3(selected);
    };

    return(
        <div className = "m-5">
            <Card className="m-3 p-5">
                <Card.Title>List of Users</Card.Title>
                <hr/>
            <Tabs defaultActiveKey="lecturer" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
                <Tab eventKey="lecturer" title="Lecturer">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second">Inactive</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                            {lecturer &&
                                <Row>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        {lecturerList.slice(pagesVisited, pagesVisited + lecturerPerPage).map((val, key) => {
                                        return (
                                            <tbody key={key}>
                                            <tr>
                                                <td>{val.lecturer_name}</td>
                                                <td>{val.lecturer_email}</td>
                                                <td>{val.lecturer_status}</td>
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
                            }

                            {!lecturer &&
                                <p className = "text-center">No lecturer in the list yet!</p>
                            }
                           </Tab.Pane>
                            <Tab.Pane eventKey="second">
                            {lecturerInactive &&
                                <Row>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        {lecturerListInactive.slice(pagesVisited2, pagesVisited2 + lecturerPerPageIn).map((val, key) => {
                                        return (
                                            <tbody key={key}>
                                            <tr>
                                                <td>{val.lecturer_name}</td>
                                                <td>{val.lecturer_email}</td>
                                                <td>{val.lecturer_status}</td>
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
                                    pageCount={pageCount2}
                                    onPageChange={changePage2}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    activeClassName={"paginationActive"}
                                />
                                </Row>
                            }

                            {!lecturerInactive &&
                                <p className = "text-center">No lecturer in the list yet!</p>
                            }
                           </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                </Tab>
                <Tab eventKey="representative" title="Representative">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second">Inactive</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                            {representative &&
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        {representativeList.slice(pagesVisited1, pagesVisited1 + repPerPage).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                {/* {displayCompany} */}
                                <td>{val.representative_name}</td>
                                <td>{val.representative_email}</td>
                                <td>{val.representative_status}</td>
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
                }

                        {!representative &&
                            <p className = "text-center">No representative in the list yet!</p>
                        }
                           </Tab.Pane>
                            <Tab.Pane eventKey="second">
                            {representativeInactive &&
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        {representativeListInactive.slice(pagesVisited3, pagesVisited3 + repPerPageIn).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                {/* {displayCompany} */}
                                <td>{val.representative_name}</td>
                                <td>{val.representative_email}</td>
                                <td>{val.representative_status}</td>
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
                    pageCount={pageCount3}
                    onPageChange={changePage3}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    activeClassName={"paginationActive"}
                  />
                </Row>
                }

                        {!representativeInactive &&
                            <p className = "text-center">No representative in the list yet!</p>
                        }
                           </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                </Tab>
            </Tabs>
            </Card>
        </div>
    )
}

export default AdminDashboard;