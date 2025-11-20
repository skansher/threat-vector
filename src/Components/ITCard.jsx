import React from "react";
import "../CSS/profilecard.css";

const ITCard = ({ profile, index, onCardClick }) => {
  const colorClass = `color-${index % 3}`;

  const hasValue = (value) => {
    return value && typeof value === 'string' && value.trim() !== "";
  };

  return (
    <div 
      className={`threat-card ${colorClass}`} 
      onClick={() => onCardClick(profile, colorClass)}
    >
      <div className="card-body p-3">
        {/* 1. HEADER: Local Alias */}
        <h5 className="card-title m-0 text-center">
          {profile.local_alias || 'UNCLASSIFIED THREAT'}
        </h5>

        <hr className="my-2" />

        <div className="card-info">
          
          {/* 2. Case ID */}
          {hasValue(profile.case_id) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Case ID:</small>
              <small className="text-truncate d-block">{profile.case_id}</small>
            </div>
          )}

          {/* 3. Threat Actor Group */}
          {hasValue(profile.threat_actor_group) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Group:</small>
              <small className="text-truncate d-block">{profile.threat_actor_group}</small>
            </div>
          )}

          {/* 4. Current Status */}
          {hasValue(profile.current_status) && (
            <div className="info-row mb-2">
              <small className="fw-bold d-block">Status:</small>
              <small className="d-block">{profile.current_status}</small> 
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ITCard;