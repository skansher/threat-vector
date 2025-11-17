import React from "react";

const AptForm = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="card border-0 shadow-sm form-card-apt">
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <div className="mb-3">
            <label className="form-label fw-bold">
              Alias Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="alias"
              value={formData.alias}
              onChange={onChange}
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
              value={formData.countryOfOrigin}
              onChange={onChange}
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
              value={formData.targetedCountry}
              onChange={onChange}
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
              value={formData.campaign}
              onChange={onChange}
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
              value={formData.description}
              onChange={onChange}
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
              value={formData.ttps}
              onChange={onChange}
              placeholder="e.g., T1566.001"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Industries</label>
            <input
              type="text"
              name="industries"
              value={formData.industries}
              onChange={onChange}
              placeholder="e.g., diplomatic, military"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">MITRE Framework ID/GID</label>
            <input
              type="text"
              name="mitreId"
              value={formData.mitreId}
              onChange={onChange}
              placeholder="e.g., G0003"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">CVE</label>
            <input
              type="text"
              name="cve"
              value={formData.cve}
              onChange={onChange}
              placeholder="e.g., CVE-2022-38028"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Motive</label>
            <input
              type="text"
              name="motive"
              value={formData.motive}
              onChange={onChange}
              placeholder="e.g., cyberespionage"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Reference URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={onChange}
              placeholder="https://..."
              className="form-control"
            />
          </div>
        </div>

        <button onClick={onSubmit} className="btn btn-apt w-100 mt-3">
          Submit Profile
        </button>
      </div>
    </div>
  );
};

export default AptForm;