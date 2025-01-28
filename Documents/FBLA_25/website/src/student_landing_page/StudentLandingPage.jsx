import React, {useEffect, useRef, useState} from 'react'

import NavbarHome from './navbar_home/NavbarHome'
import Footer from './footer_home/Footer'

import "./StudentLandingPage.css"

import heroImg from "../images/student_hero_img.png"
import aboutUsImg from "../images/about_us.jpg"
import davesHotChickenLogo from '../images/daves_hot_chicken_logo.png';
import mcDonaldsLogo from '../images/mcdonalds_logo.png';
import modPizzaLogo from '../images/mod_pizza_logo.webp';
import pandaExpressLogo from '../images/panda_express_logo.webp';
import subwayLogo from '../images/subway_logo.png';
import tacoBellLogo from '../images/taco_bell_logo.png';
import wendysLogo from '../images/wendys_logo.png';

const StudentLandingPage = () => {
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
        question: "What is NCHS Job Finder?",
        answer: "NCHS Job Finder connects students with job opportunities within their school community and beyond.",
      },
      {
        question: "How do I apply for jobs?",
        answer: "Click on the 'Find Jobs' button, create an account, and start browsing available positions.",
      },
      {
        question: "Can companies post job listings?",
        answer: "Yes, companies can post job listings by clicking the 'For Companies' button and signing up.",
      },
      {
        question: "Is this platform free for students?",
        answer: "Yes, students can use the platform for free to find job opportunities.",
      },
      {
        question: "Why is this website so good?",
        answer: "This website offers an excellent user experience and connects students to meaningful opportunities.",
      },
    ];
  
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };  
  

  return (
    <div className='student-landing-page'>
      <section className="hero">
        <NavbarHome />
        <div className="hero-main">
          <h1 className="hero-heading">Find Your Next Job As an NCHS Student</h1>
          <p className="hero-description">User-friendly job search application , recognized nationwide, and known for our amazing commitment to our students</p>
          <div className="hero-button-container">
            <button className="primary-cta">Find Jobs</button>
            <button className="secondary-cta">For Companies</button>
          </div>
          <img className="hero-img" src={heroImg} alt="" />
        </div>
      </section>
      <section className='about-us'>
        <div className="about-us-section-header-container">
          <h2 className='about-us-section-header'>About Us</h2>
        </div>
        <div className="about-us-main">
          <div className="about-us-left">
            <img src={aboutUsImg} alt="" />
          </div>
          <div className="about-us-right">
            <p>At NCHS Job Finder, we connect students with incredible job opportunities within their school community and beyond. Our platform helps students find part-time jobs, internships, and seasonal positions at local businesses and organizations. Whether you're looking to gain work experience or earn some extra income, we’re here to help you on your journey. <br /> We believe in empowering students to discover career paths, develop valuable skills, and build their professional networks early on. Join us and be part of a growing community of students taking the first step toward their bright future!</p>
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
      <section className="faq">
        <div className="faq-section-header-container">
          <h2 className="faq-section-header">Frequently Asked Questions About Us</h2>
          <p className="faq-section-description">Need help with something, here are our frequently asked questions</p>
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

export default StudentLandingPage
