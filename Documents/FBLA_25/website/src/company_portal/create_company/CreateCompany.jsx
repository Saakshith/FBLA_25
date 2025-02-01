import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import './CreateCompany.css'; // Import the CSS file for styling
import NavbarMain from '../../find_jobs/navbar_main/NavbarMain';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    locationCity: '',
    locationState: '',
    logoUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      alert('You must be logged in to create a company');
      navigate('/signin');
      return;
    }

    try {
      setIsSubmitting(true);

      const companyData = {
        name: formData.companyName,
        industry: formData.industry,
        location: `${formData.locationCity}, ${formData.locationState}`,
        logoUrl: formData.logoUrl,
        teamMembers: [doc(db, 'Users', auth.currentUser.uid)], // Add current user as team member
        createdAt: new Date(),
        createdBy: doc(db, 'Users', auth.currentUser.uid)
      };

      const docRef = await addDoc(collection(db, 'Companies'), companyData);
      console.log('Company created with ID:', docRef.id);
      
      // Navigate to company portal with the new company ID
      navigate(`/companyportal/${docRef.id}`);
    } catch (error) {
      console.error('Error creating company:', error);
      alert('Failed to create company. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='create-company'>
      <NavbarMain />
      <div className='create-company-main'>
        <div className="create-company-title-container">
          <h1 className="create-company-title">Create a new Company</h1>
        </div>
        <div className="create-company-form-container">
          <form className="create-company-form" onSubmit={handleSubmit}>
            <div className="create-company-form-row">
              <label>Company Name</label>
              <input
                required
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="create-company-form-row">
              <label>Industry</label>
              <input
                required
                type="text"
                name="industry"
                placeholder="Enter industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
            <div className="create-company-form-row">
              <label>Location City</label>
              <input
                required
                type="text"
                name="locationCity"
                placeholder="Enter city"
                value={formData.locationCity}
                onChange={handleChange}
              />
            </div>
            <div className="create-company-form-row">
              <label>Location State</label>
              <select
                name="locationState"
                required
                value={formData.locationState}
                onChange={handleChange}
              >
                <option value="">--Select State--</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div className="create-company-form-row">
              <label>Logo URL</label>
              <input
                required
                type="url"
                name="logoUrl"
                placeholder="Enter logo URL"
                value={formData.logoUrl}
                onChange={handleChange}
              />
            </div>
            <button 
              className="create-company-button" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Company'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCompany;