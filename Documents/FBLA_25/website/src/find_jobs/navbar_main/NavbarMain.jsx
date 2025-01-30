import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavbarMain.css"
import nchsLogo from "../../images/nchs_logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import sampleProfilePic from "../../images/sample_profile_picture.JPG"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from '../../firebase'

const NavbarMain = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <nav>
      <div className="nav-left">
        <Link><img src={nchsLogo} alt="" /></Link>
      </div>
      <div className="nav-middle">
        <Link className="nav-link active">Find Jobs</Link>
        <Link className="nav-link">Find Companies</Link>
        <Link className="nav-link">Find People</Link>
      </div>
      <div className="nav-right">
        <Link className="for-business">
          <FontAwesomeIcon icon={faBriefcase} className="for-business-icon" />
          <p>For Business</p>
        </Link>
        <Link className='profile'>
          <img src={sampleProfilePic} alt="" className="profile-icon" />
          {userDetails ? (
            <div className='profile-text'>
              <h3>{userDetails.firstName} {userDetails.lastName}</h3>
              <p>UI/UX Designer</p>
            </div>
          ) : (
            <div className='profile-text'>
              <h3>Guest</h3>
              <p>Welcome!</p>
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavbarMain;
