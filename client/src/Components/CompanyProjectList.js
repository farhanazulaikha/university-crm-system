import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table} from 'react-bootstrap';
import Axios from 'axios';

function CompanyProjectList(){

    const {userId, setUserId} = useContext(UserContext);

    const [companyProject, isCompanyProject] = useState (false);
    const [companyProjectList, setCompanyProjectList] = useState([]);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lecturer/${userId}/companyprojectlist`)
        .then((res) => {
            if(res.data.length > 0){
                isCompanyProject(true);
                setCompanyProjectList(res.data);
            }
            else{
                isCompanyProject(false);
            }
        });
    }, [userId]);

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Project List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {companyProject &&
                
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            {/* <th>No.</th> */}
                            <th>Title</th>
                            <th>Information</th>
                            <th>Type</th>
                            <th>Field</th>
                            <th>Posted by</th>
                        </tr>
                        </thead>
                        {companyProjectList.map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr>
                                <td>{val.project_title}</td>
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
                            <p className = "text-center">No project in the list yet!</p>
                        }
                </Card.Body>
            </Card>
        </div>
    )
}

export default CompanyProjectList;