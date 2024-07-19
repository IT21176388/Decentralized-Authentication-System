import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import cloudPng from "./img/cloud.png";
import moon from "./img/fullmoon.png";

const FormContainer = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [loginBgColor, setLoginBgColor] = useState("#21264D");
  const [registerBgColor, setRegisterBgColor] = useState(
    "rgba(255, 255, 255, 0.2)"
  );
  const [SignInLeft, setSignInLeft] = useState("50%");
  const [SignUpLeft, setSignUpLeft] = useState("-50%");
  const [SignInOpacity, setSignInOpacity] = useState(1);
  const [SignUpOpacity, setSignUpOpacity] = useState(0);
  const [colOneBorderRadius, setColOneBorderRadius] = useState("0 30% 20% 0");

  const handleLoginClick = () => {
    setShowSignIn(true);
    setLoginBgColor("#21264D");
    setRegisterBgColor("rgba(255, 255, 255, 0.2)");
    setSignInLeft("50%");
    setSignUpLeft("-50%");
    setSignInOpacity(1);
    setSignUpOpacity(0);
    setColOneBorderRadius("0 30% 20% 0");
  };

  const handleRegisterClick = () => {
    setShowSignIn(false);
    setLoginBgColor("rgba(255, 255, 255, 0.2)");
    setRegisterBgColor("#21264D");
    setSignInLeft("150%");
    setSignUpLeft("50%");
    setSignInOpacity(0);
    setSignUpOpacity(1);
    setColOneBorderRadius("0 20% 30% 0");
  };

  return (
    <div className="form-container">
      <div className="col col-1" style={{ borderRadius: colOneBorderRadius }}>
        {
          /* Add image layer and featured words */
          <div class="image-layer">
            <img src={moon} alt="" class="form-image-main fi-2" />
            <img src={cloudPng} alt="" class="form-image-1 fi-1" />
            <img src={cloudPng} alt="" class="form-image-2 fi-1" />
            <img src={cloudPng} alt="" class="form-image-3 fi-3" />
          </div>
        }
      </div>
      <div className="col col-2">
        <div className="btn-box">
          <button
            className={`btn ${showSignIn ? "btn-1" : ""}`}
            onClick={handleLoginClick}
            style={{ backgroundColor: loginBgColor }}
          >
            Sign In
          </button>
          <button
            className={`btn ${!showSignIn ? "btn-1" : ""}`}
            onClick={handleRegisterClick}
            style={{ backgroundColor: registerBgColor }}
          >
            Sign Up
          </button>
        </div>
        {showSignIn ? (
          <SignIn left={SignInLeft} opacity={SignInOpacity} />
        ) : (
          <SignUp left={SignUpLeft} opacity={SignUpOpacity} />
        )}
      </div>
    </div>
  );
};

export default FormContainer;
