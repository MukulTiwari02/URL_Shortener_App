import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = ({ isLogin }) => {
  var getStarted = "";
  if (isLogin) getStarted = "/shorten";
  else getStarted = "/register";

  return (
    <div className="hero-container">
      <div className="hero-head">
        <p>Welcome to a user friendly Url Shortener.</p>
        <p>
          Shorten Long links to make them sharable and also generate sharable QR
          code for the same link.
        </p>
        <p>
          Tracking of 'Clicks' and other stats made easy with an easy to access
          Dashboard.
        </p>
        {!isLogin && <p>Join the community by Signing Up.</p>}
        {isLogin && <p>Get Started, to start shortening links.</p>}
      </div>
      <Link to={getStarted}>
        <button className="--btn btn-getStarted">Get Started</button>
      </Link>
    </div>
  );
};

export default Hero;
