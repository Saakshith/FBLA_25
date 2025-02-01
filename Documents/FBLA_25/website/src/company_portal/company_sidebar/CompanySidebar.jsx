// import React from 'react'
// import davesHotChicken from "../../images/daves_hot_chicken_logo.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import "./CompanySidebar.css"
// import { Link } from 'react-router-dom'

// const CompanySidebar = () => {
//   return (
//     <nav className='company-sidebar'>
//       <div className="companies">
//         <div className="company-container company-container-active">
//             <img src={davesHotChicken} alt="" />
//         </div>
//         <div className="company-container">
//             <img src={davesHotChicken} alt="" />
//         </div>
//       </div>
//       <Link className="plus-container">
//         <FontAwesomeIcon icon={faPlus} className='plus-sign'/>
//       </Link>
//     </nav>
//   )
// }

// export default CompanySidebar

// import React, { useState, useEffect } from 'react';
// import davesHotChicken from "../../images/daves_hot_chicken_logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import "./CompanySidebar.css";
// import { Link, useNavigate } from 'react-router-dom'; // For navigation
// import { db } from '../../firebase'; // Import Firebase
// import { collection, getDocs, query, where } from 'firebase/firestore'; 

// const CompanySidebar = ({ selectedCompany, setSelectedCompany }) => {
//   const [companies, setCompanies] = useState([]); // Array to hold company data
//   const navigate = useNavigate();

//   // Fetch companies from Firestore
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       const q = query(collection(db, "companies"));
//       const querySnapshot = await getDocs(q);
//       const companyList = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCompanies(companyList);
//     };

//     fetchCompanies();
//   }, []);

//   // Handle selecting a company
//   const handleCompanySelect = (company) => {
//     setSelectedCompany(company); // Set the selected company state
//   };

//   // Handle creating a new company
//   const handleCreateCompany = () => {
//     navigate('/create-company'); // Navigate to a page for creating a new company
//   };

//   return (
//     <nav className='company-sidebar'>
//       <div className="companies">
//         {companies.map((company) => (
//           <div 
//             key={company.id}
//             className={`company-container ${selectedCompany?.id === company.id ? 'company-container-active' : ''}`}
//             onClick={() => handleCompanySelect(company)}
//           >
//             <img src={company.logoUrl || davesHotChicken} alt={company.name} />
//             <p>{company.name}</p>
//           </div>
//         ))}
//       </div>

//       <Link className="plus-container" onClick={handleCreateCompany}>
//         <FontAwesomeIcon icon={faPlus} className='plus-sign'/>
//       </Link>
//     </nav>
//   );
// };

// export default CompanySidebar;
// import React, { useState, useEffect } from 'react';
// import davesHotChicken from "../../images/daves_hot_chicken_logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import "./CompanySidebar.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../../firebase';
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// const CompanySidebar = ({ userId, selectedCompany, setSelectedCompany }) => {
//   const [companies, setCompanies] = useState([]);
//   const navigate = useNavigate();

//   console.log(companies)

//   useEffect(() => {
//     const fetchUserCompanies = async () => {
//       try {
//         const userDocRef = doc(db, 'Users', userId);
//         console.log(userDocRef)
//         const userSnapshot = await getDoc(userDocRef);


//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           const companyIds = userData.companyIds || [];

//           if (companyIds.length === 0) {
//             console.log("No companies associated with this user");
//             return;
//           }

//           if (companyIds.length <= 10) {
//             // Fetch companies by their document IDs directly
//             const promises = companyIds.map(async (companyId) => {
//               const companyDoc = await getDoc(doc(db, 'Companies', companyId));
//               return companyDoc.exists() ? { id: companyDoc.id, ...companyDoc.data() } : null;
//             });

//             const resolvedCompanies = (await Promise.all(promises)).filter(Boolean);
//             setCompanies(resolvedCompanies);
//           } else {
//             console.error("Firestore 'in' query can only handle up to 10 document IDs");
//           }
//         } else {
//           console.error("User document not found");
//         }
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };

//     fetchUserCompanies();
//   }, [userId]);

//   const handleCompanySelect = (company) => {
//     setSelectedCompany(company);
//   };

//   const handleCreateCompany = () => {
//     navigate('/create-company');
//   };

//   return (
//     <nav className='company-sidebar'>
//       <div className="companies">
//         {companies.map((company) => (
//           <div 
//             key={company.id}
//             className={`company-container ${selectedCompany?.id === company.id ? 'company-container-active' : ''}`}
//             onClick={() => handleCompanySelect(company)}
//           >
//             <img src={company.logoUrl || davesHotChicken} alt={company.name} />
//             <p>{company.name}</p>
//           </div>
//         ))}
//       </div>

//       <Link className="plus-container" onClick={handleCreateCompany}>
//         <FontAwesomeIcon icon={faPlus} className='plus-sign'/>
//       </Link>
//     </nav>
//   );
// };

// export default CompanySidebar;

import React, { useState, useEffect } from 'react';
import davesHotChicken from "../../images/daves_hot_chicken_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "./CompanySidebar.css";
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const CompanySidebar = ({ userId, companies, setSelectedCompany, selectedCompany }) => {
  const navigate = useNavigate();

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    navigate(`/companyportal/${company.id}`); // Navigate dynamically with companyId
  };

  return (
    <nav className='company-sidebar'>
      <div className="companies">
        {companies.map((company) => (
          <div
            key={company.id}
            className={`company-container ${selectedCompany?.id === company.id ? 'company-container-active' : ''}`}
            onClick={() => handleCompanySelect(company)}
          >
            <img src={company.logoUrl || davesHotChicken} alt={company.name} />
          </div>
        ))}
      </div>

      <Link className="plus-container" onClick={() => navigate('/create-company')}>
        <FontAwesomeIcon icon={faPlus} className='plus-sign'/>
      </Link>
    </nav>
  );
};

export default CompanySidebar;
