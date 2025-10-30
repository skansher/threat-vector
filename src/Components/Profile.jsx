import React, { useState, useEffect } from 'react';
import aptProfilesData from '../data/apt_profiles.json';
import Header from "./Header.jsx";
import Card from "../Components/ProfileCard.jsx";
import '../CSS/profile.css';
import '../CSS/profilecard.css';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
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

  useEffect(() => {
    const profilesArray = Object.entries(aptProfilesData).map(([key, value]) => ({
      profileKey: key,
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

  return (
    <div>
      <Header />
      <div className="page-container">
        <h1>Threat Profiles</h1>

        {/* Filter Section */}
        <div className="filter-section">
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

        <div className="card-container">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
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

export default Profile;