import React, { useEffect, useState } from 'react'
import Navbar from './../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectName } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewUrl } from '../../services/urlServices';


const Shorten = () => {

  const Backend_URL = process.env.REACT_APP_BACKEND_URL;

  const [smallUrl , setSmallUrl] = useState("");
  const [longURL , setLongURL] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectName);



  // console.log(name + ", " + isLoggedIn)

  useEffect(() => {
    if(!name && !isLoggedIn) {
      {
        toast.info("Session Expired, Login to continue...")
        return navigate('/login');
      }
    }
  },[navigate, dispatch])

  const handleInputChange = (e) => {
    if(smallUrl) setSmallUrl("")
    setLongURL(e.target.value);
  }

  const generateSmallUrl = async (e) => {
    e.preventDefault();
    if(!longURL)  return toast.warn("Enter a long URL")
    try {
      const resp = await addNewUrl(longURL);
      setSmallUrl(Backend_URL+"/"+resp);
    } catch (error) {
      // toast.error(error.message)
    }
  }

  return (
    <div className='container'>
      <Navbar />
      <div className="welcome --flex-center --dir-column">
        <h2>Welcome, {name}</h2>
        <h2>Start Shortening</h2>
      </div>

      <form onSubmit={generateSmallUrl}>
        <img src="" alt="chainImg" />
        <input type="text" value={longURL} onChange={handleInputChange} placeholder='Here Paste the long URL'/>
        <button className='--btn --btn-success' type="submit">SHORTEN</button>
      </form>

      <div className="shortened-url">
        <div className="url-text"><h4>SHORTENED URL HERE : <a target='_blank' href={smallUrl}>{`${smallUrl}`}</a></h4></div>
        <div className="url-controls --flex-start">
          <button className='--btn'>Copy</button>
          <button className='--btn'>Share</button>
        </div>
      </div>

      <div className="qrcode-container">
        <img src="" alt="qrcodehere" />
        <div className="qr-controls  --flex-start">
          <button className='--btn'>Copy</button>
          <button className='--btn'>Share</button>
        </div>
      </div>
    </div>
  )
}

export default Shorten