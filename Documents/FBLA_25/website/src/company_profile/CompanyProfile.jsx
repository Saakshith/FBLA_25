import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import CompanyNavbar from '../company_portal/company_navbar/CompanyNavbar';
import Footer from '../footer_home/Footer';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState({
    companyName: '',
    about: '',
    industry: '',
    locationCity: '',
    locationState: '',
    websiteUrl: '',
    logoUrl: '',
    images: [],
    teamMembers: []
  });

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyRef = doc(db, 'Companies', companyId);
        const companySnap = await getDoc(companyRef);
        
        if (!companySnap.exists()) {
          setError('No company profile found.');
          return;
        }

        const data = companySnap.data();
        // Check if current user is the creator of the company
        if (auth.currentUser?.uid !== data.createdBy) {
          setError('You do not have permission to edit this profile');
          return;
        }

        setCompanyData(data);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching company data:', error);
        setError('Error loading company data');
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [auth, companyId, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const timestamp = Date.now();
        const storageRef = ref(storage, `company-logos/${companyId}/${timestamp}-${file.name}`);
        await uploadBytes(storageRef, file);
        const logoUrl = await getDownloadURL(storageRef);
        
        setCompanyData(prev => ({
          ...prev,
          logoUrl
        }));
      } catch (error) {
        console.error('Error uploading logo:', error);
        alert('Failed to upload logo');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const companyRef = doc(db, 'Companies', companyId);
      await updateDoc(companyRef, {
        companyName: companyData.companyName,
        about: companyData.about,
        industry: companyData.industry,
        locationCity: companyData.locationCity,
        locationState: companyData.locationState,
        websiteUrl: companyData.websiteUrl,
        logoUrl: companyData.logoUrl,
      });
      
      setIsEditing(false);
      alert('Company profile updated successfully');
    } catch (error) {
      console.error('Error updating company profile:', error);
      alert('Failed to update company profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your company profile? This action cannot be undone.')) {
      try {
        // Delete logo if exists
        if (companyData.logoUrl) {
          const logoRef = ref(storage, companyData.logoUrl);
          await deleteObject(logoRef).catch(console.error);
        }

        // Delete all company images
        if (companyData.images && companyData.images.length > 0) {
          for (const imageUrl of companyData.images) {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef).catch(console.error);
          }
        }

        // Delete company document
        await deleteDoc(doc(db, 'Companies', companyId));
        
        alert('Company profile deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting company profile:', error);
        alert('Failed to delete company profile');
      }
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="company-profile">
      <CompanyNavbar />
      
      <div className="company-profile-container">
        <h1>Company Profile</h1>
        
        {companyData.logoUrl && (
          <div className="logo-container">
            <img src={companyData.logoUrl} alt="Company logo" className="company-logo" />
          </div>
        )}

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
            <label>About</label>
            <textarea
              name="about"
              value={companyData.about}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="6"
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
            <label>City</label>
            <input
              type="text"
              name="locationCity"
              value={companyData.locationCity}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="locationState"
              value={companyData.locationState}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Website URL</label>
            <input
              type="url"
              name="websiteUrl"
              value={companyData.websiteUrl}
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

        {/* Display company images if they exist */}
        {companyData.images && companyData.images.length > 0 && (
          <div className="company-images">
            <h2>Company Images</h2>
            <div className="images-grid">
              {companyData.images.map((imageUrl, index) => (
                <img 
                  key={index} 
                  src={imageUrl} 
                  alt={`Company image ${index + 1}`} 
                  className="company-image"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CompanyProfile; 