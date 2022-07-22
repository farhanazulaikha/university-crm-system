import React, {useEffect, useContext, useState} from 'react'
import {Card, Table, Row, Button, Col, Form} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";
import './CompanyList.css'
import { useHistory, Link } from 'react-router-dom';
import { UserContext, UserTypeContext } from '../Helper/Context';

function CompanyList(){

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [company, isCompany] = useState (false);
    const [companyList, setCompanyList] = useState([]);

    

    const [pageNumber, setPageNumber] = useState(0);

    const [companyName, setCompanyName] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lecturer/${userId}/companylist`)
        .then((res) => {
            if(res.data.length > 0){
                isCompany(true);
                setCompanyList(res.data);
            }
            else{
                isCompany(false);
            }
        });
    }, [companyList]);

    const companyPerPage = 10;
    const pagesVisited = pageNumber * companyPerPage;

    const pageCount = Math.ceil(companyList.length / companyPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const showCompany = (event, companyId) => {
        history.push(`/lecturer/${userId}/viewcompany/${companyId}`)
    }

    const addNew = (e) => {
        e.preventDefault();

        history.push(`/admin/${userId}/addcompany`);
    }

    const updateCompany =(e, company_id) => {
        e.preventDefault();

        history.push(`/admin/${userId}/editcompany/${company_id}`)
    }

    let handleFilter = (event) => {

        var searchWord = event.target.value.toLowerCase();
        setCompanyName(searchWord);
        
      };

      function List(props) {

        const newFilter = (companyList).filter((el) => {

            if(props.input === ''){
                return el;
            }
            else{
                return el.company_name.toLowerCase().includes(props.input);
            }
        })

        return(
        <Row>
            <Table striped bordered hover>
                <thead>
                <tr className="tablehead">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Preferences</th>
                    <th>Category</th>
                    <th>Sector</th>
                    
                </tr>
                </thead>
                {newFilter.slice(pagesVisited, pagesVisited + companyPerPage).map((val, key) => {
                return (
                    <tbody key={key}>
                    <tr className="tablecontent">
                        <td>
                            {val.company_name}
                        </td>
                        <td>{val.company_email}</td>
                        <td>{val.company_contactNo}</td>
                        <td>{val.company_preferences}</td>
                        <td>{val.category_label}</td>
                        <td>{val.sector_label}</td>
                        
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
                    <Row>
                        <Col>
                            Company List
                        </Col>
                        <Col className = "d-flex justify-content-end">
                            {type === 'Admin' &&
                                <Button variant ="link" onClick={addNew}>Add Company</Button>
                            }
                        </Col>
                    </Row>
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {company &&
                <Row>
                    <Form>
                        <Form.Label>Search for company:</Form.Label>
                        <Form.Group className="mb-3" controlId="companyName">
                            <Form.Control type="text" placeholder="Enter company name here..."  
                                // value={projectName}
                                onChange={handleFilter}
                            />
                        </Form.Group>
                    </Form>
                </Row>
                }
                {company &&
                <div>
                    <List input={companyName} />
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

                        {!company &&
                            <p className = "text-center">No company in the list yet!</p>
                        }
                </Card.Body>
            </Card>
        </div>
    )
}

export default CompanyList;