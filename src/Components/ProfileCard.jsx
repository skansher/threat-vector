import React, { useState } from "react";
import "../CSS/profilecard.css";
import '../CSS/profile.css';
//import actorIcon from "../assets/actor-icon.png"; // Ensure correct path

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

    return (
        <div className={`threat-card ${colorClass}`}>
            {/* Top Icon */}
            {/* <img src={actorIcon} alt="Threat Actor Icon" className="actor-icon" /> */}

            {/* Title */}
            <h2 className="card-title">{profile.alias || 'UNKNOWN THREAT ACTOR'}</h2>

            {/* Divider */}
            <div className="divider"></div>

            {/* Key Info */}
            <div className="card-fields">
                <div className="field">
                    <label>Country Of Origin:</label>
                    <span>{profile["Country of Origin"] || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>TTPs:</label>
                    <span>{profile.TTPs || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Last dated attack:</label>
                    <span>{profile["Last dated attack"] || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Industries:</label>
                    <span>{profile.Industries || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Mitre Framework ID/GID:</label>
                    <span>{profile["Mitre Framework ID/GID"] || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>CVE:</label>
                    <span>{profile.CVE || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Campaign:</label>
                    <span>{profile.Campaign || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Description:</label>
                    <span>{profile.Description || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Motive:</label>
                    <span>{profile.Motive || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Targeted countries:</label>
                    <span>{profile["Targeted country"] || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>First seen:</label>
                    <span>{profile["First seen"] || 'N/A'}</span>
                </div>
                <div className="field">
                    <label>Resource:</label>
                    <span>{profile["URL"] || 'N/A'}</span>  
                </div>
            </div>

            {/* Bottom Section */}
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
    );
};

export default ProfileCard;