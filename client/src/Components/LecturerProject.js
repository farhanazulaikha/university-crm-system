import React, {useState, useContext, useEffect} from 'react'
import { Card, Row, Col, Button, Table } from 'react-bootstrap';
import { UserContext} from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './LecturerProject.css'


function LecturerProject(){

    const history = useHistory();

    const [project, isProject] = useState (false);
    const [projectList, setProjectList] = useState([]);

    const {userId, setUserId} = useContext(UserContext);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/findlectproject/${userId}`,{
            id: userId,
        })
        .then((res) => {

            if(res.data.length > 0){
                isProject(true);
                setProjectList(res.data);
            }
            else{
                isProject(false);
            }
        });
    });

    const addProject = () => {

        const id = userId;
        history.push(`/lecturer/${id}/lectureraddproject`);
    }

    const showMore = (event) => {
        history.push(`/lecturer/${userId}/yourproject`)
    }

    const showProject = (event, projectId) => {

        event.preventDefault();
        
        history.push(`/lecturer/${userId}/viewproject/${projectId}`)
    }

    return(
        <div>
            {
                project
                ?
                <Table bordered hover size="sm">
                        <thead>
                        <tr style={{color: "white", backgroundColor: '#104271'}} className="p-1">
                            <th>Title</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        {projectList.map((val, key) => {
                        return (
                            <tbody key={key}>
                            <tr style={{backgroundColor: '#e7ecf0'}}>
                                <td><Button variant="link" className="text-start"
                                            onClick={(event) => {
                                                showProject(event, val.project_id);
                                }}>{val.project_title}</Button></td>
                                <td>{val.project_type_label}</td>
                            </tr>
                            </tbody>
                        );
                        })}
                    </Table>
                :
                <span>No project has been added yet!</span>
            }
        </div>
    )
}

export default LecturerProject;