import React from 'react'
import CompanyNavbar from './company_navbar/CompanyNavbar'
import CompanySidebar from './company_sidebar/CompanySidebar'
import CompanyJobCard from './company_job_card/CompanyJobCard'
import "./CompanyPortal.css"

const CompanyPortal = () => {
  return (
    <div>
      <CompanyNavbar />
      <div className="company-portal-main">
        <CompanySidebar />
        <div className="company-job-card-container">
            <CompanyJobCard />
        </div>
      </div>
    </div>
  )
}

export default CompanyPortal
