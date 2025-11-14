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
        <p className="welcome-subtitle">Malware Intelligence Network for Investigation & Operational Navigation</p>
      </div>
      
      {/* Navigation Cards */}
    <div className="row g-4">
        <div className="col-md-3">
          <Link to="/news" className="text-decoration-none">
            <div className="nav-card nav-card-teal">
              <div className="nav-card-icon">
                <i className="far fa-newspaper fa-icon"></i>
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
                <i className="fas fa-bullseye fa-icon"></i>
              </div>
              <h5 className="nav-card-title">APT Profiles</h5>
              <p className="nav-card-text">Advanced persistent threat database</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/infiltrators" className="text-decoration-none">
            <div className="nav-card nav-card-orange">
              <div className="nav-card-icon">
                <i className="fas fa-users fa-icon"></i>
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
                <i class="far fa-file-alt fa-icon"></i>
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
            <div className="stat-card stat-card-teal">
              <div className="stat-icon">
                <i className="far fa-newspaper fa-icon-md mx-2"></i>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">MAJORY CYBER ATTACK NEWS (PAST MONTH)</h6>
                <h2 className="stat-value">{stats.newsCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-red">
              <div className="stat-icon">
                <i className="fas fa-bullseye fa-icon-md mx-2"></i>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">APT PROFILES</h6>
                <h2 className="stat-value">{stats.aptCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-orange">
              <div className="stat-icon">
                 <i className="fas fa-users fa-icon-md mx-2"></i>
              </div>
              <div className="stat-content">
                <h6 className="stat-label">IT INFILTRATORS</h6>
                <h2 className="stat-value">{stats.infiltratorCount}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stat-card stat-card-purple">
              <div className="stat-icon">
                <i class="fas fa-id-card fa-icon-md mx-2"></i>
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
            <i className="fas fa-globe fa-icon-sm mx-2"></i>
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
              <i className="far fa-newspaper fa-icon-sm mx-2"></i>
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