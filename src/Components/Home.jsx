import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/home.css';
import Header from './Header.jsx';
import aptProfileData from '../data/apt_profiles.json';
import newsData from '../data/news.json';
import infiltratorData from '../data/infiltrator_profiles.json';

const Home = () => {
  const [stats, setStats] = useState({
    aptCount: 0,
    infiltratorCount: 0,
    newsCount: 0
  });
  const [recentNews, setRecentNews] = useState([]);
  const [aptsByCountry, setAptsByCountry] = useState({});

  useEffect(() => {
    // Process APT profiles
    const aptProfiles = Object.values(aptProfileData).flat();
    const aptCountries = aptProfiles.reduce((acc, apt) => {
      const country = apt['Country of Origin'];
      if (country) {
        acc[country] = (acc[country] || 0) + 1;
      }
      return acc;
    }, {});

    // Process infiltrators
    const infiltrators = Object.values(infiltratorData).flat();

    // Process news - filter for articles from the past month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const allNews = Object.values(newsData).flat();
    const filteredNews = allNews.filter(article => {
      const publishedDate = new Date(article['Published Date']);
      return publishedDate >= oneMonthAgo;
    }).slice(0, 3); // Show only the 3 most recent

    setStats({
      aptCount: aptProfiles.length,
      infiltratorCount: infiltrators.length,
      newsCount: filteredNews.length
    });

    setRecentNews(filteredNews);
    setAptsByCountry(aptCountries);
  }, []);

  return (
    <div className="page-container">
        <Header />
        {/* Welcome Banner */}
      <div className="welcome-banner mb-4">
        <h1>Hello Minion</h1>
        <p className="welcome-subtitle">Threat Intelligence Command Center</p>
      </div>
      
      {/* Navigation Cards */}
    <div className="row g-4">
        <div className="col-md-3">
          <Link to="/news" className="text-decoration-none">
            <div className="nav-card nav-card-orange">
              <div className="nav-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8"/>
                  <path d="M15 18h-5"/>
                  <path d="M10 6h8v4h-8V6Z"/>
                </svg>
              </div>
              <h5 className="nav-card-title">News Feed</h5>
              <p className="nav-card-text">Latest threat intelligence updates</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/profile" className="text-decoration-none">
            <div className="nav-card nav-card-red">
              <div className="nav-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h5 className="nav-card-title">APT Profiles</h5>
              <p className="nav-card-text">Advanced persistent threat database</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/infiltrators" className="text-decoration-none">
            <div className="nav-card nav-card-teal">
              <div className="nav-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </div>
              <h5 className="nav-card-title">Infiltrators</h5>
              <p className="nav-card-text">IT infiltrator management system</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/createProfile" className="text-decoration-none">
            <div className="nav-card nav-card-purple">
              <div className="nav-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <h5 className="nav-card-title">Data Entry</h5>
              <p className="nav-card-text">Submit new intelligence data</p>
            </div>
          </Link>
        </div>
      </div>

     {/* Stats Cards */}
      <div className="stats-section">
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="stat-card stat-card-red">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">APT PROFILES</h6>
                <h2 className="stat-value">{stats.aptCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-teal">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">IT INFILTRATORS</h6>
                <h2 className="stat-value">{stats.infiltratorCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-orange">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8"/>
                  <path d="M15 18h-5"/>
                  <path d="M10 6h8v4h-8V6Z"/>
                </svg>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">MAJORY CYBER ATTACK NEWS (PAST MONTH)</h6>
                <h2 className="stat-value">{stats.newsCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-purple">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">TOTAL PROFILES TRACKED</h6>
                <h2 className="stat-value">{stats.aptCount + stats.infiltratorCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="row g-3 pb-5">

        {/* APT Origin Map */}
        <div className="col-lg-8">
          <div className="content-card">
            <div className="card-header-custom">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 52 52" fill="none" className="me-2">
                <path d="M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M26,7C26,7,26,7,26,7C26,7,26,7,26,7 C26,7,26,7,26,7z M28,7.1c-0.1,0-0.1,0-0.2,0C27.9,7.1,28,7.1,28,7.1z M26,45C15.5,45,7,36.5,7,26c0-1,0.1-2.1,0.3-3 c1.3,0.2,2.9,0.7,3.7,1.5c1.7,1.8,3.6,3.9,5.4,4.3c0,0-0.2,0.1-0.4,0.4c-0.2,0.3-0.4,0.9-0.4,1.9c0,4.7,4.4,1.9,4.4,6.6 c0,4.7,5.3,6.6,5.3,2.8s3.5-5.6,3.5-8.5s-2.7-2.8-4.4-3.8c-1.8-0.9-2.7-2.4-6.1-1.9c-1.8-1.7-2.8-3.1-2-4.7c0.9-1.7,4.6-2,4.6-4.6 s-2.5-3.1-4.3-3.1c-0.8,0-2.5-0.6-3.9-1.3c1.7-1.7,3.8-3.1,6-4.1c1.6,0.7,4.3,1.8,6.6,1.8c2.7,0,4.1-1.9,3.7-3.1 c4.5,0.7,8.5,3,11.4,6.2c-1.5,0.9-3.5,1.9-7,1.9c-4.6,0-4.6,4.7-1.9,5.6c2.8,0.9,5.6-1.8,6.5,0c0.9,1.8-6.5,1.8-4.6,6.4 c1.9,4.6,3.7-0.1,5.6,4.5c1.9,4.6,5.6-0.7,2.8-4.3c-1.2-1.6-0.9-6.5,1.9-6.5h0.9c0.4,1.6,0.7,3.3,0.7,5C45,36.5,36.5,45,26,45z" fill="currentColor"/>
            </svg>
              <h5 className="mb-0">APT Groups by Country</h5>
            </div>
            <div className="card-body-custom">
              <div className="mb-4">
                {Object.entries(aptsByCountry).sort((a, b) => b[1] - a[1]).map(([country, count]) => (
                  <div key={country} className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="country-label">{country}</span>
                      <span className="count-badge">{count} group{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="custom-progress">
                      <div 
                        className="custom-progress-bar" 
                        style={{ width: `${(count / stats.aptCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="col-lg-4">
          <div className="content-card">
            <div className="card-header-custom">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                <path d="M18 14h-8"/>
                <path d="M15 18h-5"/>
                <path d="M10 6h8v4h-8V6Z"/>
              </svg>
              <h5 className="mb-0">Recent Intelligence</h5>
            </div>
            <div className="card-body-custom">
              <div className="news-list">
                {recentNews.length > 0 ? (
                  recentNews.map((news, index) => (
                    <Link to={news['URL']} className="text-decoration-none">
                        <div key={index} className="news-item">
                        <h6 className="news-title">{news['Article Name']}</h6>
                        <small className="news-date">{news['Published Date']}</small>
                        <p className="news-channel">{news['News Channel']}</p>
                        </div>
                    </Link>
                  ))
                ) : (
                  <div className="news-item">
                    <p className="text-muted">No news articles from the past month</p>
                  </div>
                )}
              </div>
              <Link to="/news" className="text-decoration-none">
                <button className="btn-custom btn-custom-primary mt-3 w-100">
                  View All Intelligence
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  Home;