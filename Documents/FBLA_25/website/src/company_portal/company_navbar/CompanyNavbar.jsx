import React, { useEffect, useState } from 'react'
import sampleProfilePicture from "../../images/sample_profile_picture.JPG"
import {Link, useParams} from 'react-router-dom'
import nchsLogo from "../../images/nchs_logo.png"
import "./CompanyNavbar.css"
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const CompanyNavbar = () => {
  const auth = getAuth()
  const { companyId } = useParams()
  const [companyData, setCompanyData] = useState(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (companyId) {
        const db = getFirestore()
        const companyRef = doc(db, 'Companies', companyId)
        const companySnap = await getDoc(companyRef)
        
        if (companySnap.exists()) {
          setCompanyData(companySnap.data())
        }
      }
    }

    fetchCompanyData()
  }, [companyId])

  return (
    <nav className='company-navbar'>
      <div className="logo-container">
        <Link className="logo" to={`/companyportal/${companyId}`}>
            <img src={nchsLogo} alt="" />
            <h3>Recruitment</h3>
        </Link>
      </div>
      <div className="nav-center">
        <Link className="nav-link">Jobs</Link>
        <Link className="nav-link">Team</Link>
        <Link className="nav-link" to={`/companyprofile/${companyId}`}>Profile</Link>
      </div>
      <div className="nav-right">
        <Link className='profile-picture'><img src={sampleProfilePicture} alt="" /></Link>
      </div>
    </nav>
  )
}

export default CompanyNavbar
