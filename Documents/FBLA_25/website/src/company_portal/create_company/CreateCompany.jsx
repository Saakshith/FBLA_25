import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../../firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CreateCompany.css';
import CompanyNavbar from '../company_navbar/CompanyNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../loading_spinner/LoadingSpinner';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    websiteUrl: '',
    about: ''
  });

  // Logo states
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Company images states
  const [companyImages, setCompanyImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setLogoFile(file);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (companyImages.length + files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload image files only');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Each file should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setCompanyImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setCompanyImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth.currentUser) {
      alert('You must be logged in to create a company');
      navigate('/signin');
      return;
    }

    try {
      let logoUrl = '';
      if (logoFile) {
        const logoRef = ref(storage, `company-logos/${auth.currentUser.uid}/${Date.now()}-${logoFile.name}`);
        await uploadBytes(logoRef, logoFile);
        logoUrl = await getDownloadURL(logoRef);
      }

      // Upload company images
      const imageUrls = [];
      for (const image of companyImages) {
        const imageRef = ref(storage, `company-images/${auth.currentUser.uid}/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Create user reference
      const userRef = doc(db, 'Users', auth.currentUser.uid);

      // Create company document
      const companyData = {
        ...formData,
        logoUrl,
        images: imageUrls,
        createdBy: userRef,
        createdAt: new Date(),
        teamMembers: [userRef]
      };

      const docRef = await addDoc(collection(db, 'Companies'), companyData);
      
      // Update user's companies array
      await updateDoc(userRef, {
        companyIds: arrayUnion(docRef.id)
      });

      navigate(`/companyportal/${docRef.id}`);
    } catch (error) {
      console.error('Error creating company:', error);
      alert('Error creating company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='create-company'>
      <CompanyNavbar />
      <div className='create-company-main'>
        <div className="create-company-title-container">
          <h1 className="create-company-title">Create a new Company</h1>
        </div>
        <div className="create-company-form-container">
          <form className="create-company-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-left">
                <div className="form-section">
                  <h2>Basic Information</h2>
                  <div className="create-company-form-row">
                    <label>Company Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Enter company name"
                      value={formData.name}
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
                    <label>Website URL</label>
                    <input
                      type="url"
                      name="websiteUrl"
                      placeholder="https://www.example.com"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      pattern="https?://.*"
                      title="Please include http:// or https://"
                    />
                  </div>
                  <div className="create-company-form-row">
                    <label>Location</label>
                    <input
                      required
                      type="text"
                      name="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h2>Company Description</h2>
                  <div className="create-company-form-row">
                    <label>About</label>
                    <textarea
                      required
                      name="about"
                      placeholder="Tell us about your company..."
                      value={formData.about}
                      onChange={handleChange}
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <div className="form-right">
                <div className="form-section">
                  <h2>Company Logo</h2>
                  <div className="logo-upload-container">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleLogoSelect}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="logo-upload" className="logo-upload-area">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="logo-preview" />
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCloudUpload} className="upload-icon" />
                          <p>Upload company logo (50x50px)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Company Images</h2>
                  <div className="images-upload-container">
                    <input
                      type="file"
                      id="images-upload"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="images-upload" className="images-upload-area">
                      <FontAwesomeIcon icon={faCloudUpload} className="upload-icon" />
                      <p>Upload company images (max 6)</p>
                    </label>
                    <div className="image-previews">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="image-preview-container">
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="create-company-button" 
              type="submit"
            >
              Create Company
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCompany;