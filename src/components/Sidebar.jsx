import { useState } from "react";

const NAV = [
  { id: "dashboard", icon: "▣", label: "Dashboard" },
  { id: "graph",     icon: "◎", label: "Graph View" },
  { id: "alerts",    icon: "⚑", label: "Alerts" },
  { id: "settings",  icon: "◈", label: "Settings" },
];

export default function Sidebar({ active = "dashboard", onChange, onHome }) {
  const [spinning, setSpinning] = useState(false);

  const handleLogoClick = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      onHome?.();
    }, 500);
  };
  return (
    <aside style={{
      width: 220,
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border)",
      height: "100vh",
      position: "fixed",
      left: 0, top: 0,
      display: "flex",
      flexDirection: "column",
      zIndex: 200,
    }}>
      {/* Brand */}
      <button
        onClick={handleLogoClick}
        style={{
          padding: "20px 18px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--border)",
          width: "100%",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        title="Back to home"
      >
        <div style={{
          width: 32, height: 32,
          background: "var(--accent)",
          borderRadius: spinning ? "50%" : 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 800,
          color: "#fff",
          flexShrink: 0,
          boxShadow: spinning ? "0 0 28px var(--accent-glow)" : "0 0 16px var(--accent-glow)",
          transform: spinning ? "rotate(45deg) scale(1.15)" : "rotate(0deg) scale(1)",
          transition: "transform 0.45s cubic-bezier(.4,0,.2,1), border-radius 0.45s ease, box-shadow 0.45s ease",
        }}>🛡</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.3px", color: "var(--text-primary)" }}>
            FraudGraph
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--mono)", marginTop: 1 }}>
            v2.0 · AI Engine
          </div>
        </div>
      </button>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange?.(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: isActive ? "var(--accent-dim)" : "transparent",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "all 0.15s",
                position: "relative",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && (
                <span style={{
                  width: 3, height: 18,
                  background: "var(--accent)",
                  borderRadius: 99,
                  position: "absolute",
                  right: 8,
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Status footer */}
      <div style={{
        padding: "14px 16px",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          background: "var(--teal-dim)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid rgba(0,229,180,0.12)",
        }}>
          <span style={{
            width: 7, height: 7,
            borderRadius: "50%",
            background: "var(--teal)",
            boxShadow: "0 0 8px var(--teal)",
            animation: "pulse 2s ease-in-out infinite",
            display: "inline-block",
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--teal)" }}>System Online</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--mono)", marginTop: 1 }}>
              backend:5000 · OK
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </aside>
  );
}