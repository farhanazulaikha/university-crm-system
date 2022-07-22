import React, {useState, useContext} from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext, UserTypeContext } from './../Helper/Context';

function AddAttachment() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const link = window.location.pathname;
    const split = link.split("/");
    const projectId = split[4];

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
 
      const saveFile = (event) => {

        event.preventDefault();
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
      };
 
      const uploadFile = async(e, projectId) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("projectId", projectId);
        try {
          const res = await Axios.post(
            "http://localhost:3001/uplatt",
            formData,
          ).then((res) => {
            if(res.data.successfulAdd){

                if(type === 'Lecturer'){
                    window.alert('You have successfully uploaded an attachment!');
                    history.push(`/lecturer/${userId}/viewproject/${projectId}`);
                }
                else if(type === 'Representative'){
                    window.alert('You have successfully uploaded an attachment!');
                    history.push(`/representative/${userId}/viewproject/${projectId}`);
             }
            }
          });


        } catch (ex) {
          console.log(ex);
        }


      };


    const backToProject = (e) => {
        e.preventDefault();

        if(type === 'Lecturer'){
            history.push(`/lecturer/${userId}/viewproject/${projectId}`);
        }
        else if(type === 'Representative'){
            history.push(`/representative/${userId}/viewproject/${projectId}`);
        }
    }

  return (
    <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
            <div className = "mt-3 p-5">
                <h3>
                    Add new attachment
                </h3>
                <hr/>
                <Form onSubmit={(event) => uploadFile (event, projectId)}>
                <div className="mt-1 mb-3">
                    <input type="file" name="file" onChange={(e) => saveFile(e)} />
                </div>
                <div className = "d-flex flex-end justify-content-end align-items-end mt-3">
                    <div className = "px-3">
                    <Button type="button" style={{color:'white', backgroundColor:'#104271'}} onClick={backToProject} className = "mr-3">Cancel</Button>
                    </div>
                    <div>
                    <Button type="submit" style={{color:'white', backgroundColor:'#104271'}}>Upload</Button>
                    </div>
                </div>
                </Form>
            </div>
            
      
            </Card>
        </div>
  )
}

export default AddAttachment