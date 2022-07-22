import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table, Button, Row, Form} from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";

function LecturerProjectList(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [lecturerProject, isLecturerProject] = useState (false);
    const [lecturerProjectList, setLecturerProjectList] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    // const [projectList, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState("");

    

    useEffect(()=>{

        Axios.get(`http://localhost:3001/representative/${userId}/lecturerprojectlist`)
        .then((res) => {
            if(res.data.length > 0){
                isLecturerProject(true);
                setLecturerProjectList(res.data);
            }
            else{
                isLecturerProject(false);
            }
        });
    }, []);

    const showProject = (event, projectId) => {
        history.push(`/representative/${userId}/viewproject/${projectId}`)
    }

    const projectPerPage = 10;
    const pagesVisited = pageNumber * projectPerPage;

    const pageCount = Math.ceil(lecturerProjectList.length / projectPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    let handleFilter = (event) => {

        var searchWord = event.target.value.toLowerCase();
        setProjectName(searchWord);
        
      };

      function List(props) {

        const newFilter = (lecturerProjectList).filter((el) => {

            if(props.input === ''){
                return el;
            }
            else{
                return el.project_title.toLowerCase().includes(props.input);
            }
        })

        return(
            <Table striped bordered hover>
                        <thead>
                        <tr style={{color:'white', backgroundColor:'#104271'}}>
                            <th>Title</th>
                            <th>Information</th>
                            <th>Type</th>
                            <th>Field</th>
                            <th>Posted by</th>
                        </tr>
                        </thead>
                
                        {newFilter.slice(pagesVisited, pagesVisited + projectPerPage).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr style={{backgroundColor:'#e7ecf0'}}>
                            <td><Button variant="link" className = "text-start"
                                        onClick={(event) => {
                                            showProject(event, val.project_id);
                            }}>{val.project_title}</Button></td>
                                <td>{val.project_information}</td>
                                <td>{val.project_type_label}</td>
                                <td>{val.project_field_label}</td>
                                <td>{val.lecturer_name}</td>
                            </tr>
                            </tbody>
                        );
                        })}
                    </Table>
            )
      }

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Project List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {lecturerProject &&
                    <Row>
                        <Form>
                        <Form.Label>Search for project:</Form.Label>
                            <Form.Group className="mb-3" controlId="projectTitle">
                                <Form.Control type="text" placeholder="Enter project title here..."  
                                    onChange={handleFilter}
                                />
                            </Form.Group>
                        </Form>
                    </Row>
                }
                {lecturerProject &&
                    <div>
                    <List input={projectName} />
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

                        {!lecturerProject &&
                            <p className = "text-center">No project in the list yet!</p>
                        }
                </Card.Body>
            </Card>
        </div>
    )
}

export default LecturerProjectList;