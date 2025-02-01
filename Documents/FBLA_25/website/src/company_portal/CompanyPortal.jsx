import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyNavbar from './company_navbar/CompanyNavbar';
import CompanySidebar from './company_sidebar/CompanySidebar';
import CompanyJobCard from './company_job_card/CompanyJobCard';
import CreateJobPopup from './create_job_popup/CreateJobPopup';
import './CompanyPortal.css';
import JobDetails from './job_details/JobDetails';

const CompanyPortal = () => {
  const { companyId } = useParams();
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [salary, setSalary] = useState(12);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const navigate = useNavigate();

  // Fetch logged-in user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/signin');
      }
    });

    return unsubscribe;
  }, [navigate]);

  // Fetch companies associated with the logged-in user
  useEffect(() => {
    const fetchCompanies = async () => {
      if (!user) return;

      try {
        const userRefPath = doc(db, 'Users', user.uid);
        const q = query(collection(db, 'Companies'), where('teamMembers', 'array-contains', userRefPath));
        const querySnapshot = await getDocs(q);

        const companyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCompanies(companyList);

        const companyFromUrl = companyList.find((company) => company.id === companyId);
        setSelectedCompany(companyFromUrl || companyList[0] || null);

        if (companyList.length === 0) navigate('/create-company');
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [user, companyId, navigate]);

  // Fetch jobs for the selected company
  useEffect(() => {
    if (selectedCompany) {
      const fetchJobs = async () => {
        try {
          const q = query(
            collection(db, 'Jobs'),
            where('companyId', '==', doc(db, 'Companies', selectedCompany.id))  // Use document reference
          );
          const querySnapshot = await getDocs(q);
          const jobList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('Selected Company:', selectedCompany);
          console.log('Query Snapshot:', querySnapshot.docs.length);
          console.log('Job List:', jobList);

          setJobs(jobList);
          setFilteredJobs(jobList); // Set initial filtered jobs
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };

      fetchJobs();
    }
  }, [selectedCompany]);

  // Filter jobs based on selected filters
  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm.trim()) {  // Only filter if searchTerm isn't empty
      filtered = filtered.filter((job) => {
        const title = (job.role || '').toLowerCase();
        const description = (job.description || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase().trim();
        
        return title.includes(searchLower) || description.includes(searchLower);
      });
    }

    if (statusFilter) {
      filtered = filtered.filter((job) => 
        (job.status || '').toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) => 
        (job.location || '').toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (workTypeFilter) {
      filtered = filtered.filter((job) => 
        (job.type || job.workType || '').toLowerCase() === workTypeFilter.toLowerCase()
      );
    }

    if (salary && salary > 12) { // Only filter if salary is above minimum
      filtered = filtered.filter((job) => 
        !salary || (job.minSalary || 0) >= salary
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, locationFilter, workTypeFilter, salary, jobs]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <CompanyNavbar />
      <div className="company-portal-main">
        <CompanySidebar
          userId={user ? user.uid : null}
          companies={companies}
          setSelectedCompany={setSelectedCompany}
          selectedCompany={selectedCompany}
        />
        <div className="company-main-inner">
          <div className="company-main-header">
            <div className="company-main-header-left">
              <h2 className="company-portal-header">Jobs Opening</h2>
            </div>
            <div className="company-main-header-right">
              <button onClick={openPopup}>Create Job</button>
            </div>
          </div>

          {/* Filters */}
          <div className="company-job-filters-container">
            <div className="company-job-filter">
              <input
                type="text"
                className="company-job-filter-search"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="company-job-filter">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Rejected">Rejected</option>
                <option value="Hold">Hold</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="company-job-filter">
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                <option value="">All Locations</option>
                {[...new Set(jobs.map((job) => job.location))].map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="company-job-filter">
              <select value={workTypeFilter} onChange={(e) => setWorkTypeFilter(e.target.value)}>
                <option value="">All Work Types</option>
                {[...new Set(jobs.map((job) => job.type || job.workType))].filter(Boolean).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="company-job-filter slider-container">
              <input
                type="range"
                min="12"
                max="60"
                step="1"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="salary-slider"
              />
              <div className="salary-value" style={{ left: `${((salary - 12) / 48) * 100}%` }}>
                ${salary.toLocaleString()}+
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="company-job-card-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <CompanyJobCard 
                  key={job.id} 
                  job={{
                    ...job,
                    // Ensure these fields exist to prevent undefined errors
                    title: job.title || 'Untitled Position',
                    status: job.status || 'Draft',
                    location: job.location || 'No location specified',
                    workType: job.workType || 'Not specified',
                    minSalary: job.minSalary || 0
                  }} 
                />
              ))
            ) : (
              <p>No jobs available for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
      <CreateJobPopup 
        isOpen={isPopupOpen}
        closePopup={closePopup}
        createJob={(jobData) => console.log('Create Job:', jobData)} // You can pass the actual create job function here
        companyId={selectedCompany?.id}
        createdBy={user?.uid}
      />
    </div>
  );
};

export default CompanyPortal;
