import React, { useState, useEffect } from 'react';
import infiltratorData from '../data/infiltrator_profiles.json';
import Header from "./Header.jsx";
import Card from "./ITCard.jsx";
import '../CSS/profile.css';
import '../CSS/profilecard.css';

const Infiltrators = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const profilesArray = Object.entries(infiltratorData).map(([key, value]) => ({
      profileKey: key,
      ...value[0],
    }))
    .filter(profile => profile.alias !== "Parse Error"); 
    setProfiles(profilesArray);
     }, []);

  return (
    <div>
      <Header />
      <div className="page-container">
        <h1>IT Infiltrators</h1>

        <div className="card-container">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <Card key={index} profile={profile} index={index} />
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