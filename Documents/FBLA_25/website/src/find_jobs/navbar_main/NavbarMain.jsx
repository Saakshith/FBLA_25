import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavbarMain.css";
import nchsLogo from "../../images/nchs_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBars, faTimes, faBuilding } from '@fortawesome/free-solid-svg-icons';
import sampleProfilePic from "../../images/sample_profile_picture.JPG";
import { doc, getDoc, collection, query, where, getDocs, documentId } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';

const NavbarMain = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // For programmatic navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch user data from Firestore and companies they're part of
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails(userData);
  
            const companyIds = userData.companyIds || [];
            console.log("User's companyIds:", companyIds); // Debugging line
  
            if (companyIds.length > 0) {
              if (companyIds.length <= 10) {
                const companiesQuery = query(
                  collection(db, "Companies"),
                  where(documentId(), "in", companyIds) // assuming 'id' is the field in Companies
                );
                const querySnapshot = await getDocs(companiesQuery);
  
                if (!querySnapshot.empty) {
                  const fetchedCompanies = querySnapshot.docs.map(doc => doc.data());
                  console.log("Fetched companies:", fetchedCompanies); // Debugging line
                  setCompanies(fetchedCompanies);
                } else {
                  console.log("No companies found for user");
                  setCompanies([]);
                }
              } else {
                console.log("Too many companyIds (more than 10), need to batch the query.");
                // Handle batching here if necessary
              }
            } else {
              console.log("User has no associated companies");
              setCompanies([]);
            }
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

  // Redirect to company portal or create company if no companies
  const handleForBusinessClick = () => {
    if (companies.length === 0) {
      console.log("No companies, navigating to create-company page");
      navigate('/createcompany'); // Redirect to create company page
    } else {
      // Navigate to company portal with the first company's ID (or implement your own logic)
      const firstCompanyId = companies[0].id
      console.log("Companies found, navigating to company-portal page with companyId", firstCompanyId);
      navigate(`/companyportal/${firstCompanyId}`); // Pass the companyId
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-left">
          <Link to="/"><img src={nchsLogo} alt="NCHS Logo" /></Link>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="nav-middle">
          <Link to="/find-jobs" className="nav-link active">Find Jobs</Link>
          <Link to="/find-companies" className="nav-link">Find Companies</Link>
          <Link to="/find-people" className="nav-link">Find People</Link>
        </div>

        <div className="nav-right">
          <div onClick={handleForBusinessClick} className="for-business">
            <FontAwesomeIcon icon={faBriefcase} className="for-business-icon" />
            <p>For Business</p>
          </div>
          <Link to="/profile" className='profile'>
            <img src={sampleProfilePic} alt="Profile" className="profile-icon" />
            {userDetails ? (
              <div className='profile-text'>
                <h3>{userDetails.firstName} {userDetails.lastName}</h3>
                <p onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4444' }}>Logout</p>
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/">
            <img src={nchsLogo} alt="NCHS Logo" style={{ height: '50px' }} />
          </Link>
          <button className="mobile-menu-close" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="nav-middle">
          <Link to="/find-jobs" onClick={toggleMobileMenu}>Find Jobs</Link>
          <Link to="/find-companies" onClick={toggleMobileMenu}>Find Companies</Link>
          <Link to="/find-people" onClick={toggleMobileMenu}>Find People</Link>
        </div>

        <div className="nav-right">
          <div className="for-business" onClick={(e) => { handleForBusinessClick(); toggleMobileMenu(); }}>
            <FontAwesomeIcon icon={faBriefcase} className="for-business-icon" />
            <p>For Business</p>
          </div>
          <Link to="/profile" className='profile' onClick={toggleMobileMenu}>
            <img src={sampleProfilePic} alt="Profile" className="profile-icon" />
            {userDetails ? (
              <div className='profile-text'>
                <h3>{userDetails.firstName} {userDetails.lastName}</h3>
                <p onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ cursor: 'pointer', color: '#ff4444' }}>Logout</p>
              </div>
            ) : (
              <div className='profile-text'>
                <h3>Guest</h3>
                <p>Welcome!</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarMain;
