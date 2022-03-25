import React, {useState, useContext, useEffect} from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { UserContext} from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

function RepresentativeProject() {

  const history = useHistory();

    const [project, isProject] = useState (false);
    const [projectList, setProjectList] = useState([]);

    const {userId, setUserId} = useContext(UserContext);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/repproject/${userId}`,{
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

  return (
    <div>
      <Card className = "p-1">
                <Card.Title className = "px-3 pt-3">
                    Your Project
                    <hr/>
                </Card.Title>
                <Card.Body>
                        {project && 
                        <Row>
                            {projectList.map((val, key) => {
                                return(
                                    <div key = {key}>
                                    <Col>
                                        <Button variant="link" className = "btn btn-link d-flex justify-content-start"
                                        onClick={(event) => {
                                            showProject(event, val.project_id);
                                        }}>{val.project_title}</Button>
                                    </Col>
                                    </div>
                                )
                            })}
                        </Row>
                        }

                        {!project &&
                            <p>No project has been added yet!</p>
                        }
                    <Row>
                        <Button type = "submit" className = "btn btn-link text-black bg-white border-0 d-flex justify-content-end" onClick={addProject}>
                            Add
                        </Button>
                    </Row>
                </Card.Body>
            </Card>
    </div>
  )
}

export default RepresentativeProject