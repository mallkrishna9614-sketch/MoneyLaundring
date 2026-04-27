import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import API from "../config";
import "../App.css";

export default function GraphView() {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);

  const fetchGraph = async (retries = 3) => {
    try {
      const res = await fetch(`${API}/graph`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, 2000));
        return fetchGraph(retries - 1); // retry
      }
      throw new Error("Backend not responding");
    }
  };

  useEffect(() => {
    fetchGraph()
      .then(graphData => {
        setNodeCount(graphData.nodes?.length || 0);
        setEdgeCount(graphData.edges?.length || 0);

        const styledData = {
          nodes: (graphData.nodes || []).map(n => ({
            ...n,
            size: 18,
            shape: "dot",
            font: { color: "#ffffff", size: 12, face: "Inter" },
            color: {
              background:
                n.color === "red" ? "#ff4d6d" :
                n.color === "orange" ? "#ffa500" :
                "#00bfff",
              border:
                n.color === "red" ? "#ff1e4d" :
                n.color === "orange" ? "#ff8800" :
                "#0099ff",
              highlight: {
                background: "#ffffff",
                border: "#ffffff"
              }
            },
            borderWidth: 2,
            borderWidthSelected: 3,
          })),

          edges: (graphData.edges || []).map(e => ({
            ...e,
            width: e.color === "#ff5555" ? 2.5 : 1,
            color: {
              color: e.color === "#ff5555"
                ? "rgba(255,80,80,0.8)"
                : "rgba(200,200,255,0.2)",
              highlight: "#ffffff"
            },
            smooth: { type: "continuous" }
          })),
        };

        const options = {
          nodes: { font: { color: "#fff" } },
          edges: { arrows: { to: { enabled: true, scaleFactor: 0.6 } } },
          physics: {
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
              gravitationalConstant: -80,
              centralGravity: 0.01,
              springLength: 140,
              springConstant: 0.04,
              damping: 0.6
            },
            stabilization: { iterations: 200 }
          },
          interaction: {
            hover: true,
            tooltipDelay: 150,
            multiselect: true,
            navigationButtons: true,
            zoomView: true,
            dragView: true
          }
        };

        networkRef.current = new Network(containerRef.current, styledData, options);
        setLoading(false);

        networkRef.current.on("click", async ({ nodes }) => {
          if (!nodes.length) {
            setPopup(null);
            return;
          }

          const userId = nodes[0];

          networkRef.current.selectNodes(nodes);
          networkRef.current.focus(userId, {
            scale: 1.3,
            animation: true
          });

          try {
            const res = await fetch(`${API}/analyze/${userId}`); // ✅ FIXED
            if (!res.ok) throw new Error("API failed");
            const data = await res.json();
            setPopup(data);
          } catch {
            console.log("Error fetching user data");
            alert("Backend not responding. Could not fetch user data.");
          }
        });
      })
      .catch(() => {
        setLoading(false);
        alert("Backend not responding. Could not load graph data.");
      });

    return () => networkRef.current?.destroy();
  }, []);

  const riskLevel = popup?.risk_level?.toUpperCase() || "LOW";

  return (
    <>
      {/* UI SAME — NOT CHANGED */}
      <div className="graph-section">
        <div className="graph-header">
          <span className="graph-title">Transaction Network</span>

          <div className="graph-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: "var(--accent)" }} />
              Normal
            </span>

            <span className="legend-item">
              <span className="legend-dot" style={{ background: "var(--amber)" }} />
              Suspicious
            </span>

            <span className="legend-item">
              <span className="legend-dot" style={{ background: "var(--coral)" }} />
              Fraud
            </span>

            <span style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              marginLeft: 8,
            }}>
              {nodeCount} nodes · {edgeCount} edges
            </span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {loading && (
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              zIndex: 5,
              background: "var(--bg-surface)",
              height: 480,
            }}>
              <div style={{ fontSize: 28, animation: "spin 1.5s linear infinite" }}>◎</div>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--text-muted)"
              }}>
                Loading graph…
              </span>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                opacity: 0.7
              }}>
                (Waking up backend...)
              </span>
            </div>
          )}

          <div ref={containerRef} className="graph-container" />
        </div>
      </div>

      {popup && (
        <div className="node-popup">
          <button className="popup-close" onClick={() => setPopup(null)}>✕</button>

          <div className="popup-user">
            {popup.name || `User ${popup.user}`}
          </div>

          <div style={{
            fontSize: "12px",
            color: "#aaa",
            marginBottom: "10px",
            lineHeight: "1.6"
          }}>
            📧 {popup.email || "No Email"} <br />
            🌍 {popup.country || "Unknown"}
          </div>

          <div className={`popup-score ${riskLevel}`}>
            {popup.risk_score.toFixed(2)}
          </div>

          <span className={`popup-level ${riskLevel}`}>
            {riskLevel} RISK
          </span>

          <hr className="popup-divider" />

          <div className="popup-reasons-label">Risk Factors</div>

          {popup.reasons.map((r, i) => (
            <div key={i} className="popup-reason">
              <span className="popup-reason-dot" />
              {r}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}