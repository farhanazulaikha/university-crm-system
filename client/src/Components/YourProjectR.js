import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from '../Helper/Context';
import {Card, Table, Button, Row, Form} from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactPaginate from "react-paginate";

function YourProjectR() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);

    const [repProject, isRepProject] = useState (false);
    const [repProjectList, setRepProjectList] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const [projectName, setProjectName] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/repproject/${userId}`)
        .then((res) => {
            if(res.data.length > 0){
                isRepProject(true);
                setRepProjectList(res.data);
            }
            else{
                isRepProject(false);
            }
        });
    }, []);

    const showProject = (event, projectId) => {
        history.push(`/representative/${userId}/viewproject/${projectId}`)
    }

    const projectPerPage = 10;
    const pagesVisited = pageNumber * projectPerPage;

    const pageCount = Math.ceil(repProjectList.length / projectPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    let handleFilter = (event) => {

        var searchWord = event.target.value.toLowerCase();
        setProjectName(searchWord);
        
      };

      function List(props) {

        const newFilter = (repProjectList).filter((el) => {

            if(props.input === ''){
                return el;
            }
            else{
                return el.project_title.toLowerCase().includes(props.input);
            }
        })

        return(
        <Row>
            <Table striped bordered hover>
                        <thead>
                        <tr style={{color:'white', backgroundColor:'#104271'}}>
                            <th>Title</th>
                            <th>Information</th>
                            <th>Type</th>
                            <th>Field</th>
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
                            </tr>
                            </tbody>
                        );
                        })}
                    </Table>
        </Row>
        )
    }

  return (
    <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Your Project List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                
                {repProject &&
                    <Row>
                    <Form>
                        <Form.Label>Search for project:</Form.Label>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Control type="text" placeholder="Enter project name here..."  
                                // value={projectName}
                                onChange={handleFilter}
                            />
                        </Form.Group>
                    </Form>
                </Row>
                }
                {repProject &&
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

                        {!repProject &&
                            <p className = "text-center">No project in the list yet!</p>
                        }
                </Card.Body>
            </Card>
        </div>
  )
}

export default YourProjectR