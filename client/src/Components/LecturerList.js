import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table, Row, Form} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";
import './LecturerList.css'
import { useHistory, Link } from 'react-router-dom';

function LecturerList(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [lecturer, isLecturer] = useState (false);
    const [lecturerList, setLecturerList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const [lecturerName, setLecturerName] = useState("");

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
    }, []);


    const showLecturer = (event, lecturerId) => {
        history.push(`/representative/${userId}/viewlecturer/${lecturerId}`)
    }

    const lecturerPerPage = 10;
    const pagesVisited = pageNumber * lecturerPerPage;

    const pageCount = Math.ceil(lecturerList.length / lecturerPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    let handleFilter = (event) => {

        var searchWord = event.target.value.toLowerCase();
        setLecturerName(searchWord);
        
      };

      function List(props) {

        const newFilter = (lecturerList).filter((el) => {

            if(props.input === ''){
                return el;
            }
            else{
                return el.lecturer_name.toLowerCase().includes(props.input);
            }
        })

        return(
        <Row>
            <Table striped bordered hover>
                <thead>
                <tr style={{color:'white', backgroundColor:'#104271'}}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Preferences</th>
                </tr>
                </thead>
                {newFilter.slice(pagesVisited, pagesVisited + lecturerPerPage).map((val, key) => {
                return (
                    <tbody key={key}>
                    <tr style={{backgroundColor:'#e7ecf0'}}>
                        <td>
                                    {val.lecturer_name}
                                </td>
                                <td>{val.lecturer_email}</td>
                                <td>{val.lecturer_contactNo}</td>
                                <td>{val.lecturer_preferences}</td>
                    </tr>
                    </tbody>
                );
                })}
            </Table>
            
        </Row>
        )
    }

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
                        <Form>
                            <Form.Label>Search for company:</Form.Label>
                            <Form.Group className="mb-3" controlId="lecturerName">
                                <Form.Control type="text" placeholder="Enter lecturer name here..."  
                                    // value={projectName}
                                    onChange={handleFilter}
                                />
                            </Form.Group>
                        </Form>
                    </Row>
                    }
                    {lecturer &&
                    <div>
                        <List input={lecturerName} />
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
                    </div>
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