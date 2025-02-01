// import React from 'react'
// import NavbarMain from '../find_jobs/navbar_main/NavbarMain'
// import "../find_jobs/FindJobs.css"
// import nchsLogo from "../images/nchs_logo.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import Filters from './filters/Filters'
// import AdminCard from './admin_card/AdminCard'

// const AdminPortal = () => {
//   return (
//     <div className='find-jobs'>
//       <NavbarMain />
//       <div className="find-jobs-hero">
//         <h1>Approve Safe Jobs for students</h1>
//         <p>Easily review and approve job listings to ensure they meet our safety standards, providing students with secure and reliable job opportunities.</p>
//         <div className="find-jobs-hero-bottom">
//             <input type="text" />
//             <FontAwesomeIcon icon={faSearch} className='search-icon'/>
//         </div>
//       </div>
//       <div className="find-jobs-main">
//         <Filters />
//         <div className="find-jobs-card-container">
//             <AdminCard />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminPortal
import React, { useState, useEffect, useCallback } from "react";
import NavbarMain from "../find_jobs/navbar_main/NavbarMain";
import Filters from "./filters/Filters";
import AdminCard from "./admin_card/AdminCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import "../find_jobs/FindJobs.css";

const AdminPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ 
    salary: 12, 
    locations: [], 
    workType: [], // Keep this as workType for filter state
    searchTag: '' 
  });
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching pending jobs...");
      
      const pendingQuery = query(
        collection(db, "Jobs"),
        where("status", "==", "Pending")
      );

      const querySnapshot = await getDocs(pendingQuery);
      console.log(`Found ${querySnapshot.docs.length} pending jobs`);
      
      // Fetch company details for each job
      const jobsWithCompanyData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const jobData = doc.data();
          console.log("Job data:", jobData);
          
          try {
            // Use getDoc to fetch the company document
            const companyDoc = await getDoc(jobData.companyId);
            
            return {
              id: doc.id,
              ...jobData,
              company: companyDoc.exists() ? companyDoc.data().name : 'Unknown Company',
              companyLogo: companyDoc.exists() ? companyDoc.data().logoUrl : '',
            };
          } catch (error) {
            console.error('Error fetching company data for job:', doc.id, error);
            return {
              id: doc.id,
              ...jobData,
              company: 'Unknown Company',
              companyLogo: '',
            };
          }
        })
      );
      
      console.log('Processed jobs:', jobsWithCompanyData);
      setJobs(jobsWithCompanyData);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Simplified filter function since we're only showing pending jobs
  const filterJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const tagLower = filters.searchTag?.toLowerCase();
  
    const matchesSearch =
      job.role?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.type?.toLowerCase().includes(searchLower);
  
    const matchesTag = !tagLower || 
      job.company?.toLowerCase().includes(tagLower) || 
      job.role?.toLowerCase().includes(tagLower);
    
    const matchesSalary = !filters.salary || job.salaryMin >= filters.salary;
    const matchesLocation = filters.locations.length === 0 || 
      filters.locations.includes(job.location);
    const matchesType = filters.workType.length === 0 || 
      filters.workType.includes(job.type);
  
    return matchesSearch && matchesTag && matchesSalary && matchesLocation && matchesType;
  });

  console.log('Filtered jobs:', filterJobs); // Add this log

  return (
    <div className="find-jobs">
      <NavbarMain />
      <div className="find-jobs-hero">
        <h1>Approve Safe Jobs for Students</h1>
        <p>
          Easily review and approve job listings to ensure they meet our safety standards, 
          providing students with secure and reliable job opportunities.
        </p>
        <div className="find-jobs-hero-bottom">
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="find-jobs-main">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="find-jobs-card-container">
          {isLoading ? (
            <div className="loading-message">Loading jobs...</div>
          ) : filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <AdminCard 
                key={job.id} 
                job={job}
                onJobUpdate={fetchJobs}
              />
            ))
          ) : (
            <div className="no-jobs-message">
              No jobs pending approval at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
