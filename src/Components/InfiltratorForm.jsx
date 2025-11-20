import React from "react";

const InfiltratorForm = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="card border-0 shadow-sm form-card-infiltrator">
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          {/* Case Information */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Case ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="case_id"
              value={formData.case_id}
              onChange={onChange}
              placeholder="e.g., INC-2025-0914-003"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Local Alias/Project Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="local_alias"
              value={formData.local_alias}
              onChange={onChange}
              placeholder="e.g., Project_Phoenix_Access"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Threat Actor Group</label>
            <input
              type="text"
              name="threat_actor_group"
              value={formData.threat_actor_group}
              onChange={onChange}
              placeholder="e.g., APT28, Unclassified"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Current Status <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="current_status"
              value={formData.current_status}
              onChange={onChange}
              placeholder="e.g., Contained, Active, Resolved"
              className="form-control"
            />
          </div>

          {/* Targeted Assets */}
          <div className="mb-3">
            <label className="form-label fw-bold">Targeted Assets</label>
            <small className="text-muted d-block mb-1">Comma-separated list</small>
            <textarea
              name="targeted_assets"
              value={formData.targeted_assets}
              onChange={onChange}
              placeholder="e.g., DB-PROD-SQL-04, HR-FileShare-01, VDI-Farm-A-32"
              rows="2"
              className="form-control"
            />
          </div>

          {/* Initial Access Vector */}
          <div className="mb-3">
            <label className="form-label fw-bold">Initial Access Type</label>
            <input
              type="text"
              name="initial_access_type"
              value={formData.initial_access_type}
              onChange={onChange}
              placeholder="e.g., Exploited Public-Facing Service, Phishing"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Initial Access Details</label>
            <textarea
              name="initial_access_details"
              value={formData.initial_access_details}
              onChange={onChange}
              placeholder="Detailed description of how initial access was gained"
              rows="3"
              className="form-control"
            />
          </div>

          {/* Key TTPs */}
          <div className="mb-3">
            <label className="form-label fw-bold">Key TTPs Observed</label>
            <small className="text-muted d-block mb-1">One per line</small>
            <textarea
              name="key_ttps"
              value={formData.key_ttps}
              onChange={onChange}
              placeholder="e.g., Defense Evasion - Living Off the Land&#10;Persistence - Scheduled Task/Job"
              rows="4"
              className="form-control"
            />
          </div>

          {/* IOCs */}
          <div className="mb-3">
            <label className="form-label fw-bold">Malicious File Hashes (SHA256)</label>
            <small className="text-muted d-block mb-1">Comma-separated</small>
            <textarea
              name="malicious_file_hashes"
              value={formData.malicious_file_hashes}
              onChange={onChange}
              placeholder="e.g., 1a2b3c4d5e6f..., 9f8e7d6c5b4a..."
              rows="2"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Process Names</label>
            <small className="text-muted d-block mb-1">Comma-separated</small>
            <input
              type="text"
              name="process_names"
              value={formData.process_names}
              onChange={onChange}
              placeholder="e.g., certutil.exe, WMI-Updater.ps1"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Internal Staging Paths</label>
            <small className="text-muted d-block mb-1">Comma-separated</small>
            <textarea
              name="internal_staging_paths"
              value={formData.internal_staging_paths}
              onChange={onChange}
              placeholder="e.g., C:\Users\Public\Videos\temp_data.zip"
              rows="2"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">External C2 Indicators</label>
            <small className="text-muted d-block mb-1">Comma-separated IPs/domains</small>
            <textarea
              name="external_c2_indicators"
              value={formData.external_c2_indicators}
              onChange={onChange}
              placeholder="e.g., 104.244.42.105, api-update-service.xyz"
              rows="2"
              className="form-control"
            />
          </div>

          {/* Remediation Status */}
          <div className="mb-3">
            <label className="form-label fw-bold">Access Point Closed?</label>
            <select
              name="access_point_closed"
              value={formData.access_point_closed}
              onChange={onChange}
              className="form-select"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Persistence Removed?</label>
            <select
              name="persistence_removed"
              value={formData.persistence_removed}
              onChange={onChange}
              className="form-select"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Remediation Notes</label>
            <textarea
              name="remediation_notes"
              value={formData.remediation_notes}
              onChange={onChange}
              placeholder="Details about remediation actions taken"
              rows="3"
              className="form-control"
            />
          </div>

          {/* Analyst Notes */}
          <div className="mb-3">
            <label className="form-label fw-bold">Analyst Notes</label>
            <textarea
              name="analyst_notes"
              value={formData.analyst_notes}
              onChange={onChange}
              placeholder="Additional observations and analysis"
              rows="4"
              className="form-control"
            />
          </div>
        </div>

        <button onClick={onSubmit} className="btn btn-infiltrator w-100 mt-3">
          Submit Incident Report
        </button>
      </div>
    </div>
  );
};

export default InfiltratorForm;