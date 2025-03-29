import axios from 'axios'
import {toast} from 'react-toastify'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL




export const addNewUrl = async (longURL) => {
    longURL = longURL.replace('https://', "");
    longURL = longURL.replace('http://', "");
    try {
        // console.log(longURL)
        const response = await axios.post(`${BACKEND_URL}/api/url/addNewUrl`, {longURL}, {withCredentials : true})
        return response.data.ShortURL;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}