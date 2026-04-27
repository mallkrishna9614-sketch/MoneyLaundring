import { useState, useEffect } from "react";
import API from "../config";
import "../App.css";

const CARD_CONFIG = [
  { key: "totalUsers", cls: "users", icon: "◉", label: "Total Users", delta: "+12 this week", dir: "up" },
  { key: "totalTransactions", cls: "txn", icon: "⇄", label: "Transactions", delta: "+34 today", dir: "up" },
  { key: "fraudDetected", cls: "fraud", icon: "⚠", label: "Fraud Detected", delta: "3 new alerts", dir: "down" },
  { key: "highRiskUsers", cls: "risk", icon: "◈", label: "High Risk", delta: "needs review", dir: "down" },
];

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    fraudDetected: 0,
    highRiskUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async (retries = 3) => {
      try {
        const res = await fetch(`${API}/metrics`);
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setStats({
          totalUsers: data.total_users || 0,
          totalTransactions: data.total_transactions || 0,
          fraudDetected: data.fraud_cases || 0,
          highRiskUsers: data.high_risk_users || 0,
        });
        setLoading(false);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchMetrics(retries - 1), 2000);
        } else {
          setError("Backend not responding");
          setLoading(false);
        }
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="card-container" style={{ justifyContent: "center", padding: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", color: "var(--text-muted)" }}>
          <div style={{ animation: "spin 1.5s linear infinite", fontSize: "24px", display: "inline-block" }}>◎</div>
          <div>Loading metrics...</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Waking up backend...</div>
        </div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-container" style={{ justifyContent: "center", padding: "40px" }}>
        <div style={{ color: "#ff4d6d", padding: "20px", background: "rgba(255, 77, 109, 0.1)", borderRadius: "10px", border: "1px solid rgba(255, 77, 109, 0.2)" }}>
          ⚠ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card-container">
      {CARD_CONFIG.map(({ key, cls, icon, label, delta, dir }) => (
        <div key={key} className={`card ${cls}`}>
          <span className="card-icon">{icon}</span>
          <div className="card-label">{label}</div>
          <div className="card-value">{stats[key].toLocaleString()}</div>
          <div className={`card-delta ${dir}`}>{delta}</div>
        </div>
      ))}
    </div>
  );
}