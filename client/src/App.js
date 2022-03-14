// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Navigation from './Components/Navigation';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { Switch, Route } from 'react-router-dom';
import { SignInContext, UserTypeContext, UserContext } from './Helper/Context';
import AdminDashboard from './Components/AdminDashboard';
import LecturerDashboard from './Components/LecturerDashboard';
import RepresentativeDashboard from './Components/RepresentativeDashboard';
import CompanyList from './Components/CompanyList';
import LecturerList from './Components/LecturerList';
import LecturerAddProject from './Components/LecturerAddProject';
import ViewProject from './Components/ViewProject';

function App() {

  const [signedIn, isSignedIn] = useState (false);
  const [type, isUserType] = useState ("");
  const [userId, setUserId] = useState ("");

  return (
    <div className="App">
      <SignInContext.Provider value={ {signedIn, isSignedIn} }>
      <UserContext.Provider value={ {userId, setUserId}}>
        <UserTypeContext.Provider value={ {type, isUserType} }>
      <Navigation />

      <br/>

      <Switch>
        <Route exact path = "/"><SignIn /></Route>
        <Route path = "/signup"><SignUp /></Route>

        <Route path = "/admin/:id/dashboard"><AdminDashboard /></Route>
        <Route path = "/lecturer/:id/dashboard"><LecturerDashboard /></Route>
        <Route path = "/representative/:id/dashboard"><RepresentativeDashboard /></Route>

        <Route path = "/lecturer/:id/companylist"><CompanyList /></Route>
        <Route path = "/representative/:id/lecturerlist"><LecturerList /></Route>

        <Route path = "/lecturer/:id/lectureraddproject"><LecturerAddProject /></Route>
        {/* <Route path = "/representative/:id/representativeaddproject"><RepresentativeAddProject /></Route> */}

        <Route path = "/lecturer/:id/viewproject/:id"><ViewProject /></Route>
      </Switch>
      </UserTypeContext.Provider>
      </UserContext.Provider>
      </SignInContext.Provider>
    </div>
  );
}

export default App;
