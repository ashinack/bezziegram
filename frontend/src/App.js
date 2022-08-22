import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import EmailVerify from './Components/emailVerify/EmailVerify';
import Home from './Pages/Home_page/Home';
import Signup from './Pages/SignupForm/Signup';
import Login from './Pages/UserLogin/Login'

function App() {
  const user=useSelector((state)=>state.authReducer.authData)
  return (
   
    <>
    <Routes>
     <Route path='/' element={user?<Navigate to="home"/>:<Navigate to='auth'/>}></Route>
     <Route path='/home' element={user?<Home/>:<Navigate to='auth'/>}></Route>
        <Route path='/auth' element={user ? <Navigate to='../verify'/>:<Signup/>}></Route>
     <Route path='/verify' element={<EmailVerify/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </>
  );
}

export default App;
