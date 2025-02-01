import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../navbar_home/NavbarHome';
import Footer from '../footer_home/Footer';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    location: '',
    description: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    logo: null
  });

  // Fetch company data when component mounts
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchCompanyData = async () => {
      try {
        // const response = await fetch('/api/company-profile');
        // const data = await response.json();
        // setCompanyData(data);
        
        // Temporary mock data
        setCompanyData({
          companyName: "Sample Company",
          industry: "Retail",
          location: "Naperville, IL",
          description: "A leading retail company in the Naperville area.",
          website: "www.samplecompany.com",
          contactEmail: "contact@samplecompany.com",
          contactPhone: "(555) 123-4567",
          logo: null
        });
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyData(prev => ({
        ...prev,
        logo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/company-profile', {
      //   method: 'PUT',
      //   body: JSON.stringify(companyData),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      console.log('Company profile updated:', companyData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your company profile? This action cannot be undone.')) {
      try {
        // TODO: Replace with actual API call
        // await fetch('/api/company-profile', {
        //   method: 'DELETE'
        // });
        
        console.log('Company profile deleted');
        navigate('/');
      } catch (error) {
        console.error('Error deleting company profile:', error);
      }
    }
  };

  return (
    <div className="company-profile">
      <NavbarHome />
      
      <div className="company-profile-container">
        <h1>Company Profile</h1>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={companyData.companyName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Industry</label>
            <input
              type="text"
              name="industry"
              value={companyData.industry}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={companyData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={companyData.website}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={companyData.contactEmail}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={companyData.contactPhone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="form-group">
              <label>Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          )}

          <div className="button-group">
            {!isEditing ? (
              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyProfile; 