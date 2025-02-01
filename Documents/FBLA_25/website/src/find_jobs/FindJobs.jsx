import React, { useState, useEffect } from "react";
import NavbarMain from "./navbar_main/NavbarMain";
import Filters from "./filters/Filters";
import FindJobsCard from "./find_jobs_card/FindJobsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";  // Import Firebase db
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions
import LoadingSpinner from '../loading_spinner/LoadingSpinner';
import "./FindJobs.css";

const FindJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ salary: 12, locations: [], workType: [], searchTag: '' });
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from Firestore on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, "Jobs"), // Your Firestore collection name
          where("status", "==", "Open") // Only get approved jobs
        );
        const querySnapshot = await getDocs(q);
        const jobData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(jobData);  // Set fetched jobs into state
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once when the component mounts

  useEffect(() => {
    // Make loading last 3 seconds so we can clearly see it
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const tagLower = filters.searchTag?.toLowerCase();
  
    // Match the search term against job properties
    const matchesSearch =
      job.role.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.salaryMin.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.type.toLowerCase().includes(searchLower);
  
    const matchesTag = !tagLower || 
      job.company.toLowerCase().includes(tagLower) || 
      job.role.toLowerCase().includes(tagLower); // You can add more fields here if needed
    
    // Assuming job.salaryMin and job.salaryMax are numbers (e.g., 20, 50)
    const matchesSalary = job.salaryMin >= filters.salary;
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
    const matchesType = filters.workType.length === 0 || filters.workType.includes(job.type);
  
    return matchesSearch && matchesTag && matchesSalary && matchesLocation && matchesType;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="find-jobs">
      <NavbarMain />
      <div className="find-jobs-hero">
        <h1>Find Your Dream High School Jobs</h1>
        <p>
          Explore a wide range of job opportunities designed for high school students, helping you
          gain experience, build skills, and start your career journey!
        </p>
        <div className="find-jobs-hero-bottom">
          <input
            type="text"
            placeholder="Search by role, company, location..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="find-jobs-main">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="find-jobs-card-container">
          {filterJobs.map((job) => (
            <FindJobsCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
