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
    country: "",
  });
  const [industryOptions, setIndustryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const profilesArray = Object.entries(aptProfilesData).map(([key, value]) => ({
      profileKey: key,
      ...value[0],
    }));

    setProfiles(profilesArray);
    setFilteredProfiles(profilesArray);

    const industries = Array.from(
      new Set(profilesArray.flatMap(p => 
        p.Industries ? p.Industries.split(',').map(i => i.trim()) : []
      ))
    ).sort();

    const countries = Array.from(
      new Set(profilesArray.flatMap(p => 
        p["Targeted country"] ? p["Targeted country"].split(',').map(c => c.trim()) : []
      ))
    ).sort();

    setIndustryOptions(industries);
    setCountryOptions(countries);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!profiles.length) return;

    const { industry, country } = filters;

    const sorted = [...profiles].sort((a, b) => {
      const aMatches =
        (!industry || (a.Industries?.toLowerCase().includes(industry.toLowerCase()))) &&
        (!country || (a["Targeted country"]?.toLowerCase().includes(country.toLowerCase())));
      const bMatches =
        (!industry || (b.Industries?.toLowerCase().includes(industry.toLowerCase()))) &&
        (!country || (b["Targeted country"]?.toLowerCase().includes(country.toLowerCase())));

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
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {countryOptions.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards - REMOVED INLINE STYLES */}
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