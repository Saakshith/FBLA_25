import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./ForgotPassword.css"
import nchsLogo from "../images/nchs_logo.png"
import studentHeroImg from "../images/student_hero_img.png"
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Password reset email sent! Please check your inbox.")
      setIsError(false)
    } catch (error) {
      setMessage(error.message)
      setIsError(true)
    }
  }

  return (
    <div className='signin'>
      <div className="signin-left">
        <div className="signin-left-header">
          <Link to="/"><img src={nchsLogo} alt="" /></Link>
        </div>
        <div className="signin-left-body">
          <div className="signin-left-body-header-container">
            <p className="signin-header-top">Reset Password</p>
            <h2 className="signin-header">Forgot Your Password?</h2>
            <p className="signin-header-bottom">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
          <div className="sign-in-left-body-main">
            <form onSubmit={handleResetPassword}>
              <div className="sign-in-form-container">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {message && (
                <p className={`reset-message ${isError ? 'error' : 'success'}`}>
                  {message}
                </p>
              )}
              <button className="sign-in-button" type="submit">
                Reset Password
              </button>
            </form>
            <div className="back-to-signin">
              <Link to="/signin">Back to Sign In</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="signin-right">
        <Slider {...settings} className='carousel'>
          <div className='carousel-card'>
            <img src={studentHeroImg} alt="" />
            <h3>Password Recovery</h3>
            <p>Don't worry! It happens to the best of us. Follow the simple steps to reset your password and regain access to your account.</p>
          </div>
          <div className='carousel-card'>
            <img src={studentHeroImg} alt="" />
            <h3>Check Your Email</h3>
            <p>Once you submit your email, we'll send you a secure link to reset your password. Make sure to check your spam folder if you don't see it in your inbox.</p>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default ForgotPassword 