import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/main/Layout';
import Navigation from './components/main/Navigation';
import UploadFiles from './components/main/UploadFiles';
import Signin from './components/main/Signin';
import Signup from './components/main/Signup';
import { userContext } from './UserContext';
import { useState } from 'react';
import Dashboard from './components/admin/Dashboard';
import EditUser from './components/admin/EditUser';
import UserList from './components/admin/UserList';
import Home from './components/admin/Home';
import Error from './Error';


function App() {
  const [userState, setUserState ] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null
  });

  return (
    <userContext.Provider value={{userState, setUserState}}>
    <BrowserRouter>
     <Navigation />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UploadFiles />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="user-list" element={<UserList />}></Route>
          <Route path="edit-user/:id" exact element={<EditUser />}></Route>
        </Route>   
        <Route path="*" element={<Error />}></Route>     
      </Routes>
    </BrowserRouter>  
    </userContext.Provider>
    );
}

export default App;
