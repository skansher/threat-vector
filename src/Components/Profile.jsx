import React, { useState, useEffect, useRef } from 'react'; // IMPORT useRef
import aptProfilesData from '../data/apt_profiles.json';
import Header from "./Header.jsx";
import Card from "../Components/ProfileCard.jsx";
import '../CSS/profile.css';
import '../CSS/profilecard.css';

const Profile = () => {
  // NEW: Ref to target the expanded card for scrolling
  const expandedCardRef = useRef(null); 
  
  // NEW STATE: Tracks the ID of the currently expanded card (profileKey)
  const [expandedCardId, setExpandedCardId] = useState(null); 
  
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles, ] = useState([]);
  const [filters, setFilters] = useState({
    industry: "",
    countryTarget: "",
    countryOrigin: "",
    ttps: ""
  });
  const [industryOptions, setIndustryOptions] = useState([]);
  const [countryTargetOptions, setcountryTargetOptions] = useState([]);
  const [countryOriginOptions, setcountryOriginOptions] = useState([]);
  const [ttpsOptions, setTTPsOptions] = useState([]);

    const handleResetFilters = () => {
    setFilters({
      industry: "",
      countryTarget: "",
      countryOrigin: "",
      ttps: ""
    });
  };

  // NEW FUNCTION: Toggles the expanded card
  const toggleExpansion = (profileKey) => {
    // If the clicked card is already expanded, collapse it (set to null).
    // Otherwise, expand the clicked card (set to its key).
    setExpandedCardId(profileKey === expandedCardId ? null : profileKey);
  };


  useEffect(() => {
    const profilesArray = Object.entries(aptProfilesData).map(([key, value]) => ({
      profileKey: key, // Use profileKey as the unique identifier
      ...value[0],
    }))
    .filter(profile => profile.alias !== "Parse Error"); 
    setProfiles(profilesArray);
    setFilteredProfiles(profilesArray);


    const industries = Array.from(
      new Set(profilesArray.flatMap(p => 
        p.Industries ? p.Industries.split(',').map(i => i.trim()) : []
      ))
    ).sort();

    const countriesTargeted = Array.from(
      new Set(profilesArray.flatMap(p => 
        p["Targeted country"] ? p["Targeted country"].split(',').map(c => c.trim()) : []
      ))
    ).sort();

    const countryOrigin = Array.from(
      new Set(profilesArray.flatMap(p => 
        p["Country of Origin"] ? p["Country of Origin"].split(',').map(c => c.trim()) : []
      ))
    ).sort();

    const TTPs = Array.from(
      new Set(profilesArray.flatMap(p =>
        p.TTPs ? p.TTPs.split(',').map(t => t.trim()) : []
      ))
    ).sort();

    setIndustryOptions(industries);
    setcountryTargetOptions(countriesTargeted);
    setcountryOriginOptions(countryOrigin);
    setTTPsOptions(TTPs);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!profiles.length) return;

    const { industry, countryTarget, countryOrigin, ttps } = filters;

    const sorted = [...profiles].sort((a, b) => {
      const aMatches =
        (!industry || (a.Industries?.toLowerCase().includes(industry.toLowerCase()))) &&
        (!countryTarget || (a["Targeted country"]?.toLowerCase().includes(countryTarget.toLowerCase()))) &&
        (!countryOrigin || (a["Country origin"]?.toLowerCase().includes(countryOrigin.toLowerCase()))) &&
        (!ttps || (a.TTPs?.toLowerCase().includes(ttps.toLowerCase())));
      const bMatches =
        (!industry || (b.Industries?.toLowerCase().includes(industry.toLowerCase()))) &&
        (!countryTarget || (b["Targeted country"]?.toLowerCase().includes(countryTarget.toLowerCase()))) &&
        (!countryOrigin || (b["Country origin"]?.toLowerCase().includes(countryOrigin.toLowerCase()))) &&
        (!ttps || (b.TTPs?.toLowerCase().includes(ttps.toLowerCase())));

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });

    setFilteredProfiles(sorted);
  }, [filters, profiles]);
  
  const isAnyCardExpanded = expandedCardId !== null;

  // KEY CHANGE: Sort the profiles to put the expanded one first
  const sortedProfilesForDisplay = [...filteredProfiles].sort((a, b) => {
    if (a.profileKey === expandedCardId) return -1; // a comes first (expanded card)
    if (b.profileKey === expandedCardId) return 1;  // b comes first
    return 0; // maintain original order for collapsed cards
  });
  
  // NEW: Effect to scroll to the expanded card whenever it opens
  useEffect(() => {
    if (expandedCardId && expandedCardRef.current) {
        expandedCardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start', // Scroll to align the top of the element with the top of the viewport
        });
    }
  }, [expandedCardId]);


  return (
    <div class="page-container">
      <Header />
        <div className="alt-banner mt-5 mb-4, ms-4 me-4">
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
                  {industryOptions.map((ind, idx) => (
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
                  {countryTargetOptions.map((c, idx) => (
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
                  {countryOriginOptions.map((ind, idx) => (
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
                  {ttpsOptions.map((ind, idx) => (
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

        {/* APPLYING THE EXPANDED LAYOUT CLASS */}
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
  );
};

export default Profile;