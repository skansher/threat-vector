import React, { useState } from "react";
import Header from "./Header.jsx";
import "../CSS/form.css";

const CreateProfile = () => {
  const [aptForm, setAptForm] = useState({
    alias: "",
    countryOfOrigin: "",
    targetedCountry: "",
    campaign: "",
    description: "",
    ttps: "",
    lastDatedAttack: "",
    industries: "",
    mitreId: "",
    cve: "",
    motive: "",
    firstSeen: "",
    url: ""
  });

  const [infiltratorForm, setInfiltratorForm] = useState({
    commonNames: "",
    phoneNumbers: "",
    emails: "",
    countryOfOrigin: "",
    targetedCountry: "",
    affiliatedOrganization: "",
    knownAliases: "",
    socialMediaHandles: "",
    lastKnownLocation: "",
    operationalHistory: "",
    skillset: "",
    riskLevel: "Medium"
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleAptChange = (e) => {
    setAptForm({ ...aptForm, [e.target.name]: e.target.value });
  };

  const handleInfiltratorChange = (e) => {
    setInfiltratorForm({ ...infiltratorForm, [e.target.name]: e.target.value });
  };

  const handleAptSubmit = async () => {
    if (!aptForm.alias || !aptForm.countryOfOrigin || !aptForm.targetedCountry || 
        !aptForm.campaign || !aptForm.description) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    const newProfile = {
      alias: aptForm.alias,
      "Country of Origin": aptForm.countryOfOrigin,
      "TTPs": aptForm.ttps,
      "Last dated attack": aptForm.lastDatedAttack,
      "Industries": aptForm.industries,
      "Mitre Framework ID/GID": aptForm.mitreId,
      "CVE": aptForm.cve,
      "Campaign": aptForm.campaign,
      "Description": aptForm.description,
      "Motive": aptForm.motive,
      "Targeted country": aptForm.targetedCountry,
      "First seen": aptForm.firstSeen,
      "URL": aptForm.url
    };

    try {
      const response = await fetch('/api/apt-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile)
      });

      if (!response.ok) {
        throw new Error('Failed to save APT profile');
      }

      const data = await response.json();
      console.log("APT Profile saved:", data);
      
      setMessage({ 
        text: "APT Profile created successfully!", 
        type: "success" 
      });
      
      setAptForm({
        alias: "",
        countryOfOrigin: "",
        targetedCountry: "",
        campaign: "",
        description: "",
        ttps: "",
        lastDatedAttack: "",
        industries: "",
        mitreId: "",
        cve: "",
        motive: "",
        firstSeen: "",
        url: ""
      });
    } catch (error) {
      console.error("Error saving APT profile:", error);
      setMessage({ 
        text: "Failed to save APT profile. Please try again.", 
        type: "error" 
      });
    }
  };

  const handleInfiltratorSubmit = async () => {
    if (!infiltratorForm.commonNames || !infiltratorForm.countryOfOrigin) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    const newInfiltrator = {
      "Common Names": infiltratorForm.commonNames,
      "Phone Numbers": infiltratorForm.phoneNumbers,
      "Emails": infiltratorForm.emails,
      "Country of Origin": infiltratorForm.countryOfOrigin,
      "Targeted Country": infiltratorForm.targetedCountry,
      "Affiliated Organization": infiltratorForm.affiliatedOrganization,
      "Known Aliases": infiltratorForm.knownAliases,
      "Social Media Handles": infiltratorForm.socialMediaHandles,
      "Last Known Location": infiltratorForm.lastKnownLocation,
      "Operational History": infiltratorForm.operationalHistory,
      "Skillset": infiltratorForm.skillset,
      "Risk Level": infiltratorForm.riskLevel
    };

    try {
      const response = await fetch('/api/infiltrator-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInfiltrator)
      });

      if (!response.ok) {
        throw new Error('Failed to save Infiltrator profile');
      }

      const data = await response.json();
      console.log("Infiltrator Profile saved:", data);
      
      setMessage({ 
        text: "Infiltrator Profile created successfully!", 
        type: "success" 
      });
      
      setInfiltratorForm({
        commonNames: "",
        phoneNumbers: "",
        emails: "",
        countryOfOrigin: "",
        targetedCountry: "",
        affiliatedOrganization: "",
        knownAliases: "",
        socialMediaHandles: "",
        lastKnownLocation: "",
        operationalHistory: "",
        skillset: "",
        riskLevel: "Medium"
      });
    } catch (error) {
      console.error("Error saving Infiltrator profile:", error);
      setMessage({ 
        text: "Failed to save Infiltrator profile. Please try again.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="page-container">
      <Header />
          <div className="form-banner mt-5 mb-4, ms-4 me-4">
            <h1>Can't find an APT or IT Infiltrator?</h1>
            <p className="welcome-subtitle">Follow the form directions below to add your APT or Infiltrator to your dashboard.</p>
          </div>

          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
              {message.text}
              <button type="button" className="btn-close" onClick={() => setMessage({ text: "", type: "" })} aria-label="Close"></button>
            </div>
          )}

          <div className="row g-4 mt-3 pb-5">
            {/* APT Profile Form */}
            <div className="col-lg-6">
              <div className="card h-100 shadow-sm form-card-apt">
                <div className="card-header text-white apt-header">
                  <h5 className="mb-0">Threat Profile Form</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="flex-grow-1">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Alias Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="alias"
                        value={aptForm.alias}
                        onChange={handleAptChange}
                        placeholder="e.g., APT28, UAC-0063"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Country of Origin <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="countryOfOrigin"
                        value={aptForm.countryOfOrigin}
                        onChange={handleAptChange}
                        placeholder="e.g., Russia"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Targeted Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="targetedCountry"
                        value={aptForm.targetedCountry}
                        onChange={handleAptChange}
                        placeholder="e.g., Kazakhstan"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Campaign <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="campaign"
                        value={aptForm.campaign}
                        onChange={handleAptChange}
                        placeholder="Brief campaign description"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={aptForm.description}
                        onChange={handleAptChange}
                        placeholder="Detailed description of the threat"
                        rows="3"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">TTPs</label>
                      <input
                        type="text"
                        name="ttps"
                        value={aptForm.ttps}
                        onChange={handleAptChange}
                        placeholder="e.g., T1566.001"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Industries</label>
                      <input
                        type="text"
                        name="industries"
                        value={aptForm.industries}
                        onChange={handleAptChange}
                        placeholder="e.g., diplomatic, military"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">MITRE Framework ID/GID</label>
                      <input
                        type="text"
                        name="mitreId"
                        value={aptForm.mitreId}
                        onChange={handleAptChange}
                        placeholder="e.g., G0003"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">CVE</label>
                      <input
                        type="text"
                        name="cve"
                        value={aptForm.cve}
                        onChange={handleAptChange}
                        placeholder="e.g., CVE-2022-38028"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Motive</label>
                      <input
                        type="text"
                        name="motive"
                        value={aptForm.motive}
                        onChange={handleAptChange}
                        placeholder="e.g., cyberespionage"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Reference URL</label>
                      <input
                        type="url"
                        name="url"
                        value={aptForm.url}
                        onChange={handleAptChange}
                        placeholder="https://..."
                        className="form-control"
                      />
                    </div>
                  </div>

                  <button onClick={handleAptSubmit} className="btn btn-apt w-100 mt-3">
                    Submit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Infiltrator Form */}
            <div className="col-lg-6">
              <div className="card h-100 shadow-sm form-card-infiltrator">
                <div className="card-header text-white infiltrator-header">
                  <h5 className="mb-0">Infiltrator Form</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="flex-grow-1">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Common Names <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="commonNames"
                        value={infiltratorForm.commonNames}
                        onChange={handleInfiltratorChange}
                        placeholder="e.g., John Smith, Ivan Petrov"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Country of Origin <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="countryOfOrigin"
                        value={infiltratorForm.countryOfOrigin}
                        onChange={handleInfiltratorChange}
                        placeholder="e.g., Russia"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Phone Numbers</label>
                      <input
                        type="text"
                        name="phoneNumbers"
                        value={infiltratorForm.phoneNumbers}
                        onChange={handleInfiltratorChange}
                        placeholder="Comma-separated phone numbers"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Email Addresses</label>
                      <input
                        type="text"
                        name="emails"
                        value={infiltratorForm.emails}
                        onChange={handleInfiltratorChange}
                        placeholder="Comma-separated emails"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Targeted Country</label>
                      <input
                        type="text"
                        name="targetedCountry"
                        value={infiltratorForm.targetedCountry}
                        onChange={handleInfiltratorChange}
                        placeholder="e.g., United States"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Affiliated Organization</label>
                      <input
                        type="text"
                        name="affiliatedOrganization"
                        value={infiltratorForm.affiliatedOrganization}
                        onChange={handleInfiltratorChange}
                        placeholder="e.g., APT28, Company XYZ"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Known Aliases</label>
                      <input
                        type="text"
                        name="knownAliases"
                        value={infiltratorForm.knownAliases}
                        onChange={handleInfiltratorChange}
                        placeholder="Other names used"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Social Media Handles</label>
                      <input
                        type="text"
                        name="socialMediaHandles"
                        value={infiltratorForm.socialMediaHandles}
                        onChange={handleInfiltratorChange}
                        placeholder="@username, LinkedIn profile, etc."
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Last Known Location</label>
                      <input
                        type="text"
                        name="lastKnownLocation"
                        value={infiltratorForm.lastKnownLocation}
                        onChange={handleInfiltratorChange}
                        placeholder="City, Country"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Operational History</label>
                      <textarea
                        name="operationalHistory"
                        value={infiltratorForm.operationalHistory}
                        onChange={handleInfiltratorChange}
                        placeholder="Known activities and timeline"
                        rows="3"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Skillset</label>
                      <input
                        type="text"
                        name="skillset"
                        value={infiltratorForm.skillset}
                        onChange={handleInfiltratorChange}
                        placeholder="e.g., Social engineering, malware development"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Risk Level</label>
                      <select
                        name="riskLevel"
                        value={infiltratorForm.riskLevel}
                        onChange={handleInfiltratorChange}
                        className="form-select"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <button onClick={handleInfiltratorSubmit} className="btn btn-infiltrator w-100 mt-3">
                    Submit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default CreateProfile;