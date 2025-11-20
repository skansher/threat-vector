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
  if (typeof value === 'string') {
    return value.trim() !== '' && value !== 'N/A';
  }

  if (Array.isArray(value)) {
    return value.some((v) => typeof v === 'string' && v.trim() !== '' && v !== 'N/A');
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some(hasValue);
  }

  return false;
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
  const normalize = (v) => (typeof v === 'string' ? v.trim() : '');

  const renderLink = (url, idx) => (
    <a
      key={idx}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary text-decoration-none hover-underline"
    >
      {url}
      <i className="bi bi-box-arrow-up-right ms-1" style={{ fontSize: '0.8rem' }}></i>
    </a>
  );

  if (typeof value === 'string') {
    const urls = value.split(',').map(normalize).filter(isURL);
    if (key.toLowerCase() === 'url' || urls.length > 0) {
      return (
        <div className="d-flex flex-column gap-1">
          {urls.map((url, idx) => renderLink(url, idx))}
        </div>
      );
    }
    return value;
  }

  if (Array.isArray(value)) {
    return (
      <ul className="ps-3 mb-0">
        {value.map((item, idx) => (
          <li key={idx}>{renderFieldValue(key, item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className="ps-3">
        {Object.entries(value).map(([subKey, subVal], idx) => (
          <div key={idx}>
            <strong>{subKey}:</strong> {renderFieldValue(subKey, subVal)}
          </div>
        ))}
      </div>
    );
  }

  return String(value);
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
          {profile.primary_name || 'UNKNOWN THREAT ACTOR'} - Full Profile
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <div className="row">
          {/* Left Panel: Profile Info */}
          <div className="col-lg-8 col-md-7">
            <div className="profile-info-section">
              {Object.keys(profile).map((key, i) => {
                let displayKey = key;
                
                // 1. Skip the primary_name field
                if (key === 'primary_name' || key === 'profileKey') {
                  return null; 
                } 
                
                // 2. Change 'aliases' field label
                if (key === 'aliases') {
                  displayKey = 'Aliases';
                } else if (key === 'Country of Origin') {
                  displayKey = 'Country of Origin';
                } else if (key === 'Targeted country') {
                  displayKey = 'Targeted Country';
                }
                
                // 3. Render the field
                return hasValue(profile[key]) ? (
                  <div className="row mb-3 profile-field" key={i}>
                    <div className="col-sm-4 fw-bold text-start">{displayKey}:</div>
                    <div className="col-sm-8 text-start text-muted">
                      {renderFieldValue(key, profile[key])}
                    </div>
                  </div>
                ) : null;
              })}
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