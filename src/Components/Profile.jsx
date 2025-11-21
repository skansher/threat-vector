import React, { useState, useEffect, useMemo } from 'react';
import aptProfilesData from '../data/normalized_profiles.json';
import Header from "./Header.jsx";
import Card from "../Components/ProfileCard.jsx";
import ProfileModal from "../Components/ProfileModal.jsx";
import '../CSS/profile.css';
import '../CSS/profilecard.css';

// Utility function to normalize values to array of strings
// Defined outside component to avoid recreation on every render
const toArray = (value) => {
  if (!value) return [];
  
  if (Array.isArray(value)) {
    return value
      .flat()
      .filter(v => v != null && v !== '')
      .map(v => String(v).trim())
      .filter(v => v !== '');
  }
  
  if (typeof value === 'string') {
    return value
      .split(',')
      .map(v => v.trim())
      .filter(v => v !== '');
  }
  
  return [String(value).trim()].filter(v => v !== '');
};

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    industry: "",
    countryTarget: "",
    countryOrigin: "",
    ttps: ""
  });
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedColorClass, setSelectedColorClass] = useState('');

  const handleResetFilters = () => {
    setFilters({
      industry: "",
      countryTarget: "",
      countryOrigin: "",
      ttps: ""
    });
  };

  const handleCardClick = (profile, colorClass) => {
    setSelectedProfile(profile);
    setSelectedColorClass(colorClass);
    setShowModal(true);
  };

  // Load profiles once on mount
  useEffect(() => {
    const profilesArray = Object.entries(aptProfilesData)
      .map(([key, value]) => ({
        profileKey: key,
        ...value[0],
      }))
      .filter(profile => profile.alias !== "Parse Error"); 
    
    setProfiles(profilesArray);
  }, []);

  // Extract filter options using useMemo for performance
  const filterOptions = useMemo(() => {
    if (profiles.length === 0) {
      return {
        industries: [],
        countriesTargeted: [],
        countriesOrigin: [],
        ttps: []
      };
    }

    const industries = Array.from(
      new Set(profiles.flatMap(p => toArray(p.Industries)))
    ).sort();

    const countriesTargeted = Array.from(
      new Set(profiles.flatMap(p => toArray(p["Targeted country"])))
    ).sort();

    const countriesOrigin = Array.from(
      new Set(profiles.flatMap(p => toArray(p["Country of Origin"])))
    ).sort();

    const ttps = Array.from(
      new Set(profiles.flatMap(p => toArray(p.TTPs)))
    ).sort();

    return {
      industries,
      countriesTargeted,
      countriesOrigin,
      ttps
    };
  }, [profiles]);

  // Filter profiles based on selected filters
  const filteredProfiles = useMemo(() => {
    if (profiles.length === 0) return [];

    const { industry, countryTarget, countryOrigin, ttps } = filters;
    
    // If no filters applied, return all profiles
    if (!industry && !countryTarget && !countryOrigin && !ttps) {
      return profiles;
    }

    return profiles.filter(profile => {
      const industries = toArray(profile.Industries).map(i => i.toLowerCase());
      const countries = toArray(profile["Targeted country"]).map(c => c.toLowerCase());
      const origins = toArray(profile["Country of Origin"]).map(o => o.toLowerCase());
      const profileTtps = toArray(profile.TTPs).map(t => t.toLowerCase());

      const matchesIndustry = !industry || 
        industries.some(i => i.includes(industry.toLowerCase()));
      
      const matchesCountryTarget = !countryTarget || 
        countries.some(c => c.includes(countryTarget.toLowerCase()));
      
      const matchesCountryOrigin = !countryOrigin || 
        origins.some(o => o.includes(countryOrigin.toLowerCase()));
      
      const matchesTtps = !ttps || 
        profileTtps.some(t => t.includes(ttps.toLowerCase()));

      return matchesIndustry && matchesCountryTarget && matchesCountryOrigin && matchesTtps;
    });
  }, [profiles, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <Header />
      <div className="alt-banner mt-5 mb-4 ms-4 me-4">
        <h1>APT Profiles</h1>
        <p className="welcome-subtitle">Aggregated list of Advanced Persistent Threats.</p>
        <br/>
        
        {/* Filter Section */}
        <div className="filters-container d-flex justify-content-center flex-wrap gap-3 mt-4">
          <div className="filter">
            <label htmlFor="industry">Industry:</label>
            <select
              id="industry"
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {filterOptions.industries.map((ind, idx) => (
                <option key={idx} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <label htmlFor="country">Targeted Country:</label>
            <select
              id="country"
              name="countryTarget"
              value={filters.countryTarget}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {filterOptions.countriesTargeted.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="filter">
            <label htmlFor="origin">Country Origin:</label>
            <select
              id="origin"
              name="countryOrigin"
              value={filters.countryOrigin}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {filterOptions.countriesOrigin.map((ind, idx) => (
                <option key={idx} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <label htmlFor="ttps">TTPs:</label>
            <select
              id="ttps"
              name="ttps"
              value={filters.ttps}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {filterOptions.ttps.map((ind, idx) => (
                <option key={idx} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <label>&nbsp;</label>
            <button className="reset-button" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bootstrap Grid for Cards */}
      <div className="container-fluid px-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <div className="col" key={profile.profileKey}>
                <Card 
                  profile={profile} 
                  index={index}
                  onCardClick={handleCardClick}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No profiles found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ProfileModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        profile={selectedProfile}
        colorClass={selectedColorClass}
      />
    </div>
  );
};

export default Profile;