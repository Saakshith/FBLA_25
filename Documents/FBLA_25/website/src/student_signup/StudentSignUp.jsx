import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./StudentSignUp.css"
import nchsLogo from "../images/nchs_logo.png"
import googleLogo from "../images/google_logo.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import studentHeroImg from "../images/student_hero_img.png"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db } from "../firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"

    const StudentSignUp = () => {
      const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("") 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email:  user.email,
                })
            }
            window.alert("User registered successfully")
            window.location.href = "/findjobs"
        } catch (error) {
            window.alert(error.message)
        }
    }

    const googleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (res) => {
            const user = res.user;
            if (user) {
                const userDocRef = doc(db, "Users", user.uid);
                const userDoc = await getDoc(userDocRef);
    
                if (userDoc.exists()) {
                window.alert("User already exists. Please sign in instead.");
                } else {
                // Split the display name into first and last name
                const nameParts = user.displayName.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
                // Create new user document in Firestore
                await setDoc(userDocRef, {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    photo: user.photoURL
                });
                window.location.href = "/findjobs";
                window.alert("User signed up with Google successfully.");
                }
            }
            })
            .catch((error) => {
            window.alert("Error during Google Signup: ", error);
        });
    };

    return (
    <div className='signup'>
      <div className="signup-left">
        <div className="signup-left-header">
            <Link to="/"><img src={nchsLogo} alt="" /></Link>
        </div>
        <div className="signup-left-body">
            <div className="signup-left-body-header-container">
                <p className="signup-header-top">Start Your Journey</p>
                <h2 className="signup-header">Sign Up for Jobs at NCHS</h2>
                <p className="signup-header-bottom">Have an account already? <Link className='signup-header-bottom-link' to="/signin">Sign In</Link></p>
            </div>
            <div className="sign-up-left-body-main">
                <form onSubmit={handleRegister}>
                    <div className="sign-up-form-container">
                        <label htmlFor="">First Name</label>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="sign-up-form-container">
                        <label htmlFor="">Last Name</label>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} required/>
                    </div> 
                    <div className="sign-up-form-container">
                        <label htmlFor="">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div> 
                    <div className="sign-up-form-container">
                        <label htmlFor="">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button className="sign-up-button" type="submit">Sign Up</button>
                </form>
                <div className="sign-up-form-break">
                    <p>-----------or-------------</p>
                </div>
                <div className="sign-up-alternate-options-container">
                    <button onClick={googleSignup}><img src={googleLogo} alt="" /><p>Continue With Google</p></button>
                </div>
            </div>
        </div>
      </div>
      <div className="signup-right">
        <Slider {...settings} className='carousel'>
            <div className='carousel-card'>
                <img src={studentHeroImg} alt="" />
                <h3>Introducing New Features</h3>
                <p>We’ve added exciting new tools to enhance your job search experience. From personalized job recommendations to an improved application tracking system, 
                    these updates are designed to help students connect with the best opportunities more efficiently. </p>
            </div>
            <div className='carousel-card'>
                <img src={studentHeroImg} alt="" />
                <h3>See Open Job Postings</h3>
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

export default StudentSignUp
