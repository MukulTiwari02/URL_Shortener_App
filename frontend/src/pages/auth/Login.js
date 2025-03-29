import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { loginUser } from './../../services/authServices';
import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'; 
import {SET_NAME, SET_LOGIN, SET_USER} from '../../redux/features/auth/authSlice'

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      email : "",
      password : ""
    }
  )

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    // console.log(name + " " + value)
    setFormData({...formData, [name] : value})
  }

  const login = async (e) => {

    const {email, password} = formData

    e.preventDefault();
    
    if(!email || !password) return toast.error("Please enter all required fields")

    try {
      const data = await loginUser(formData);

      if(!data) return;

      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name)) 
      await dispatch(SET_USER(data))
      // console.log(data);
      // setIsLoading(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='full-container --flex-center'>
      <div className="card">
        <div className="card-head --flex-center --dir-column">
          <h1>Login and start sharing</h1>
          <span><span>Dont't have an account ?</span><Link to = "/register">Sign Up</Link></span>
        </div>
        <div className="social-btns --flex-center --dir-column">
          <p>Login With :</p>
            <div className="social-btn-container">
            <button className="--btn">Google</button>
            <button className="--btn">Facebook</button>
            </div>
        </div>
        <div className="hrule">
          <hr />
          <h3>OR</h3>
          <hr />
        </div>
        <div className="form-container">
          <form onSubmit={login}>
            <input type="email" name="email" id='email' required placeholder='Enter Your Email' onChange={handleInputChange} value={formData.email}/>
            <input type="password" name="password" id='password' required placeholder='Enter Your Password' onChange={handleInputChange} value={formData.password}/>
            <div className="link">
              <Link to = "/">Home</Link>
              <Link to = "/forgot">Forgot Password ?</Link>
            </div>
            <button className='--btn --btn-success' type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login