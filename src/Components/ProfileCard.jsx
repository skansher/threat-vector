import React, { useState } from "react";
import "../CSS/profilecard.css";
import '../CSS/profile.css';

const ProfileCard = ({profile, index}) => {
    // Determine color class based on index
    const colorClass = `color-${index % 3}`;

    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...imageUrls]);
    };

    // Helper function to check if a field should be displayed
    const hasValue = (value) => {
        return value && value.trim() !== "" && value !== "N/A";
    };

    return (
        <div className={`threat-card ${colorClass}`}>

            {/* Title */}
            <div className="card-content">
            <h2 className="card-title">{profile.alias || 'UNKNOWN THREAT ACTOR'}</h2>

            {/* Divider */}
            <div className="divider"></div>

            {/* Key Info */}
            <div className="card-fields">
                {hasValue(profile["Country of Origin"]) && (
                    <div className="field">
                        <label>Country Of Origin:</label>
                        <span>{profile["Country of Origin"]}</span>
                    </div>
                )}
                
                {hasValue(profile.TTPs) && (
                    <div className="field">
                        <label>TTPs:</label>
                        <span>{profile.TTPs}</span>
                    </div>
                )}
                
                {hasValue(profile["Last dated attack"]) && (
                    <div className="field">
                        <label>Last dated attack:</label>
                        <span>{profile["Last dated attack"]}</span>
                    </div>
                )}
                
                {hasValue(profile.Industries) && (
                    <div className="field">
                        <label>Industries:</label>
                        <span>{profile.Industries}</span>
                    </div>
                )}
                
                {hasValue(profile["Mitre Framework ID/GID"]) && (
                    <div className="field">
                        <label>Mitre Framework ID/GID:</label>
                        <span>{profile["Mitre Framework ID/GID"]}</span>
                    </div>
                )}
                
                {hasValue(profile.CVE) && (
                    <div className="field">
                        <label>CVE:</label>
                        <span>{profile.CVE}</span>
                    </div>
                )}
                
                {hasValue(profile.Campaign) && (
                    <div className="field">
                        <label>Campaign:</label>
                        <span>{profile.Campaign}</span>
                    </div>
                )}
                
                {hasValue(profile.Description) && (
                    <div className="field">
                        <label>Description:</label>
                        <span>{profile.Description}</span>
                    </div>
                )}
                
                {hasValue(profile.Motive) && (
                    <div className="field">
                        <label>Motive:</label>
                        <span>{profile.Motive}</span>
                    </div>
                )}
                
                {hasValue(profile["Targeted country"]) && (
                    <div className="field">
                        <label>Targeted countries:</label>
                        <span>{profile["Targeted country"]}</span>
                    </div>
                )}
                
                {hasValue(profile["First seen"]) && (
                    <div className="field">
                        <label>First seen:</label>
                        <span>{profile["First seen"]}</span>
                    </div>
                )}
                
                {hasValue(profile.URL) && (
                    <div className="field">
                        <label>Resource:</label>
                        <span>{profile.URL}</span>
                    </div>
                )}
            </div>
            </div>

            {/* Bottom Section */}
            <div className="bottom-section">
            <div className="attachments" onClick={() => setIsOpen(!isOpen)}>
                <span>Documents/Attachments Area</span>
                <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
            </div>

            {/* Expandable Upload Box */}
            <div className={`upload-box ${isOpen ? "open" : ""}`}>
                <textarea placeholder="Add notes, links, etc."></textarea>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="file-input"
                    id="fileUpload"
                />
                <label htmlFor="fileUpload" className="upload-btn">Upload Images</label>
                <div className="image-preview">
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`upload-${index}`} />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProfileCard;