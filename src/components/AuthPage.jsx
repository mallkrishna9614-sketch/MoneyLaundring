import { useState } from "react";

export default function AuthPage({ onBack, onEnter }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Simulate auth – replace with real API call when backend is ready
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onEnter(); // go straight to dashboard
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Satoshi','Inter',sans-serif",
      color: "#ebebeb",
      position: "relative",
      overflow: "hidden",
      padding: "1.5rem",
    }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .auth-input {
          width:100%; padding:14px 16px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:0.875rem;
          color:#ebebeb; font-size:14px; font-weight:500;
          outline:none; transition:border-color 0.2s, background 0.2s;
          font-family:'Satoshi','Inter',sans-serif;
          box-sizing:border-box;
        }
        .auth-input::placeholder { color:rgba(255,255,255,0.25); }
        .auth-input:focus { border-color:#FF6B50; background:rgba(255,107,80,0.05); }
        .auth-btn {
          width:100%; padding:15px;
          background:#FF6B50; color:#000;
          border:none; border-radius:0.875rem;
          font-size:14px; font-weight:800;
          letter-spacing:0.08em; text-transform:uppercase;
          cursor:pointer; transition:all 0.25s;
          font-family:'Satoshi','Inter',sans-serif;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .auth-btn:hover:not(:disabled) { background:#ff8670; transform:translateY(-1px); box-shadow:0 8px 32px rgba(255,107,80,0.35); }
        .auth-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .tab-btn {
          flex:1; padding:10px;
          background:transparent; border:none;
          font-size:12px; font-weight:700;
          letter-spacing:0.1em; text-transform:uppercase;
          cursor:pointer; border-radius:0.625rem;
          transition:all 0.2s; font-family:'Satoshi','Inter',sans-serif;
        }
        .tab-btn.active { background:rgba(255,107,80,0.15); color:#FF6B50; }
        .tab-btn.inactive { color:rgba(255,255,255,0.35); }
        .tab-btn.inactive:hover { color:rgba(255,255,255,0.7); }
        .social-auth-btn {
          flex:1; padding:12px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:0.875rem; color:#ebebeb;
          font-size:13px; font-weight:600;
          cursor:pointer; transition:all 0.2s;
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-family:'Satoshi','Inter',sans-serif;
        }
        .social-auth-btn:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.2); }
        .back-btn {
          background:transparent; border:none;
          color:rgba(255,255,255,0.4); cursor:pointer;
          font-size:12px; font-weight:600;
          letter-spacing:0.1em; text-transform:uppercase;
          display:flex; align-items:center; gap:6px;
          transition:color 0.2s; font-family:'Satoshi','Inter',sans-serif;
          padding:0;
        }
        .back-btn:hover { color:#FF6B50; }
        .pass-toggle {
          position:absolute; right:14px; top:50%; transform:translateY(-50%);
          background:transparent; border:none;
          color:rgba(255,255,255,0.3); cursor:pointer; font-size:16px;
          transition:color 0.2s; padding:4px;
        }
        .pass-toggle:hover { color:#FF6B50; }
        .divider { display:flex; align-items:center; gap:12px; margin:20px 0; }
        .divider::before,.divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .divider span { font-size:11px; color:rgba(255,255,255,0.25); font-weight:600; letter-spacing:0.1em; text-transform:uppercase; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position:"absolute", top:"15%", left:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,80,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,70,229,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />

      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,107,80,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,80,0.025) 1px,transparent 1px)",
        backgroundSize:"60px 60px",
        maskImage:"radial-gradient(ellipse at center,black 30%,transparent 80%)",
      }} />

      {/* Card */}
      <div style={{
        width:"100%", maxWidth:440,
        background:"rgba(13,13,13,0.95)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"2rem",
        padding:"2.5rem",
        backdropFilter:"blur(20px)",
        animation:"fadeIn 0.6s cubic-bezier(.4,0,.2,1) both",
        position:"relative", zIndex:1,
        boxShadow:"0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      }}>

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, background:"#FF6B50", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900 }}>🛡</div>
            <span style={{ fontSize:16, fontWeight:900, letterSpacing:"-0.04em" }}>FraudGraph</span>
          </div>
          <button className="back-btn" onClick={onBack}>← Back</button>
        </div>

        {/* Heading */}
        <div style={{ marginBottom:"1.75rem" }}>
          <h1 style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.05em", lineHeight:1, marginBottom:"0.5rem" }}>
            {mode === "login" ? "Welcome back." : "Join FraudGraph."}
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontWeight:500 }}>
            {mode === "login"
              ? "Sign in to access your security dashboard."
              : "Create your account to get started."}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, background:"rgba(255,255,255,0.04)", borderRadius:"0.75rem", padding:4, marginBottom:"1.75rem" }}>
          <button className={`tab-btn ${mode === "login" ? "active" : "inactive"}`} onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
          <button className={`tab-btn ${mode === "register" ? "active" : "inactive"}`} onClick={() => { setMode("register"); setError(""); }}>Register</button>
        </div>

        {/* Social auth */}
        <div style={{ display:"flex", gap:10, marginBottom:4 }}>
          <button className="social-auth-btn">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button className="social-auth-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <div className="divider"><span>or continue with email</span></div>

        {/* Form */}
        <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {mode === "register" && (
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", display:"block", marginBottom:6 }}>Full Name</label>
              <input className="auth-input" type="text" placeholder="Krishna Aryan" value={form.name} onChange={set("name")} required={mode === "register"} autoComplete="name" />
            </div>
          )}

          <div>
            <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", display:"block", marginBottom:6 }}>Email Address</label>
            <input className="auth-input" type="email" placeholder="you@fraudgraph.io" value={form.email} onChange={set("email")} required autoComplete="email" />
          </div>

          <div style={{ position:"relative" }}>
            <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", display:"block", marginBottom:6 }}>Password</label>
            <input className="auth-input" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set("password")} required style={{ paddingRight:44 }} autoComplete={mode === "login" ? "current-password" : "new-password"} />
            <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>{showPass ? "🙈" : "👁"}</button>
          </div>

          {mode === "register" && (
            <div style={{ position:"relative" }}>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", display:"block", marginBottom:6 }}>Confirm Password</label>
              <input className="auth-input" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.confirm} onChange={set("confirm")} required={mode === "register"} style={{ paddingRight:44 }} autoComplete="new-password" />
            </div>
          )}

          {mode === "login" && (
            <div style={{ textAlign:"right", marginTop:-4 }}>
              <button type="button" style={{ background:"transparent", border:"none", color:"#FF6B50", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Satoshi','Inter',sans-serif" }}>
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <div style={{ padding:"10px 14px", background:"rgba(255,94,125,0.1)", border:"1px solid rgba(255,94,125,0.2)", borderRadius:"0.75rem", fontSize:13, color:"#ff5e7d", display:"flex", alignItems:"center", gap:8 }}>
              ⚠ {error}
            </div>
          )}

          <button className="auth-btn" type="submit" disabled={loading} style={{ marginTop:4 }}>
            {loading
              ? <><span style={{ width:16, height:16, border:"2px solid rgba(0,0,0,0.3)", borderTopColor:"#000", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} /> Processing…</>
              : mode === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        {/* Footer note */}
        <p style={{ marginTop:"1.5rem", textAlign:"center", fontSize:12, color:"rgba(255,255,255,0.25)", lineHeight:1.6 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            style={{ background:"transparent", border:"none", color:"#FF6B50", fontWeight:700, cursor:"pointer", fontSize:12, fontFamily:"'Satoshi','Inter',sans-serif" }}>
            {mode === "login" ? "Register for free" : "Sign in"}
          </button>
        </p>

        {/* Live badge */}
        <div style={{ marginTop:"1.75rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:11, color:"rgba(255,255,255,0.25)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
          <span style={{ width:6, height:6, background:"#00D9FF", borderRadius:"50%", animation:"pulse 2s infinite", display:"inline-block" }} />
          All systems operational · 99.9% uptime
        </div>
      </div>
    </div>
  );
}
