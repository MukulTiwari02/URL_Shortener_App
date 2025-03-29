import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../../services/authServices'
import { SET_LOGIN, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      name : "",
      email : "",
      password : "",
      password1  : "",
      phone : "",
    }
  )

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value}) 
  }

  const register = async(e) => {
    e.preventDefault();
    console.log('register');
    
    const {name, email, password1, password, phone} = formData;

    if(!name || !email || !password || !password1 || !phone)
      return toast.error("Enter all the required fields")

    if(password !== password1)  return toast.warn("Passwords do not match")

    try {
      const resp = await registerUser(formData);
      console.log(resp);

      if(!resp)
        return;

      toast.success("User registered successfully");
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(resp.name));
      dispatch(SET_USER({name : resp.name, email : resp.email, phone : resp.phone}));
      navigate('/');
    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <div className='full-container --flex-center'>
      <div className="card register">
        <div className="card-head --flex-center --dir-column">
          <h1>Create New Account</h1>
          <span><span>Already have an account ?</span><Link to = "/login">Login</Link></span>
        </div>
        <div className="social-btns --flex-center --dir-column">
          <p>Sign Up With :</p>
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
          <form onSubmit={register}>
            <input type="text" name="name" id='name' required placeholder='Enter Your Name' onChange={handleInputChange} value={formData.name}/>
            <input type="email" name="email" id='email' required placeholder='Enter Your Email' onChange={handleInputChange} value={formData.email}/>
            <input type="text" name="phone" id='phone' required placeholder='Enter Your Phone Number' onChange={handleInputChange} value={formData.phone}/>
            <input type="password" name="password" id='password' required placeholder='Enter Your Password' onChange={handleInputChange} value={formData.password}/>
            <input type="password" name="password1" id='password1' required placeholder='Confirm Your Password' onChange={handleInputChange} value={formData.password1}/>
            <button className='--btn --btn-success' type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register