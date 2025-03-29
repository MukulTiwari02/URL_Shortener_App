import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'

const Reset = () => {

  const [formData, setFormData] = useState(
    {
      password : "",
      password2 : ""
    }
  )

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})
  }

  const resetPassword = (e) => {
    e.preventDefault();
    console.log(formData)
  }



  return (
    <div className='full-container --flex-center'>
      <div className="card register">
        <div className="card-head --flex-center --dir-column forgot">
          <h1>Reset Password</h1>          
        </div>
        <div className="form-container">
          <form onSubmit={resetPassword}>
            <input type="password" name="password" id="password" onChange={handleInputChange} placeholder='Enter New Password' value={formData.password}/>
            <input type="password" name="password2" id="password2" onChange={handleInputChange} placeholder='Confirm New Password' value={formData.password1}/>
            <button className='--btn --btn-success' type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset