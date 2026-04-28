import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetch("https://backend-e7kt.onrender.com/metrics")
      .then(r => r.json())
      .then(data => setStats({
        totalUsers: data.total_users || 0,
        totalTransactions: data.total_transactions || 0,
        fraudDetected: data.fraud_cases || 0,
        highRiskUsers: data.high_risk_users || 0,
      }))
      .catch(() => {});
  }, []);

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