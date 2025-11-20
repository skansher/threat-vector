import React from "react";
import "../CSS/profilecard.css";

const ProfileCard = ({ profile, index, onCardClick }) => {
  const colorClass = `color-${index % 3}`;

  const hasValue = (value) => {
    return value && value.trim() !== "" && value !== "N/A";
  };

  return (
    <div 
      className={`threat-card ${colorClass}`} 
      onClick={() => onCardClick(profile, colorClass)}
    >
      <div className="card-body p-3">
        <h5 className="card-title m-0 text-center">
          {profile.alias || 'UNKNOWN THREAT ACTOR'}
        </h5>

        <hr className="my-2" />

        <div className="card-info">
            {hasValue(profile["Industries"]) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Industries:</small>
              <small className="text-truncate d-block">{profile["Industries"]}</small>
            </div>
          )}

          {hasValue(profile["Targeted country"]) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Target:</small>
              <small className="text-truncate d-block">{profile["Targeted country"]}</small>
            </div>
          )}

          {hasValue(profile["Country of Origin"]) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Origin:</small>
              <small className="text-truncate d-block">{profile["Country of Origin"]}</small>
            </div>
          )}
          
          {hasValue(profile.Campaign) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Campaign:</small>
              <small className="text-truncate d-block">{profile.Campaign}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;