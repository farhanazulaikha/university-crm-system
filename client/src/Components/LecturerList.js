import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table, Row} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";
import './LecturerList.css'

function LecturerList(){

    const {userId, setUserId} = useContext(UserContext);

    const [lecturer, isLecturer] = useState (false);
    const [lecturerList, setLecturerList] = useState([]);
    // const [companies, setCompanies] = useState(companyList.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/representative/${userId}/lecturerlist`)
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

    const lecturerPerPage = 10;
    const pagesVisited = pageNumber * lecturerPerPage;

    const pageCount = Math.ceil(lecturerList.length / lecturerPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Lecturer List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {lecturer &&
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Preferences</th>
                        </tr>
                        </thead>
                        {lecturerList.slice(pagesVisited, pagesVisited + lecturerPerPage).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                {/* {displayCompany} */}
                                <td>{val.lecturer_name}</td>
                                <td>{val.lecturer_email}</td>
                                <td>{val.lecturer_contactNo}</td>
                                <td>{val.lecturer_preferences}</td>
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
                </Card.Body>
            </Card>
        </div>
    )
}

export default LecturerList;