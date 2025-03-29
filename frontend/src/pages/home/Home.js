import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import { logoutUser } from "../../services/authServices";
import { useDispatch } from "react-redux";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from "../../redux/features/auth/authSlice";
import Hero from "../../components/hero/Hero";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_NAME(""));
    dispatch(SET_USER({ name: "", email: "", phone: "" }));
  };

  const isLogin = useSelector(selectIsLoggedIn);

  return (
    <div className="home">
      <Navbar isLogin={isLogin} logout={logout} />
      <Hero isLogin={isLogin} />
    </div>
  );
};

export default Home;
