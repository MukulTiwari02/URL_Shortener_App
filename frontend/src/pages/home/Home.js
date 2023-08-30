import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { logoutUser } from '../../services/authServices'
import { useDispatch } from 'react-redux';
import {SET_LOGIN, SET_NAME, SET_USER} from '../../redux/features/auth/authSlice'

const Home = () => {

  const dispatch  =  useDispatch();
  const navigate = useNavigate();
  
  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_NAME(""));
    dispatch(SET_USER({name : "", email : "", phone : ""}));
    // navigate('/login');
  }

  return (
    <div className='home'>
      <Navbar logout = {logout}/>
    </div>
  )
}

export default Home