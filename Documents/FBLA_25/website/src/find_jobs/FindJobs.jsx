import React, { useState, useEffect, useCallback } from "react";
import NavbarMain from "./navbar_main/NavbarMain";
import Filters from "./filters/Filters";
import FindJobsCard from "./find_jobs_card/FindJobsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { collection, query, where, getDocs, getCountFromServer, getDoc } from "firebase/firestore";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import "./FindJobs.css";

const FindJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ salary: 12, locations: [], workType: [], searchTag: "" });
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "Jobs"),
        where("status", "==", "Open")
      );
      const querySnapshot = await getDocs(q);

      const jobsPromises = querySnapshot.docs.map(async (doc) => {
        const jobData = { id: doc.id, ...doc.data() };

        try {
          const companyDoc = await getDoc(jobData.companyId);
          
          return {
            ...jobData,
            company: companyDoc.exists() ? companyDoc.data().name : 'Unknown Company',
            companyLogo: companyDoc.exists() ? companyDoc.data().logoUrl : '',
            applicants: jobData.applicants || 0
          };
        } catch (error) {
          console.error("Error fetching company data for job:", doc.id, error);
          return {
            ...jobData,
            company: 'Unknown Company',
            companyLogo: '',
            applicants: jobData.applicants || 0
          };
        }
      });

      const jobsWithCompanyData = await Promise.all(jobsPromises);
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

  const filterJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const tagLower = filters.searchTag?.toLowerCase();

    const matchesSearch =
      job.role?.toLowerCase().includes(searchLower) ||
      job.company?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.type?.toLowerCase().includes(searchLower) ||
      job.salaryMin.toString().includes(searchTerm);

    const matchesTag = !tagLower ||
      job.company?.toLowerCase().includes(tagLower) ||
      job.role?.toLowerCase().includes(tagLower);

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
      <div>
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
          {filterJobs.map((job) => (
            <FindJobsCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default FindJobs;
