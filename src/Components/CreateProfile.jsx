import React, { useState } from "react";
import "../CSS/form.css";
import Header from "./Header.jsx";

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
    // Validate required fields
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
      // API call to your backend
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
      
      // Reset form
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
    // Validate required fields
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
      // API call to your backend
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
      
      // Reset form
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
    <div>
        <Header />
        <div className="page-container">
        <div className="content-wrapper">
            <h1>Can't find an APT or IT Infiltrator?</h1>
            <h3>
            Follow the form directions below to add your APT or Infiltrator to your dashboard.
            </h3>

            {message.text && (
            <div className={`message ${message.type}`}>
                {message.text}
            </div>
            )}

            <div className="forms-grid">
            <div className="form-card">
                <div className="card-header apt-header">
                Threat Profile Form
                </div>
                {/* MODIFIED: Add style to card-body for flex layout */}
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    
                    {/* NEW WRAPPER: Contains all form groups and grows to fill vertical space */}
                    <div style={{ flexGrow: 1 }}> 
                        <div className="form-group">
                            <label className="form-label">
                            Alias Name <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="alias"
                            value={aptForm.alias}
                            onChange={handleAptChange}
                            placeholder="e.g., APT28, UAC-0063"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                            Country of Origin <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="countryOfOrigin"
                            value={aptForm.countryOfOrigin}
                            onChange={handleAptChange}
                            placeholder="e.g., Russia"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                            Targeted Country <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="targetedCountry"
                            value={aptForm.targetedCountry}
                            onChange={handleAptChange}
                            placeholder="e.g., Kazakhstan"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                            Campaign <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="campaign"
                            value={aptForm.campaign}
                            onChange={handleAptChange}
                            placeholder="Brief campaign description"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                            Description <span className="required">*</span>
                            </label>
                            <textarea
                            name="description"
                            value={aptForm.description}
                            onChange={handleAptChange}
                            placeholder="Detailed description of the threat"
                            rows="3"
                            className="form-textarea"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">TTPs</label>
                            <input
                            type="text"
                            name="ttps"
                            value={aptForm.ttps}
                            onChange={handleAptChange}
                            placeholder="e.g., T1566.001"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Industries</label>
                            <input
                            type="text"
                            name="industries"
                            value={aptForm.industries}
                            onChange={handleAptChange}
                            placeholder="e.g., diplomatic, military"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">MITRE Framework ID/GID</label>
                            <input
                            type="text"
                            name="mitreId"
                            value={aptForm.mitreId}
                            onChange={handleAptChange}
                            placeholder="e.g., G0003"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">CVE</label>
                            <input
                            type="text"
                            name="cve"
                            value={aptForm.cve}
                            onChange={handleAptChange}
                            placeholder="e.g., CVE-2022-38028"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Motive</label>
                            <input
                            type="text"
                            name="motive"
                            value={aptForm.motive}
                            onChange={handleAptChange}
                            placeholder="e.g., cyberespionage"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Reference URL</label>
                            <input
                            type="url"
                            name="url"
                            value={aptForm.url}
                            onChange={handleAptChange}
                            placeholder="https://..."
                            className="form-input"
                            />
                        </div>
                    </div> 
                    {/* END OF NEW WRAPPER */}

                    <button onClick={handleAptSubmit} className="btn btn-submit">
                        Submit Profile
                    </button>
                </div>
            </div>

            <div className="form-card">
                <div className="card-header infiltrator-header">
                Infiltrator Form
                </div>
                {/* MODIFIED: Add style to card-body for flex layout */}
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    
                    {/* NEW WRAPPER: Contains all form groups and grows to fill vertical space */}
                    <div style={{ flexGrow: 1 }}> 
                        <div className="form-group">
                            <label className="form-label">
                            Common Names <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="commonNames"
                            value={infiltratorForm.commonNames}
                            onChange={handleInfiltratorChange}
                            placeholder="e.g., John Smith, Ivan Petrov"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                            Country of Origin <span className="required">*</span>
                            </label>
                            <input
                            type="text"
                            name="countryOfOrigin"
                            value={infiltratorForm.countryOfOrigin}
                            onChange={handleInfiltratorChange}
                            placeholder="e.g., Russia"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Numbers</label>
                            <input
                            type="text"
                            name="phoneNumbers"
                            value={infiltratorForm.phoneNumbers}
                            onChange={handleInfiltratorChange}
                            placeholder="Comma-separated phone numbers"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Addresses</label>
                            <input
                            type="text"
                            name="emails"
                            value={infiltratorForm.emails}
                            onChange={handleInfiltratorChange}
                            placeholder="Comma-separated emails"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Targeted Country</label>
                            <input
                            type="text"
                            name="targetedCountry"
                            value={infiltratorForm.targetedCountry}
                            onChange={handleInfiltratorChange}
                            placeholder="e.g., United States"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Affiliated Organization</label>
                            <input
                            type="text"
                            name="affiliatedOrganization"
                            value={infiltratorForm.affiliatedOrganization}
                            onChange={handleInfiltratorChange}
                            placeholder="e.g., APT28, Company XYZ"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Known Aliases</label>
                            <input
                            type="text"
                            name="knownAliases"
                            value={infiltratorForm.knownAliases}
                            onChange={handleInfiltratorChange}
                            placeholder="Other names used"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Social Media Handles</label>
                            <input
                            type="text"
                            name="socialMediaHandles"
                            value={infiltratorForm.socialMediaHandles}
                            onChange={handleInfiltratorChange}
                            placeholder="@username, LinkedIn profile, etc."
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Last Known Location</label>
                            <input
                            type="text"
                            name="lastKnownLocation"
                            value={infiltratorForm.lastKnownLocation}
                            onChange={handleInfiltratorChange}
                            placeholder="City, Country"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Operational History</label>
                            <textarea
                            name="operationalHistory"
                            value={infiltratorForm.operationalHistory}
                            onChange={handleInfiltratorChange}
                            placeholder="Known activities and timeline"
                            rows="3"
                            className="form-textarea"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Skillset</label>
                            <input
                            type="text"
                            name="skillset"
                            value={infiltratorForm.skillset}
                            onChange={handleInfiltratorChange}
                            placeholder="e.g., Social engineering, malware development"
                            className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Risk Level</label>
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
                    {/* END OF NEW WRAPPER */}

                    <button onClick={handleInfiltratorSubmit} className="btn btn-submit">
                        Submit Profile
                    </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default CreateProfile;