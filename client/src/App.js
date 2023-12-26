// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
import Navigation from './Components/Navigation';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { Switch, Route } from 'react-router-dom';
import { SignInContext, UserTypeContext, UserContext, EmailContext, PasswordContext, NameContext } from './Helper/Context';
import AdminDashboard from './Components/AdminDashboard';
import LecturerDashboard from './Components/LecturerDashboard';
import RepresentativeDashboard from './Components/RepresentativeDashboard';
import CompanyList from './Components/CompanyList';
import LecturerList from './Components/LecturerList';
import LecturerAddProject from './Components/LecturerAddProject';
import ViewProject from './Components/ViewProject';
import CompanyProjectList from './Components/CompanyProjectList';
import LecturerProjectList from './Components/LecturerProjectList';
import LecturerEditProject from './Components/LecturerEditProject';
import LecturerEditProfile from './Components/LecturerEditProfile';
import RepresentativeEditProject from './Components/RepresentativeEditProject';
import RepresentativeAddProject from './Components/RepresentativeAddProject';
import News from './Components/News';
import YourProjectL from './Components/YourProjectL';
import YourProjectR from './Components/YourProjectR';
import ViewCompany from './Components/ViewCompany';
import ViewLecturer from './Components/ViewLecturer';
import RepresentativeEditProfile from './Components/RepresentativeEditProfile';
import AddCompany from './Components/AddCompany';
import Chat from './Components/Chat';
import Home from './Components/AdminHome';
import AddActivity from './Components/AddActivity';
import AddAttachment from './Components/AddAttachment';

// const socket = io.connect("http://localhost:3001");

function App() {

  const [signedIn, isSignedIn] = useState (false);
  const [type, isUserType] = useState ("");
  const [userId, setUserId] = useState ("");
  const [email, isEmail] = useState ("");
  const [password, isPassword] = useState ("");
  const [name, isName] = useState ("");

  // const [user, isUser] = useState ("");
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const socket = io("http://localhost:3001");
  // }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", name)
  // },[socket, name]);

  return (
    <div className="App">
      <SignInContext.Provider value={ {signedIn, isSignedIn} }>
      <UserContext.Provider value={ {userId, setUserId}}>
        <UserTypeContext.Provider value={ {type, isUserType} }>
          <EmailContext.Provider value={ {email, isEmail}}>
            <PasswordContext.Provider value={ {password, isPassword}}>
            <NameContext.Provider value={ {name, isName}}>
              <Navigation/>

              <br/>

                <Switch>
                  <Route exact path = "/"><SignIn /></Route>
                  <Route path = "/signup"><SignUp /></Route>

                  
                  <Route path = "/admin/:id/dashboard"><Home /></Route>
                  <Route path = "/lecturer/:id/dashboard"><LecturerDashboard /></Route>
                  <Route path = "/representative/:id/dashboard"><RepresentativeDashboard /></Route>

                  <Route path = "/admin/:id/users"><AdminDashboard /></Route>
                  
                  <Route path = "/admin/:id/companylist"><CompanyList /></Route>
                  <Route path = "/lecturer/:id/companylist"><CompanyList /></Route>
                  <Route path = "/representative/:id/lecturerlist"><LecturerList /></Route>

                  <Route path ="/lecturer/:id/viewcompany/:id"><ViewCompany/></Route>
                  <Route path ="/representative/:id/viewlecturer/:id"><ViewLecturer/></Route>

                  <Route path = "/lecturer/:id/companyprojectlist"><CompanyProjectList /></Route>
                  <Route path = "/representative/:id/lecturerprojectlist"><LecturerProjectList /></Route>

                  <Route path = "/lecturer/:id/yourproject"><YourProjectL /></Route>
                  <Route path = "/representative/:id/yourproject"><YourProjectR /></Route>

                  <Route path = "/lecturer/:id/lectureraddproject"><LecturerAddProject /></Route>
                  <Route path = "/representative/:id/representativeaddproject"><RepresentativeAddProject /></Route>

                  <Route path = "/lecturer/:id/editproject/:id"><LecturerEditProject/></Route>
                  <Route path = "/representative/:id/editproject/:id"><RepresentativeEditProject /></Route>

                  <Route path = "/lecturer/:id/viewproject/:id"><ViewProject /></Route>
                  <Route path = "/representative/:id/viewproject/:id"><ViewProject /></Route>

                  <Route path = "/lecturer/:id/addactivity/:id"><AddActivity /></Route>
                  <Route path = "/representative/:id/addactivity/:id"><AddActivity /></Route>

                  <Route path = "/lecturer/:id/addattachment/:id"><AddAttachment /></Route>
                  <Route path = "/representative/:id/addattachment/:id"><AddAttachment /></Route>

                  <Route path = "/lecturer/:id/editprofile"><LecturerEditProfile/></Route>
                  <Route path = "/representative/:id/editprofile"><RepresentativeEditProfile/></Route>



                  <Route path = "/lecturer/:id/news"><News/></Route>
                  <Route path = "/representative/:id/news"><News/></Route>

                  <Route path = "/lecturer/:id/chat"><Chat/></Route>
                  <Route path = "/representative/:id/chat"><Chat/></Route>

                  <Route path = "/admin/:id/addcompany"><AddCompany/></Route>

                </Switch>
      </NameContext.Provider>
      </PasswordContext.Provider>
      </EmailContext.Provider>
      </UserTypeContext.Provider>
      </UserContext.Provider>
      </SignInContext.Provider>
    </div>
  );
}

export default App;
