import React, { useState, forwardRef } from "react"; // IMPORT forwardRef
import "../CSS/profilecard.css";
import '../CSS/profile.css';

// Component must be wrapped in forwardRef to receive the ref prop
const ITCard = forwardRef(({ profile, index, isExpanded, toggleExpansion }, ref) => {
    // Determine color class based on index
    const colorClass = `color-${index % 3}`;

    // Local state for attachments/notes content
    const [images, setImages] = useState([]);
    const [note, setNote] = useState('');

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...imageUrls]);
    };

    // Helper function to check if a field should be displayed
    const hasValue = (value) => {
        return value && value.trim() !== "" && value !== "N/A";
    };

    // KEY FUNCTION: Stops event from bubbling up to the parent card click handler
    const stopClickPropagation = (e) => {
        e.stopPropagation();
    };
    
    // --- RENDERING EXPANDED VIEW ---
    if (isExpanded) {
        return (
            // Attach the forwarded ref here
            <div className={`threat-card-expanded ${colorClass}`} ref={ref}>
                
                {/* Header: Clickable area to Collapse the card */}
                <div className="expanded-header" onClick={toggleExpansion}>
                    <h2 className="expanded-title">
                        {profile.alias || 'UNKNOWN INFILTRATOR'} - Full Profile
                    </h2>
                </div>
                
                {/* Main Content Area (Info on Left, Attachments on Right) */}
                <div className="expanded-content">

                    {/* Left Side: Full Profile Info */}
                    <div className="expanded-info-panel">
                        <div className="card-fields full-info-list">
                            {/* All fields displayed here */}
                            {Object.keys(profile).map((key, i) => 
                                hasValue(profile[key]) && key !== 'profileKey' && (
                                    <div className="field full-field" key={i}>
                                        <label>{key}:</label>
                                        <span>{profile[key]}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Right Side: Attachments/Notes/Uploads (Click event is blocked here) */}
                    <div className="expanded-sidebar" onClick={stopClickPropagation}>
                        <h3>Notes & Attachments</h3>
                        
                        {/* Notes Area */}
                        <textarea 
                            className="note-area"
                            placeholder="Add notes, links, etc."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            onClick={stopClickPropagation} 
                        ></textarea>

                        {/* File/Image Upload */}
                        <div className="upload-section">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="file-input"
                                id="fileUploadExpanded"
                                onClick={stopClickPropagation}
                            />
                            <label htmlFor="fileUploadExpanded" className="upload-btn">Upload Images</label>
                            <button className="save-note-btn" onClick={stopClickPropagation}>Save Note</button>
                        </div>

                        {/* Image Preview */}
                        <div className="image-preview">
                            {images.map((src, index) => (
                                <img key={index} src={src} alt={`upload-${index}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERING COLLAPSED VIEW ---
    return (
        // Attach the forwarded ref here
        <div 
            className={`threat-card ${colorClass}`} 
            onClick={toggleExpansion} 
            ref={ref} 
        >

            {/* Simplified Content for Small Card */}
            <div className="card-content">
            <h2 className="card-title">{profile.alias || 'UNKNOWN INFILTRATOR'}</h2>

            {/* Divider */}
            <div className="divider"></div>

            {/* Key Info */}
            <div className="card-fields">
                {/* Only display a few key fields for the collapsed view */}
                {hasValue(profile["Country of Origin"]) && (
                    <div className="field">
                        <label>Country Of Origin:</label>
                        <span>{profile["Country of Origin"]}</span>
                    </div>
                )}
                
                {hasValue(profile.Role) && (
                    <div className="field">
                        <label>Role:</label>
                        <span>{profile.Role}</span>
                    </div>
                )}
                
                {hasValue(profile.Status) && (
                    <div className="field">
                        <label>Status:</label>
                        <span>{profile.Status}</span>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}); // Export the forwardRef wrapped component

export default ITCard;