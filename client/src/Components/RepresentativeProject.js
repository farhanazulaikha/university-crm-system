import React, {useState, useContext, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap';
import { UserContext} from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './Profile.css'


function RepresentativeProject() {

  const history = useHistory();

    const [project, isProject] = useState (false);
    const [projectList, setProjectList] = useState([]);

    const {userId, setUserId} = useContext(UserContext);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/findrepproject/${userId}`,{
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
    }, [userId]);

    const addProject = () => {

        const id = userId;
        history.push(`/representative/${id}/representativeaddproject`);
    }

    const showProject = (event, projectId) => {
        history.push(`/representative/${userId}/viewproject/${projectId}`)
    }

    const showMore = (event) => {
        history.push(`/lecturer/${userId}/yourproject`)
    }

  return (
    <div>
    {
        project
        ?
        <Table bordered hover size="sm">
                <thead>
                <tr className="p-1" style={{color:'white', backgroundColor:'#104271'}}>
                    <th>Title</th>
                    <th>Type</th>
                </tr>
                </thead>
                {projectList.map((val, key) => {
                return (
                    <tbody key={key}>
                    <tr style={{backgroundColor:'#e7ecf0'}}>
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

export default RepresentativeProject