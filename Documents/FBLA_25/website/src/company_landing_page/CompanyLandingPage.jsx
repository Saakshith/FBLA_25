import React, {useEffect, useRef, useState} from 'react'

import NavbarHome from '../navbar_home/NavbarHome'
import Footer from '../footer_home/Footer'

import "./CompanyLandingPage.css"

import heroImg from "../images/student_hero_img.png"
import aboutUsImg from "../images/about_us.jpg"
import davesHotChickenLogo from '../images/daves_hot_chicken_logo.png';
import mcDonaldsLogo from '../images/mcdonalds_logo.png';
import modPizzaLogo from '../images/mod_pizza_logo.webp';
import pandaExpressLogo from '../images/panda_express_logo.webp';
import subwayLogo from '../images/subway_logo.png';
import tacoBellLogo from '../images/taco_bell_logo.png';
import wendysLogo from '../images/wendys_logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const CompanyLandingPage = () => {
    const scrollContainerRef = useRef(null);
    const scrollSpeed = 1; // Adjust speed here

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        let scrollPos = 0;

        const scrollLogos = () => {
        scrollPos -= scrollSpeed;
        // Reset scroll position to avoid gaps
        if (Math.abs(scrollPos) >= scrollContainer.scrollWidth / 2) {
            scrollPos = 0;
        }
        scrollContainer.style.transform = `translateX(${scrollPos}px)`;
        requestAnimationFrame(scrollLogos);
        };

        // Clone child elements to create an infinite loop effect
        const originalContent = scrollContainer.innerHTML;
        scrollContainer.innerHTML += originalContent;

        scrollLogos();

        return () => {
            scrollContainer.innerHTML = originalContent; // Cleanup on unmount
        };
    }, []);

    const faqData = [
      {
        question: "How do I create a company profile?",
        answer: "To create a company profile, click on the 'For Companies' button, sign up with your business details, and customize your profile to start posting job openings and connecting with applicants."
      },
      {
        question: "How can I post job listings?",
        answer: "Once your company profile is set up, you can easily post job listings by providing details such as job title, description, and requirements. You can choose job types like part-time, internship, or seasonal."
      },
      {
        question: "Can I set specific requirements for applicants?",
        answer: "Yes! When posting a job, you can set filters and specific requirements such as qualifications, preferred skills, and availability, ensuring you attract the best-fit candidates."
      },
      {
        question: "How do I manage applicants?",
        answer: "You can track and manage applicants through your company profile. Review resumes, communicate with candidates, and schedule interviews, all within the platform."
      },
      {
        question: "Is there a cost to post job listings?",
        answer: "Currently, posting job listings is free for companies. Our goal is to make it easy for businesses to connect with students looking for work."
      },
      {
        question: "Can I schedule interviews with applicants?",
        answer: "Yes! Once you've reviewed applicants, you can schedule interviews directly through the platform, making the hiring process streamlined and efficient."
      }
    ];
    
  
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };  
  

  return (
    <div className='company-landing-page'>
      <section className="hero">
        <NavbarHome />
        <div className="hero-main">
          <h1 className="hero-heading">Join the 100s of companies posting on Jobs at NCHS</h1>
          <p className="hero-description">Connect with top student talent and find your next great hire today!</p>
          <div className="hero-button-container">
            <button className="primary-cta">Create Company Profile</button>
          </div>
          <img className="hero-img" src={heroImg} alt="" />
        </div>
      </section>
      <section className='how' id="how">
        <div className="how-section-header-container">
          <h2 className='how-section-header'>How It Works For Companies</h2>
        </div>
        <div className='how-main'>
            <div className='how-card'>
              <FontAwesomeIcon icon={faUser} size="2x" className='how-card-icon'/>
              <div className='how-card-header'><h3>Create Company Profile</h3></div>
              <div className='how-card-description'><p>Create a company profile in minutes to showcase your job openings. Easily post listings, manage applications, and connect with talented students ready to work.</p></div>
            </div>
            <div className='how-card'>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" className='how-card-icon'/>
              <div className='how-card-header'><h3>Create Open Jobs</h3></div>
              <div className='how-card-description'><p>Quickly create job listings, set requirements, and attract motivated students looking for part-time, seasonal, or internship opportunities.</p></div>
            </div>
            <div className='how-card'>
              <FontAwesomeIcon icon={faUserDoctor} size="2x" className='how-card-icon'/>
              <div className='how-card-header'><h3>Set Filters & Requirements</h3></div>
              <div className='how-card-description'><p>Quickly create job listings, set filters and requirements, and connect with motivated students seeking part-time, seasonal, or internship opportunities.</p></div>
            </div>
            <div className='how-card'>
              <FontAwesomeIcon icon={faCalendar} size="2x" className='how-card-icon'/>
              <div className='how-card-header'><h3>Schedule Interviews</h3></div>
              <div className='how-card-description'><p>Easily schedule interviews, track applicants, and find the best fit for your open positions with just a few clicks.</p></div>
            </div>
        </div>
      </section>
      <section className='scroll'>
        <div className="scroll-container" ref={scrollContainerRef}>
                  <div className="scroll-content">
                      <img src={davesHotChickenLogo} alt="Dave's Hot Chicken" />
                      <img src={modPizzaLogo} alt="MOD Pizza" />
                      <img src={mcDonaldsLogo} alt="McDonald's" />
                      <img src={pandaExpressLogo} alt="Panda Express" />
                      <img src={subwayLogo} alt="Subway" />
                      <img src={tacoBellLogo} alt="Taco Bell" />
                      <img src={wendysLogo} alt="Wendy's" />
                  </div>
          </div>
      </section>
      <section className="faq" id="faq">
        <div className="faq-section-header-container">
          <h2 className="faq-section-header">Frequently Asked Questions About Us</h2>
          <p className="faq-section-description">If you need assistance, please refer to our Frequently Asked Questions (FAQ)
            section for detailed information and answers to common inquiries.
          </p>
        </div>
        <div className="faq-accordion-container">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <span className="faq-toggle-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default CompanyLandingPage