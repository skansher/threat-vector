import React, { useState, useEffect, useRef, useMemo } from 'react';
import infiltratorData from '../data/infiltrator_profiles.json';
import Header from "./Header.jsx";
import Card from "./ITCard.jsx"; // Renamed Card import to ITCard
import '../CSS/profile.css';
import '../CSS/profilecard.css';

const Infiltrators = () => {
  const expandedCardRef = useRef(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const profilesArray = Object.entries(infiltratorData).map(([key, value]) => ({
      profileKey: key, // Use profileKey as the unique identifier
      ...value[0],
    }))
    .filter(profile => profile.alias !== "Parse Error"); 
    setProfiles(profilesArray);
  }, []);

  const toggleExpansion = (profileKey) => {
    setExpandedCardId(profileKey === expandedCardId ? null : profileKey);
  };
  
  // Effect to scroll to the expanded card whenever it opens
  useEffect(() => {
    if (expandedCardId && expandedCardRef.current) {
        expandedCardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
  }, [expandedCardId]);

  // Sort the profiles to put the expanded one first
  const sortedProfilesForDisplay = useMemo(() => {
    return [...profiles].sort((a, b) => {
      if (a.profileKey === expandedCardId) return -1; // expanded card (a) comes first
      if (b.profileKey === expandedCardId) return 1;  // expanded card (b) comes first
      return 0; // maintain original order for collapsed cards
    });
  }, [profiles, expandedCardId]);
  
  const isAnyCardExpanded = expandedCardId !== null;

  return (
    <div>
      <Header />
      <div className="page-container">
        <h1>IT Infiltrators</h1>

        {/* Apply the expanded-layout class to switch from grid to column view */}
        <div className={`card-container ${isAnyCardExpanded ? 'expanded-layout' : ''}`}>
          {sortedProfilesForDisplay.length > 0 ? (
            sortedProfilesForDisplay.map((profile, index) => (
              <Card 
                key={profile.profileKey} 
                profile={profile} 
                index={index} 
                isExpanded={profile.profileKey === expandedCardId}
                toggleExpansion={() => toggleExpansion(profile.profileKey)}
                // CONDITIONAL REF: Attach the ref only to the expanded card
                ref={profile.profileKey === expandedCardId ? expandedCardRef : null}
              />
            ))
          ) : (
            <p>No profiles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infiltrators;