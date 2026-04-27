import { useState } from "react";
import "../App.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "engine", label: "Fraud Engine" },
    { id: "alerts", label: "Alerts & Notifications" },
    { id: "security", label: "Security" },
    { id: "api", label: "API & Integrations" }
  ];

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === "general" && (
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="form-group">
              <label>Organization Name</label>
              <input type="text" className="input" defaultValue="Acme Corp" />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select className="input select-input">
                <option>UTC (Universal Coordinated Time)</option>
                <option>PST (Pacific Standard Time)</option>
                <option>EST (Eastern Standard Time)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Data Retention Period</label>
              <select className="input select-input">
                <option>30 Days</option>
                <option>90 Days</option>
                <option>1 Year</option>
                <option>Indefinite</option>
              </select>
            </div>
            <button className="button">Save Changes</button>
          </div>
        )}

        {activeTab === "engine" && (
          <div className="settings-section">
            <h3>Fraud Detection Engine</h3>
            <p className="settings-description">Configure the sensitivity and automated actions of the AI fraud engine.</p>
            
            <div className="form-group row-group">
              <div>
                <label>Auto-block High Risk Transactions</label>
                <div className="sub-label">Automatically block transactions with a risk score above the critical threshold.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="form-group row-group">
              <div>
                <label>Velocity Checks (Rate Limiting)</label>
                <div className="sub-label">Flag users who attempt multiple transactions in a short timeframe.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="form-group">
              <label>Critical Risk Threshold (Score: 0 - 100)</label>
              <input type="range" min="0" max="100" defaultValue="85" className="range-input" />
              <div className="range-value">Current: 85</div>
            </div>

            <button className="button">Update Engine Configuration</button>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="settings-section">
            <h3>Alerts & Notifications</h3>
            <div className="form-group row-group">
              <div>
                <label>Email Alerts</label>
                <div className="sub-label">Send an email when a critical fraud event is detected.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group row-group">
              <div>
                <label>Weekly Digest</label>
                <div className="sub-label">Receive a weekly summary report of fraud prevention metrics.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label>Alert Email Address</label>
              <input type="email" className="input" defaultValue="security@acme.com" />
            </div>
            <button className="button">Save Preferences</button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="settings-section">
            <h3>Account Security</h3>
            <div className="form-group row-group">
              <div>
                <label>Two-Factor Authentication (2FA)</label>
                <div className="sub-label">Require a secondary code when logging into the dashboard.</div>
              </div>
              <button className="button button-outline">Enable 2FA</button>
            </div>
            <div className="form-group">
              <label>Change Password</label>
              <input type="password" className="input" placeholder="Current Password" style={{ marginBottom: '10px' }} />
              <input type="password" className="input" placeholder="New Password" style={{ marginBottom: '10px' }} />
              <input type="password" className="input" placeholder="Confirm New Password" />
            </div>
            <button className="button">Update Password</button>
          </div>
        )}

        {activeTab === "api" && (
          <div className="settings-section">
            <h3>API & Integrations</h3>
            <p className="settings-description">Manage API keys for integrating FraudGraph with your payment gateways and backend systems.</p>
            
            <div className="form-group">
              <label>Production API Key</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="input" readOnly value="fg_prod_8f92jnd832bd823b8bd" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }} />
                <button className="button button-outline">Copy</button>
                <button className="button button-outline" style={{ color: 'var(--coral)', borderColor: 'var(--coral-dim)' }}>Roll Key</button>
              </div>
            </div>

            <div className="form-group">
              <label>Test API Key</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="input" readOnly value="fg_test_1234567890abcdef" style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }} />
                <button className="button button-outline">Copy</button>
              </div>
            </div>

            <div className="form-group">
              <label>Webhook URL (Event Notifications)</label>
              <input type="url" className="input" defaultValue="https://api.acme.com/webhooks/fraudgraph" />
            </div>
            <button className="button">Save Webhook</button>
          </div>
        )}
      </div>
    </div>
  );
}
