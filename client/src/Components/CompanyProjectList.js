import React, {useEffect, useContext, useState} from 'react'
import { UserContext} from './../Helper/Context';
import {Card, Table, Button} from 'react-bootstrap';
import Axios from 'axios';
import SearchProject from './SearchProject';
import { useHistory } from 'react-router-dom';

function CompanyProjectList(){

    const history = useHistory();

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

    const showProject = (event, projectId) => {
        history.push(`/lecturer/${userId}/viewproject/${projectId}`)
    }

    return(
        <div>
            <Card className = "m-5 p-1">
                <Card.Title className = "px-3 pt-3">
                    Project List
                    <hr/>
                </Card.Title>
                <Card.Body className = "mx-3">
                {companyProject &&
                    <SearchProject
                    projectList={companyProjectList}
                    filteredList={setCompanyProjectList}
                    // setCompanyProjectList={companyProjectList}
                    />
                }
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
                            <td><Button variant="link" className = "btn btn-link d-flex justify-content-start"
                                        onClick={(event) => {
                                            showProject(event, val.project_id);
                            }}>{val.project_title}</Button></td>
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