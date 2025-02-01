// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import "./NavbarMain.css"
// import nchsLogo from "../../images/nchs_logo.png"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
// import sampleProfilePic from "../../images/sample_profile_picture.JPG"
// import { doc, getDoc } from "firebase/firestore"
// import { auth, db } from '../../firebase'

// const NavbarMain = () => {
//   const [userDetails, setUserDetails] = useState(null);

//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         try {
//           const docRef = doc(db, "Users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUserDetails(docSnap.data());
//           } else {
//             console.log("No user data found");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         console.log("User is not logged in");
//       }
//     });
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <nav>
//       <div className="nav-left">
//         <Link to="/"><img src={nchsLogo} alt="NCHS Logo" /></Link>
//       </div>
//       <div className="nav-middle">
//         <Link to="/find-jobs" className="nav-link active">Find Jobs</Link>
//         <Link to="/find-companies" className="nav-link">Find Companies</Link>
//         <Link to="/find-people" className="nav-link">Find People</Link>
//       </div>
//       <div className="nav-right">
//         <Link to="/for-business" className="for-business">
//           <FontAwesomeIcon icon={faBriefcase} className="for-business-icon" />
//           <p>For Business</p>
//         </Link>
//         <Link to="/profile" className='profile'>
//           <img src={sampleProfilePic} alt="Profile" className="profile-icon" />
//           {userDetails ? (
//             <div className='profile-text'>
//               <h3>{userDetails.firstName} {userDetails.lastName}</h3>
//               <p>UI/UX Designer</p>
//             </div>
//           ) : (
//             <div className='profile-text'>
//               <h3>Guest</h3>
//               <p>Welcome!</p>
//             </div>
//           )}
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default NavbarMain;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavbarMain.css";
import nchsLogo from "../../images/nchs_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import sampleProfilePic from "../../images/sample_profile_picture.JPG";
import { doc, getDoc, collection, query, where, getDocs, documentId } from "firebase/firestore";
import { auth, db } from '../../firebase';

const NavbarMain = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // For programmatic navigation

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
      navigate('/create-company'); // Redirect to create company page
    } else {
      // Navigate to company portal with the first company's ID (or implement your own logic)
      const firstCompanyId = companies[0].id
      console.log("Companies found, navigating to company-portal page with companyId", firstCompanyId);
      navigate(`/companyportal/${firstCompanyId}`); // Pass the companyId
    }
  };
  

  return (
    <nav>
      <div className="nav-left">
        <Link to="/"><img src={nchsLogo} alt="NCHS Logo" /></Link>
      </div>
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
