import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Shorten from './pages/shorten/Shorten';
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUserDetails } from "./services/authServices";
import { SET_LOGIN, SET_NAME, SET_USER, selectIsLoggedIn } from "./redux/features/auth/authSlice"; 
// import dotenv from 'dotenv'

// dotenv.config();
// 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getLoginStatusGlobal()
    {
      const resp = await getLoginStatus();
      await dispatch(SET_LOGIN(resp));

      if(!resp) await dispatch(SET_NAME(""));

      if(resp)
      {
        const currentUser = await getUserDetails();
        const {email,name,phone} = currentUser;
        await dispatch(SET_USER({name : name, phone : phone, email : email}));
        await dispatch(SET_NAME(name));
      }
    }
    getLoginStatusGlobal();
  }, [dispatch]);


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element = {<Home />} /> 
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register/>} />
        <Route path="/forgot" element = {<Forgot />} />
        <Route path="/resetpassword/:resetToken" element = {<Reset />} /> 
        <Route path="/dashboard" element = {<Dashboard />} />
        <Route path="/shorten" element = {<Shorten />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
