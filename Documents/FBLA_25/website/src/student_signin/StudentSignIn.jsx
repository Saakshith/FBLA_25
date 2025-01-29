import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./StudentSignIn.css"
import nchsLogo from "../images/nchs_logo.png"
import googleLogo from "../images/google_logo.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import studentHeroImg from "../images/student_hero_img.png"

const StudentSignIn = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

  return (
    <div className='signin'>
      <div className="signin-left">
        <div className="signin-left-header">
            <Link><img src={nchsLogo} alt="" /></Link>
        </div>
        <div className="signin-left-body">
            <div className="signin-left-body-header-container">
                <p className="signin-header-top">Welcome Back</p>
                <h2 className="signin-header">Sign In to Jobs at NCHS</h2>
                <p className="signin-header-bottom">Don't have an account yet? <Link className='signin-header-bottom-link'>Sign Up</Link></p>
            </div>
            <div className="sign-in-left-body-main">
                <form action="">
                    <div className="sign-in-form-container">
                        <label htmlFor="">Email</label>
                        <input type="text" />
                    </div>
                    <div className="sign-in-form-container">
                        <label htmlFor="">Password</label>
                        <input type="password" />
                        <Link className='forgot-password'>Forgot Password</Link>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
                <div className="sign-in-form-break">
                    <p>-----------or-------------</p>
                </div>
                <div className="sign-in-alternate-options-container">
                    <button><img src={googleLogo} alt="" /><p>Continue With Google</p></button>
                </div>
            </div>
        </div>
      </div>
      <div className="signin-right">
        <Slider {...settings} className='carousel'>
            <div className='carousel-card'>
                <img src={studentHeroImg} alt="" />
                <h3>Introducing New Features</h3>
                <p>We’ve added exciting new tools to enhance your job search experience. From personalized job recommendations to an improved application tracking system, 
                these updates are designed to help students connect with the best opportunities more efficiently. </p>
            </div>
            <div className='carousel-card'>
                <img src={studentHeroImg} alt="" />
                <h3>See Open Job Posting</h3>
                <p>Explore a wide range of job opportunities, including part-time positions, internships, and seasonal work. 
                Browse listings from local businesses and organizations looking to hire students like you. </p>
            </div>
            <div className='carousel-card'>
                <img src={studentHeroImg} alt="" />
                <h3>Customize Profile and Connect with Companies</h3>
                <p>Create a professional profile to showcase your skills, experience, and interests. 
                Connect directly with employers, apply to jobs, and start building your network for future career opportunities. </p>
            </div>
        </Slider>
      </div>
    </div>
  )
}

export default StudentSignIn
