import React, { useEffect, useState } from 'react'
import Navbar from './../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN, SET_NAME, SET_USER, selectIsLoggedIn, selectName } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewUrl } from '../../services/urlServices';
import './Shorten.css';
import { logoutUser } from '../../services/authServices';
import { copyUrl, copyQR, downloadQR, shareUrl } from './utility';


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
  
  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_NAME(""));
    dispatch(SET_USER({name : "", email : "", phone : ""}));
    // navigate('/login');
  }


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
    <div className='shorten-container'>
      <Navbar isLogin={true} logout={logout}/>
      <div className="shorten-hero">
        <div className="welcome --flex-center --dir-column">
          <h2>Welcome, {name}</h2>
          <h2>Start Shortening</h2>
        </div>

        <form className='shorten-form' onSubmit={generateSmallUrl}>
          <img src=""/>
          <input type="text" value={longURL} onChange={handleInputChange} placeholder='Paste the long URL here'/>
          <button className='--btn --btn-success' type="submit">SHORTEN</button>
        </form>

        {smallUrl && <div className="shortened-url">
          <div className="url-text"><h4>Shortened Url <br/><a className='short-url' target='_blank' href={smallUrl}>{`${smallUrl}`}</a></h4></div>
          <div className="url-controls --flex-start">
            <button className='--btn copy-button' onClick={copyUrl}>Copy</button>
            <button className='--btn share-button' onClick={shareUrl}>Share</button>
          </div>
        </div>}

        {smallUrl && <div className="shortened-url">
        <div className="url-text"><h4>QR Code</h4></div>
          <img className="qr-image" download src={`https://api.qrserver.com/v1/create-qr-code/?data=${smallUrl}&size=120x120`}
           alt="qrcodehere" />
          <div className="qr-controls  --flex-start">
            <button className='--btn copy-button' onClick={copyQR}>Copy</button>
            <a target = "_blank" download href={`https://api.qrserver.com/v1/create-qr-code/?data=${smallUrl}!&size=120x120`}><button className='--btn download-button' onClick={downloadQR}>Download</button></a>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Shorten