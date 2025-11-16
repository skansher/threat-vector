import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../CSS/profilemodal.css";

const ProfileModal = ({ show, onHide, profile, colorClass }) => {
  const [images, setImages] = useState([]);
  const [note, setNote] = useState('');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls]);
  };

  const hasValue = (value) => {
    return value && value.trim() !== "" && value !== "N/A";
  };

  // Helper function to check if a string is a valid URL
  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // Helper function to render field value (with link if it's a URL)
  const renderFieldValue = (key, value) => {
    // Check if the key is "URL" or if the value looks like a URL
    if (key.toLowerCase() === 'url' || isURL(value)) {
      // Handle multiple URLs separated by commas
      const urls = value.split(',').map(url => url.trim());
      
      if (urls.length > 1) {
        return (
          <div className="d-flex flex-column gap-1">
            {urls.map((url, idx) => (
              <a 
                key={idx}
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-decoration-none hover-underline"
              >
                {url} <i className="bi bi-box-arrow-up-right ms-1" style={{ fontSize: '0.8rem' }}></i>
              </a>
            ))}
          </div>
        );
      }
      
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary text-decoration-none hover-underline"
        >
          {value} <i className="bi bi-box-arrow-up-right ms-1" style={{ fontSize: '0.8rem' }}></i>
        </a>
      );
    }
    
    return value;
  };

  if (!profile) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      centered
      dialogClassName="profile-modal"
    >
      <Modal.Header closeButton className={`modal-header-custom ${colorClass}`}>
        <Modal.Title>
          {profile.alias || 'UNKNOWN THREAT ACTOR'} - Full Profile
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <div className="row">
          {/* Left Panel: Profile Info */}
          <div className="col-lg-8 col-md-7">
            <div className="profile-info-section">
              {Object.keys(profile).map((key, i) => 
                hasValue(profile[key]) && key !== 'profileKey' && (
                  <div className="row mb-3 profile-field" key={i}>
                    <div className="col-sm-4 fw-bold text-start">{key}:</div>
                    <div className="col-sm-8 text-start text-muted">
                      {renderFieldValue(key, profile[key])}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Panel: Notes & Attachments */}
          <div className="col-lg-4 col-md-5">
            <div className="notes-sidebar">
              <h5 className="mb-3 text-danger">Notes & Attachments</h5>
              
              <textarea 
                className="form-control mb-3"
                rows="6"
                placeholder="Add notes, links, etc."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>

              <div className="d-flex gap-2 mb-3 flex-wrap">
                <label htmlFor="fileUpload" className="btn btn-dark btn-sm flex-grow-1">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="d-none"
                  id="fileUpload"
                />
                <button 
                  className="btn btn-danger btn-sm flex-grow-1"
                  onClick={() => console.log('Save note:', note)}
                >
                  Save Note
                </button>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {images.map((src, index) => (
                    <img 
                      key={index} 
                      src={src} 
                      alt={`upload-${index}`}
                      className="img-thumbnail"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;