import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table} from 'react-bootstrap';
import Axios from 'axios';

function CompanyList(){

    const {userId, setUserId} = useContext(UserContext);

    const [company, isCompany] = useState (false);
    const [companyList, setCompanyList] = useState([]);

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

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Company List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {company &&
                
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            {/* <th>No.</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Preferences</th>
                            <th>Category</th>
                            <th>Sector</th>
                        </tr>
                        </thead>
                        {companyList.map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
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