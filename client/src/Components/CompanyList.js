import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table, Row} from 'react-bootstrap';
import Axios from 'axios';
import ReactPaginate from "react-paginate";
import './CompanyList.css'

function CompanyList(){

    const {userId, setUserId} = useContext(UserContext);

    const [company, isCompany] = useState (false);
    const [companyList, setCompanyList] = useState([]);
    // const [companies, setCompanies] = useState(companyList.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);

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
    }, [userId]);

    const companyPerPage = 10;
    const pagesVisited = pageNumber * companyPerPage;

    // const displayCompany = companyList
    //     .slice(pagesVisited, pagesVisited + companyPerPage)
    //     .map((val) => {
    //     return (
    //         <div className="company">
    //         <td>{val.company_name}</td>
    //         <td>{val.company_email}</td>
    //         <td>{val.company_contactNo}</td>
    //         <td>{val.company_preferences}</td>
    //         <td>{val.category_label}</td>
    //         <td>{val.sector_label}</td>
    //         </div>
    //     );
    // });

    const pageCount = Math.ceil(companyList.length / companyPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Company List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {company &&
                <Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Preferences</th>
                            <th>Category</th>
                            <th>Sector</th>
                        </tr>
                        </thead>
                        {companyList.slice(pagesVisited, pagesVisited + companyPerPage).map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                {/* {displayCompany} */}
                                <td>{val.company_name}</td>
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

                        {!company &&
                            <p className = "text-center">No company in the list yet!</p>
                        }
                </Card.Body>
            </Card>
        </div>
    )
}

export default CompanyList;