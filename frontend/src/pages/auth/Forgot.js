import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { forgotPassword } from '../../services/authServices';
import { toast } from 'react-toastify';


const Forgot = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      email : ""
    }
  )

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    const {email} = formData;
    if(!email)  return toast.warn("Please enter the email");

    try {
      const response = await forgotPassword(formData);
      console.log(response)
      if(response) return toast.success("Reset Email Sent");
      else throw new Error("Enter a vald Email");
    } catch (error) {
        toast.error(error.message);
    }
  }


  return (
    <div className='full-container --flex-center'>
      <div className="card">
        <div className="card-head --flex-center --dir-column forgot">
          <h1>Forgot Password</h1>          
        </div>
        <div className="form-container">
          <form onSubmit={sendEmail}>
            <input type="email" name="email" id='email' value={formData.email} required placeholder='Enter Your Email' onChange={handleInputChange}/>
            <button className='--btn --btn-success' type="submit">Send Reset Email</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot