export default function Header({ page = "dashboard" }) {
  const PAGES = {
    dashboard: { title: "Dashboard", sub: "Fraud detection overview" },
    graph:     { title: "Graph View", sub: "Transaction network explorer" },
    alerts:    { title: "Alerts", sub: "Flagged activity feed" },
    settings:  { title: "Settings", sub: "Configure your workspace" },
  };
  const { title, sub } = PAGES[page] || PAGES.dashboard;

  return (
    <header style={{
      height: 58,
      background: "var(--bg-surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.2px" }}>
          {title}
        </span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{sub}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Live badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          border: "1px solid rgba(0,229,180,0.2)",
          borderRadius: 99,
          background: "var(--teal-dim)",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--teal)",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--teal)",
            display: "inline-block",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          LIVE
        </div>

        {/* Export btn */}
        <button style={{
          padding: "6px 14px",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--text-secondary)",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.15s",
          letterSpacing: "0.3px",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-bright)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          Export
        </button>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </header>
  );
}