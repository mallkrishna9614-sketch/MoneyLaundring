import { useState } from "react";
import OpeningPage from "./components/OpeningPage";
import AuthPage from "./components/AuthPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import GraphView from "./components/GraphView";
import Settings from "./components/Settings";
import API from "./config";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [page, setPage] = useState("dashboard");

  // 🔥 Analyzer state
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const fetchAnalyze = async (retries = 2) => {
      try {
        const res = await fetch(`${API}/analyze/${userId}`);
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setResult(data);
        setLoading(false);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchAnalyze(retries - 1), 2000);
        } else {
          setError("Backend not responding");
          setLoading(false);
        }
      }
    };
    
    fetchAnalyze();
  };

  /* ---------- SCREENS ---------- */
  if (screen === "landing") {
    return (
      <OpeningPage
        onEnter={() => setScreen("auth")}
        onDashboard={() => setScreen("dashboard")}
      />
    );
  }

  if (screen === "auth") {
    return (
      <AuthPage
        onBack={() => setScreen("landing")}
        onEnter={() => setScreen("dashboard")}
      />
    );
  }

  /* ---------- MAIN DASHBOARD ---------- */
  return (
    <div className="dashboard-layout">
      <Sidebar
        active={page}
        onChange={setPage}
        onHome={() => setScreen("landing")}
      />

      <div className="main-content">
        <Header page={page} />

        {(page === "dashboard" || page === "graph") && (
          <>
            {/* ✅ Stats */}
            {page === "dashboard" && <DashboardCards />}

            {/* 🔥 CLEAN ANALYZER */}
            {page === "dashboard" && (
              <div style={styles.analyzer}>
                <div style={styles.header}>
                  <h2>Fraud Analyzer</h2>
                  <span style={styles.badge}>AI</span>
                </div>

                <div style={styles.inputRow}>
                  <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    style={styles.input}
                    disabled={loading}
                  />

                  <button onClick={handleAnalyze} style={styles.button} disabled={loading}>
                    {loading ? "Analyzing..." : "Analyze →"}
                  </button>
                </div>

                {loading && (
                  <div style={{ marginTop: "20px", textAlign: "center", color: "#aaa" }}>
                     <div style={{ fontSize: 24, animation: "spin 1.5s linear infinite", display: "inline-block", marginBottom: "8px" }}>◎</div>
                     <div>Analyzing... (Backend might be starting)</div>
                  </div>
                )}

                {error && (
                  <div style={{ marginTop: "20px", color: "#ff4d6d", padding: "10px", background: "rgba(255, 77, 109, 0.1)", borderRadius: "8px" }}>
                    ⚠ {error}
                  </div>
                )}

                {/* RESULT */}
                {result && (
                  <div style={styles.result}>
                    <div style={styles.userBlock}>
                      <h3>{result.name || `User ${result.user}`}</h3>
                      <p>📧 {result.email || "No email"}</p>
                      <p>🌍 {result.country || "Unknown"}</p>
                    </div>

                    <div style={styles.scoreRow}>
                      <div
                        style={{
                          ...styles.score,
                          color:
                            result.risk_level === "HIGH"
                              ? "#ff4d6d"
                              : result.risk_level === "MEDIUM"
                              ? "#ffa500"
                              : "#00ff9f",
                        }}
                      >
                        {result.risk_score.toFixed(2)}
                      </div>

                      <span
                        style={{
                          ...styles.level,
                          background:
                            result.risk_level === "HIGH"
                              ? "#ff4d6d22"
                              : result.risk_level === "MEDIUM"
                              ? "#ffa50022"
                              : "#00ff9f22",
                        }}
                      >
                        {result.risk_level}
                      </span>
                    </div>

                    <div style={styles.reasonBox}>
                      <h4>Reasons</h4>
                      <ul>
                        {result.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GRAPH */}
            <GraphView />
          </>
        )}

        {page === "alerts" && (
          <div style={{ padding: 28 }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "40px 28px",
                textAlign: "center",
                color: "var(--text-muted)",
                fontFamily: "var(--mono)",
                fontSize: 13,
              }}
            >
              No active alerts · system nominal
            </div>
          </div>
        )}

        {page === "settings" && <Settings />}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  analyzer: {
    margin: "20px",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    background: "#7c5cfc",
    fontSize: "12px",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.4)",
    color: "white",
  },

  button: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #7c5cfc, #00bfff)",
    color: "white",
    cursor: "pointer",
  },

  result: {
    marginTop: "18px",
    padding: "16px",
    background: "rgba(0,0,0,0.4)",
    borderRadius: "12px",
  },

  userBlock: {
    marginBottom: "10px",
  },

  scoreRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  score: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  level: {
    padding: "6px 12px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  reasonBox: {
    marginTop: "10px",
  },
};