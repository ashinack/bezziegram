import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import EmailVerify from './Components/emailVerify/EmailVerify';
import FollowUserProfile from './Components/FollowUserProfile/FollowUserProfile';
import Profile from './Components/Profile/Profile';
import Adminhome from './Pages/AdminHome/Adminhome';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import Chat from './Pages/Chat/Chat';
import Home from './Pages/Home_page/Home';
import Signup from './Pages/SignupForm/Signup';
import Login from './Pages/UserLogin/Login'

function App() {
  const user=useSelector((state)=>state.authReducer.authData)
  const admin = useSelector((state) => state.adminReducer.adminData)
  return (
   
    <>
    <Routes>
     <Route path='/' element={user?<Navigate to="home"/>:<Navigate to='auth'/>}></Route>
     <Route path='/home' element={user?<Home/>:<Navigate to='../auth'/>}></Route>
        <Route path='/adminhome' element={admin ? <Adminhome /> : <Navigate to='/admin' />}></Route>
      <Route path='/auth' element={user ? <Navigate to='../verify'/>:<Signup/>}></Route>
     <Route path='/verify' element={<EmailVerify/>}></Route>
     <Route path='/login' element={user?<Navigate to='../home'/>:<Login/>}></Route>
     <Route path='/profile/:id' element={user?<Profile/>:<Navigate to='../auth'/>}></Route>
        <Route path='/followuserprofile/:id' element={user ? <FollowUserProfile /> : <Navigate to='../auth' />}></Route>
        <Route path='/admin' element={admin ? <Navigate to='/adminhome'/>:<AdminLogin/>}></Route>
        <Route path='/chat' element={user ? <Chat /> : <Navigate to='../auth'></Navigate>}></Route>
    </Routes>
    </>
  );
}

export default App;
