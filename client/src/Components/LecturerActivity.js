import React, {useState, useContext, useEffect} from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap';
import { UserContext} from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './Profile.css'


function LecturerActivity(){

    const history = useHistory();

    const [activity, isActivity] = useState (false);
    const [activityList, setActivityList] = useState([]);

    const {userId, setUserId} = useContext(UserContext);

    useEffect(()=>{

        Axios.get(`http://localhost:3001/lectactivity/${userId}`,{
            id: userId,
        })
        .then((res) => {

            if(res.data.length > 0){
                isActivity(true);
                setActivityList(res.data);
            }
            else{
                isActivity(false);
            }
        });
    }, [userId]);

    const showProject = (event, projectId) => {
        history.push(`/lecturer/${userId}/viewproject/${projectId}`)
    }

    return(
        <div>
            <Card className = "p-1 card1">
                <Card.Title className = "px-3 pt-3">
                    Your Activity
                    <hr/>
                </Card.Title>
                <Card.Body>
                        {activity && 
                        
                        <Row>
                            {activityList.map((val, key) => {
                                return (
                                    <div key={key}>
                                        <Col>
                                            <Button variant="link" className = "btn btn-link d-flex justify-content-start"
                                            onClick={(event) => {
                                                showProject(event, val.project_id);
                                            }}>{val.project_activity_title}</Button>
                                            
                                        </Col>
                                    </div>
                                );
                            })}
                        </Row>
                        }

                        {!activity &&
                            <p>No activity has been added yet!</p>
                        }
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default LecturerActivity;