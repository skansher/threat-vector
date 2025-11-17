import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import Header from "./Header.jsx";
import AptForm from "../Components/APTForm.jsx";
import InfiltratorForm from "../Components/InfiltratorForm.jsx";
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
    case_id: "",
    local_alias: "",
    threat_actor_group: "",
    current_status: "",
    targeted_assets: "",
    initial_access_type: "",
    initial_access_details: "",
    key_ttps: "",
    malicious_file_hashes: "",
    process_names: "",
    internal_staging_paths: "",
    external_c2_indicators: "",
    access_point_closed: "false",
    persistence_removed: "false",
    remediation_notes: "",
    analyst_notes: ""
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
    if (!infiltratorForm.case_id || !infiltratorForm.local_alias || !infiltratorForm.current_status) {
      setMessage({ text: "Please fill in all required fields (Case ID, Local Alias, Current Status)", type: "error" });
      return;
    }

    // Parse comma-separated fields into arrays
    const parseCommaSeparated = (str) => {
      return str ? str.split(',').map(item => item.trim()).filter(item => item) : [];
    };

    const newInfiltrator = {
      case_id: infiltratorForm.case_id,
      local_alias: infiltratorForm.local_alias,
      threat_actor_group: infiltratorForm.threat_actor_group,
      current_status: infiltratorForm.current_status,
      targeted_assets: parseCommaSeparated(infiltratorForm.targeted_assets),
      initial_access_vector: {
        type: infiltratorForm.initial_access_type,
        details: infiltratorForm.initial_access_details
      },
      key_ttps_observed_internal: infiltratorForm.key_ttps ? infiltratorForm.key_ttps.split('\n').filter(ttp => ttp.trim()) : [],
      observed_ioc_internal: {
        malicious_file_hashes_sha256: parseCommaSeparated(infiltratorForm.malicious_file_hashes),
        process_names: parseCommaSeparated(infiltratorForm.process_names),
        internal_staging_paths: parseCommaSeparated(infiltratorForm.internal_staging_paths),
        external_c2_indicators: parseCommaSeparated(infiltratorForm.external_c2_indicators)
      },
      remediation_status: {
        access_point_closed: infiltratorForm.access_point_closed === "true",
        persistence_removed: infiltratorForm.persistence_removed === "true",
        notes: infiltratorForm.remediation_notes
      },
      analyst_notes: infiltratorForm.analyst_notes
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
        text: "Infiltrator Incident created successfully!", 
        type: "success" 
      });
      
      setInfiltratorForm({
        case_id: "",
        local_alias: "",
        threat_actor_group: "",
        current_status: "",
        targeted_assets: "",
        initial_access_type: "",
        initial_access_details: "",
        key_ttps: "",
        malicious_file_hashes: "",
        process_names: "",
        internal_staging_paths: "",
        external_c2_indicators: "",
        access_point_closed: "false",
        persistence_removed: "false",
        remediation_notes: "",
        analyst_notes: ""
      });
    } catch (error) {
      console.error("Error saving Infiltrator profile:", error);
      setMessage({ 
        text: "Failed to save Infiltrator incident. Please try again.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="alt-banner mt-5 mb-4 ms-4 me-4">
        <h1>Can't find an APT or IT Infiltrator?</h1>
        <p className="welcome-subtitle">Follow the form directions below to add your APT or Infiltrator to your dashboard.</p>
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mx-4`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ text: "", type: "" })} aria-label="Close"></button>
        </div>
      )}

      <div className="row d-flex flex-row">
          {/* APT Profile Accordion */}
          <div className="col-lg-6">
            <Accordion defaultActiveKey="0" className="mt-4">
                <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header className="accordion-header-custom">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-danger">Advanced Persistent Threat Profile Form</span>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <AptForm 
                formData={aptForm}
                onChange={handleAptChange}
                onSubmit={handleAptSubmit}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          </div>

          {/* Infiltrator Incident Accordion */}
          <div className="col-lg-6">
            <Accordion defaultActiveKey="0" className="mt-4">
            <Accordion.Item eventKey="1" className="mb-3">
            <Accordion.Header className="accordion-header-custom">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning">IT Infiltrator Form Profile Form</span>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <InfiltratorForm 
                formData={infiltratorForm}
                onChange={handleInfiltratorChange}
                onSubmit={handleInfiltratorSubmit}
              />
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </div>
      </div>
    </div>
  );
};

export default CreateProfile;