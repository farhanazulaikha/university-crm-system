import React, {useContext, useEffect, useState} from 'react'
import './Chat.css'
import { UserContext, EmailContext, PasswordContext} from './../Helper/Context';
import { Col } from 'react-bootstrap';
import Axios from 'axios';
import { ChatEngine } from 'react-chat-engine';

function Chat() {

  const[loading,setLoading]=useState(true);

  const { userId, setUserId } = useContext(UserContext);
  const {email, isEmail} = useContext(EmailContext);
  const {password, isPassword} = useContext(PasswordContext);

useEffect(()=>{

      Axios.get('https://api.chatengine.io/users/',{
        headers:{
            "project-id":"e0766689-a9ac-4530-a66c-7e1b18387cc3",
            "user-name":email,
            "user-secret":password,
        }
    })
    .then(()=>{
      setLoading(false);
   })
   .catch(()=>{
       let formdata=new FormData();
       formdata.append('username',email);
       formdata.append('secret',password);


           Axios.post('https://api.chatengine.io/users/',
           formdata,
           {headers:{"private-key":"156900bc-aacf-4cfa-ae06-aae12ee55632"}}
           ).then(()=>setLoading(false))
           .catch(error => console.log(error))
       
   })
  // })
},[loading])


  return (
    <ChatEngine
                height='100vh'
                projectID='e0766689-a9ac-4530-a66c-7e1b18387cc3'
                userName={email}
                userSecret={password}
                offset={8}
    />
        
  )
}

export default Chat