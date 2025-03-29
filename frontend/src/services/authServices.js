import axios from 'axios'
import {toast} from 'react-toastify'

const Backend_Url = process.env.REACT_APP_BACKEND_URL;

// Login
export const loginUser = async (formData) => {
    try {
        const resp = await axios.post(`${Backend_Url}/api/user/login`, formData, {withCredentials : true});   
        // console.log(resp)     
        return resp.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
}


// Register User
export const registerUser = async (formData) => {
    try {
        const resp = await axios.post(`${Backend_Url}/api/user/register`, formData, {withCredentials : true});

        if(resp.statusText === 'OK')
            toast.success("User registered successfully");

        return resp.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}



// Logout User
export const logoutUser = async () => {
    try {
        const resp = await axios.get(`${Backend_Url}/api/user/logout`, {withCredentials : true});
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}



// Forgot Password
export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${Backend_Url}/api/user/forgotpassword`, userData, {withCredentials : true}) 

        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(error);
    }
};



// Reset Password
export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.patch(`${Backend_Url}/api/users/resetPassword/${resetToken.resetToken}`, userData, {withCredentials : true}) 
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(error);
    }
};


// Get Login Status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${Backend_Url}/api/user/loginStatus`, {withCredentials : true})
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
};


// Get User Details
export const getUserDetails = async () => {
    try {
        const response = await axios.get(`${Backend_Url}/api/user/getUser`, {withCredentials : true})
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}