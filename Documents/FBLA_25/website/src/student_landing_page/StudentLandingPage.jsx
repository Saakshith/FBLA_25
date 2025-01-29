import React, {useEffect, useRef, useState} from 'react'

import NavbarHome from '../navbar_home/NavbarHome'
import Footer from '../footer_home/Footer'

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
        answer: "NCHS Job Finder is a platform designed to connect students with job opportunities both within their school community and in the local area. Whether you're looking for part-time work, internships, or seasonal positions, our goal is to help students gain real-world experience and develop essential skills for their future careers."
      },
      {
        question: "How do I apply for jobs?",
        answer: "To apply for jobs, click on the 'Find Jobs' button on our homepage. If you don’t have an account yet, you’ll need to create one by providing some basic information. Once registered, you can browse available job listings, read descriptions, and submit applications directly through the platform. Some positions may require additional documents, such as a resume or cover letter."
      },
      {
        question: "Can companies post job listings?",
        answer: "Yes! Businesses and organizations looking to hire students can post job listings on our platform. To do so, click on the 'For Companies' button, sign up for an employer account, and submit job postings with details such as job description, requirements, and application instructions. Our team reviews each listing to ensure it aligns with student employment opportunities."
      },
      {
        question: "Is this platform free for students?",
        answer: "Absolutely! NCHS Job Finder is completely free for students to use. Our mission is to provide equal access to job opportunities without any cost, helping students build work experience, earn income, and explore career paths without financial barriers."
      },
      {
        question: "Why is this website so helpful for students?",
        answer: "NCHS Job Finder is a valuable resource for students because it streamlines the job search process, making it easier to find opportunities that fit their schedules and interests. The platform is designed with students in mind, offering a user-friendly interface, curated job postings, and support to help students gain work experience, develop professional skills, and build connections in their chosen fields."
      },
      {
        question: "What types of jobs are available on NCHS Job Finder?",
        answer: "Our platform offers a variety of job opportunities, including part-time positions, internships, seasonal jobs, and volunteer opportunities. Jobs may be available in industries such as retail, hospitality, tutoring, administrative work, and more. We continuously update our listings to provide diverse opportunities for students with different skills and career interests."
      },
      {
        question: "How can I increase my chances of getting hired?",
        answer: "To improve your chances of getting hired, ensure your profile is complete and up to date. Tailor your resume to highlight relevant skills and experiences, and write a strong cover letter that explains why you’re a great fit for the position. Additionally, check the platform regularly for new job postings and apply promptly to increase your visibility to employers."
      }
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
          <p className="hero-description">User-friendly job search application and known for our amazing commitment to our students</p>
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
            <p>At NCHS Job Finder, we are dedicated to connecting students with meaningful job opportunities within their school community and beyond. Our platform is designed to
               bridge the gap between local businesses, organizations, and students eager to gain valuable work experience. Whether you're searching for a 
               part-time job, an internship, or seasonal work, 
              NCHS Job Finder is your go-to resource for exploring opportunities that align with your interests and career goals. <br /> 
            <p></p>
            We believe in empowering students to discover career paths, develop valuable skills, and build their professional networks early on. Join us and be part of a growing community of students taking the first step toward their bright future!</p>
            <p>We’re passionate about helping students like you create connections and build a professional network that will open doors to future opportunities. Employers on our platform are committed to 
              supporting student growth and understand the unique perspectives and energy students bring to the workplace.</p>
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
          <p className="faq-section-description">If you need assistance, please refer to our Frequently Asked Questions (FAQ)s
            ection for detailed information and answers to common inquiries.
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

export default StudentLandingPage
