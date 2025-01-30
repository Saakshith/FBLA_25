import React, {useState} from 'react'
import CompanyNavbar from './company_navbar/CompanyNavbar'
import CompanySidebar from './company_sidebar/CompanySidebar'
import CompanyJobCard from './company_job_card/CompanyJobCard'
import "./CompanyPortal.css"

const CompanyPortal = () => {
  const [salary, setSalary] = useState(12); // Default salary value

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  return (
    <div>
      <CompanyNavbar />
      <div className="company-portal-main">
        <CompanySidebar />
        <div className="company-main-inner">
            <div className="company-main-header">
                <div className="company-main-header-left">
                    <h2 className="company-portal-header">Jobs Opening</h2>
                    <div className="company-job-status-main-container">
                        <div className="company-job-status-container">
                            <div className="company-job-status-circle" id="green"></div>
                            <p className="company-job-status">Open (3)</p>
                        </div>
                        <div className="company-job-status-container">
                            <div className="company-job-status-circle" id="red"></div>
                            <p className="company-job-status">Rejected (3)</p>
                        </div>
                        <div className="company-job-status-container">
                            <div className="company-job-status-circle" id="yellow"></div>
                            <p className="company-job-status">Hold (3)</p>
                        </div>
                        <div className="company-job-status-container">
                            <div className="company-job-status-circle" id="grey"></div>
                            <p className="company-job-status">Draft (3)</p>
                        </div>
                    </div>
                </div>
                <div className="company-main-header-right">
                    <button>Create Job</button>
                </div>
            </div>
            <div className="company-job-filters-container">
                <div className="company-job-filter">
                    <input type="text" className='company-job-filter-search' placeholder='Search for jobs...'/>
                </div>
                <div className="company-job-filter">
                    <select name="" id="">
                        <option value="">All Statuses</option>
                    </select>
                </div>
                <div className="company-job-filter">
                    <select name="" id="">
                        <option value="">All Locations</option>
                    </select>
                </div>
                <div className="company-job-filter">
                    <select name="" id="">
                        <option value="">All Work Types</option>
                    </select>
                </div>
                <div className="company-job-filter slider-container">
                    <input 
                        type="range" 
                        min="12" 
                        max="60" 
                        step="1" 
                        value={salary} 
                        onChange={handleSalaryChange} 
                        className="salary-slider"
                    />
                    <div 
                        className="salary-value" 
                        style={{ left: `${((salary - 12) / 48) * 100}%` }}
                    >
                        ${Number(salary).toLocaleString()}+
                    </div>
                </div>
            </div>
            <div className="company-job-card-container">
                <CompanyJobCard />
                <CompanyJobCard />
                <CompanyJobCard />
                <CompanyJobCard />
                <CompanyJobCard />
                <CompanyJobCard />
            </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyPortal
