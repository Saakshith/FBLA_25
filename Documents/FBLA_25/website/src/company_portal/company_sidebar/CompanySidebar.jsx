import React from 'react'
import davesHotChicken from "../../images/daves_hot_chicken_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./CompanySidebar.css"
import { Link } from 'react-router-dom'

const CompanySidebar = () => {
  return (
    <nav className='company-sidebar'>
      <div className="companies">
        <div className="company-container company-container-active">
            <img src={davesHotChicken} alt="" />
        </div>
        <div className="company-container">
            <img src={davesHotChicken} alt="" />
        </div>
      </div>
      <Link className="plus-container">
        <FontAwesomeIcon icon={faPlus} className='plus-sign'/>
      </Link>
    </nav>
  )
}

export default CompanySidebar
