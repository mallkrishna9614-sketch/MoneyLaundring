import { useEffect, useState } from "react";

export default function OpeningPage({ onEnter, onDashboard }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      const t = document.querySelector("#home");
      if (t) t.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const t = document.querySelector(a.getAttribute("href"));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }, []);

  return (
    <div style={{ fontFamily: "'Satoshi','Inter',sans-serif", background: "#050505", color: "#ebebeb", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        :root { --coral: #FF6B50; --bg: #050505; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .hero-1 { animation: slideUp 0.8s cubic-bezier(.4,0,.2,1) 0.3s both; }
        .hero-2 { animation: slideUp 0.8s cubic-bezier(.4,0,.2,1) 0.45s both; }
        .hero-3 { animation: slideUp 0.8s cubic-bezier(.4,0,.2,1) 0.6s both; }
        .hero-sub { animation: slideUp 0.8s cubic-bezier(.4,0,.2,1) 0.75s both; }
        .glass-nav { background:rgba(10,10,10,0.7); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.08); }
        .grain { pointer-events:none; position:fixed; inset:0; z-index:9999; opacity:0.03;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        .text-outline { -webkit-text-stroke:1px rgba(255,255,255,0.2); color:transparent; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:10000; display:flex; align-items:center; justify-content:center; transition:opacity 0.3s; }
        .modal-box { background:#0d0d0d; border:1px solid rgba(255,255,255,0.1); border-radius:2rem; padding:3rem; max-width:500px; width:90%; }
        .ig-link { display:flex; align-items:center; justify-content:space-between; background:#050505; border:1px solid rgba(255,255,255,0.1); border-radius:0.75rem; padding:1.25rem; margin-bottom:1rem; text-decoration:none; color:#ebebeb; transition:border-color 0.3s; }
        .ig-link:hover { border-color:var(--coral); }
        .nav-link { color:#9ca3af; text-decoration:none; font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; transition:color 0.2s; }
        .nav-link:hover { color:#fff; }
        .section-card { background:#0d0d0d; border:1px solid rgba(255,255,255,0.05); border-radius:3rem; padding:3rem; height:500px; display:flex; flex-direction:column; justify-content:space-between; transition:border-color 0.5s; }
        .section-card:hover { border-color:rgba(255,107,80,0.3); }
        .float-nav { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%); z-index:50; display:flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem; border-radius:9999px; }
        .float-btn { padding:0.75rem; border:none; background:transparent; color:#fff; cursor:pointer; border-radius:9999px; transition:background 0.2s; font-size:1.25rem; }
        .float-btn:hover { background:rgba(255,255,255,0.1); }
        .case-img { width:100%; aspect-ratio:16/10; overflow:hidden; background:#f3f4f6; border-radius:0.5rem; margin-bottom:2rem; }
        .case-img img { width:100%; height:100%; object-fit:cover; transition:transform 1s; }
        .case-link:hover .case-img img { transform:scale(1.05); }
        .case-link { display:block; text-decoration:none; color:inherit; }
        .social-btn { width:3.5rem; height:3.5rem; border:1px solid rgba(255,255,255,0.1); border-radius:9999px; display:flex; align-items:center; justify-content:center; background:transparent; color:#fff; cursor:pointer; font-size:1.25rem; transition:all 0.2s; }
        .social-btn:hover { background:var(--coral); border-color:var(--coral); }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="glass-nav" style={{ position:"fixed", top:"1.5rem", left:"50%", transform:"translateX(-50%)", width:"90%", maxWidth:"80rem", zIndex:50, borderRadius:"1rem", padding:"1rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"3rem" }}>
          <a href="#home" onClick={handleLogoClick} style={{ display:"flex", alignItems:"center", gap:"0.5rem", textDecoration:"none", color:"#fff" }}>
            <div style={{ 
              width:32, height:32, 
              background:"#FF6B50", 
              borderRadius: spinning ? "50%" : 8, 
              display:"flex", alignItems:"center", justifyContent:"center", 
              fontSize:18,
              boxShadow: spinning ? "0 0 28px rgba(255,107,80,0.6)" : "none",
              transform: spinning ? "rotate(45deg) scale(1.15)" : "rotate(0deg) scale(1)",
              transition: "transform 0.45s cubic-bezier(.4,0,.2,1), border-radius 0.45s ease, box-shadow 0.45s ease",
            }}>🛡</div>
            <span style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.05em" }}>FraudGraph</span>
          </a>
          <div style={{ display:"flex", gap:"2rem" }}>
            <a href="#features" className="nav-link">Features</a>
            <button
              type="button"
              className="nav-link"
              style={{ border:"none", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:4, padding:0 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDashboard && onDashboard(); }}
            >
              Dashboard
            </button>
            <a href="#cases" className="nav-link">Cases</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>
        </div>
        <button onClick={onEnter} style={{ background:"#fff", color:"#000", padding:"0.625rem 1.5rem", borderRadius:"0.75rem", border:"none", fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FF6B50"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}>
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{ position:"relative", height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden", padding:"0 1.5rem" }}>
        <div style={{ position:"absolute", top:"25%", left:"2.5rem", width:96, height:96, background:"#FF6B50", borderRadius:"50%", filter:"blur(100px)", opacity:0.2, animation:"pulse 2s infinite" }} />
        <div style={{ position:"absolute", bottom:"25%", right:"2.5rem", width:160, height:160, background:"#4F46E5", borderRadius:"50%", filter:"blur(120px)", opacity:0.1 }} />

        <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
          <p className="hero-sub" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.5em", textTransform:"uppercase", color:"#FF6B50", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem" }}>
            <span style={{ width:8, height:8, background:"#00D9FF", borderRadius:"50%", display:"inline-block", animation:"pulse 2s infinite" }} />
            AI-Powered Security Platform © 2024
          </p>
          <h1 style={{ fontSize:"13vw", lineHeight:0.85, letterSpacing:"-0.06em", fontWeight:900, margin:0 }}>
            <span className="hero-1" style={{ display:"block" }}>/FRAUD</span>
            <span className="hero-2" style={{ display:"block" }}>DETECTION</span>
            <span className="hero-3 text-outline" style={{ display:"block" }}>SYSTEM</span>
          </h1>
        </div>

        {/* Team avatars */}
        <div style={{ position:"absolute", bottom:"4rem", left:"3rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ display:"flex" }}>
            {[
              "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/35f3c4cc-7192-4932-b74d-a6ada393ece9/1777202821166-2d707df3/WhatsApp_Image_2026-04-26_at_4.41.04_PM.jpeg",
              "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/35f3c4cc-7192-4932-b74d-a6ada393ece9/1777202823193-90b10dc4/WhatsApp_Image_2026-04-26_at_4.39.31_PM.jpeg",
              "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/35f3c4cc-7192-4932-b74d-a6ada393ece9/1777202824718-f8a1a87b/WhatsApp_Image_2026-04-26_at_4.38.14_PM__1_.jpeg"
            ].map((src, i) => (
              <img key={i} src={src} style={{ width:48, height:48, borderRadius:"50%", border:"2px solid #050505", marginLeft: i > 0 ? -12 : 0, objectFit:"cover", cursor:"pointer", transition:"transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                alt={`Team ${i+1}`} />
            ))}
          </div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#6b7280", lineHeight:1.5 }}>
            <span style={{ color:"#00D9FF" }}>LIVE</span> Monitoring<br/>
            <span style={{ color:"#fff" }}>24/7 Protection</span>
          </div>
        </div>

        {/* CTA + email */}
        <div style={{ position:"absolute", bottom:"4rem", right:"3rem", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"1rem" }}>

          <a href="mailto:security@fraudgraph.io" style={{ display:"flex", alignItems:"center", gap:"0.75rem", color:"#fff", textDecoration:"none" }}>
            <span style={{ fontSize:14, fontWeight:500, borderBottom:"1px solid rgba(255,255,255,0.2)", paddingBottom:4 }}>security@fraudgraph.io</span>
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:"10rem 1.5rem" }}>
        <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"end", marginBottom:"8rem" }}>
            <h2 style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:700, letterSpacing:"-0.04em", lineHeight:0.95 }}>
              Real-time Fraud <em style={{ color:"#FF6B50", fontStyle:"italic", fontFamily:"Georgia,serif" }}>Detection</em> & Prevention.
            </h2>
            <p style={{ fontSize:18, color:"#6b7280", maxWidth:400, lineHeight:1.65 }}>
              Advanced AI-powered fraud detection platform that identifies threats in real-time, protecting your business from financial crime across all channels.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
            <div className="section-card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ padding:"1rem", background:"#1a1a1a", borderRadius:"1rem", fontSize:28 }}>⚡</div>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", color:"#4b5563", textTransform:"uppercase" }}>01 / Detection</span>
              </div>
              <div>
                <h3 style={{ fontSize:"clamp(2.5rem,4vw,3rem)", fontWeight:700, letterSpacing:"-0.04em", marginBottom:"0.5rem" }}>Real-time.</h3>
                <h3 style={{ fontSize:"clamp(2.5rem,4vw,3rem)", fontWeight:700, letterSpacing:"-0.04em", color:"#374151", marginBottom:"1.5rem" }}>Detection.</h3>
                <p style={{ color:"#6b7280", maxWidth:280, lineHeight:1.6 }}>AI-powered threat identification processes millions of transactions per second, catching fraud before it happens.</p>
              </div>
            </div>
            <div style={{ background:"linear-gradient(135deg,#FF6B50,#FF9068)", borderRadius:"3rem", padding:"3rem", height:500, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"calc(100% - 4rem)" }}>
                <div style={{ background:"rgba(0,0,0,0.9)", borderRadius:"1rem", padding:"1.5rem", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.5rem" }}>
                    <div style={{ width:12, height:12, borderRadius:"50%", background:"#ef4444" }} />
                    <div style={{ width:12, height:12, borderRadius:"50%", background:"#eab308" }} />
                    <div style={{ width:12, height:12, borderRadius:"50%", background:"#22c55e" }} />
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                    <div style={{ height:16, width:"75%", background:"rgba(255,255,255,0.1)", borderRadius:999 }} />
                    <div style={{ height:16, width:"50%", background:"rgba(255,255,255,0.1)", borderRadius:999 }} />
                    <div style={{ height:128, background:"rgba(255,107,80,0.2)", borderRadius:"0.75rem", display:"flex", alignItems:"flex-end", padding:"1rem", gap:"0.5rem" }}>
                      {[48,80,64,96].map((h,i) => <div key={i} style={{ flex:1, height:h, background:"#FF6B50", borderRadius:4 }} />)}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position:"absolute", bottom:"3rem", left:"3rem" }}>
                <h3 style={{ fontSize:"2.5rem", fontWeight:700, letterSpacing:"-0.04em", color:"#000" }}>Advanced Risk Analytics</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" style={{ padding:"10rem 1.5rem", background:"#fff", color:"#000", borderRadius:"4rem" }}>
        <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6rem" }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.4em", color:"#9ca3af", textTransform:"uppercase" }}>Success Stories</span>
            <h3 style={{ fontSize:"clamp(3rem,8vw,5rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:0.9 }}>FRAUD<br/>PREVENTION.</h3>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", columnGap:"4rem", rowGap:"8rem" }}>
            {[
              { href:"#fraud-ring", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", tag:"Network Analysis / 2024", title:"FRAUD RING DETECTION" },
              { href:"#payment-fraud", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", tag:"Transaction Monitoring / 2023", title:"PAYMENT FRAUD PREVENTION", offset:true },
              { href:"#money-laundering", img:"https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1200&auto=format&fit=crop", tag:"AML Detection / 2024", title:"MONEY LAUNDERING DETECTION" },
              { href:"#anomaly", img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop", tag:"Anomaly Detection / 2023", title:"TRANSACTION ANOMALY DETECTION", offset:true },
            ].map((c, i) => (
              <a key={i} href={c.href} className="case-link" style={{ marginTop: c.offset ? "10rem" : 0 }}>
                <div className="case-img"><img src={c.img} alt={c.title} /></div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                  <div>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", color:"#6b7280", textTransform:"uppercase" }}>{c.tag}</span>
                    <h4 style={{ fontSize:"2.25rem", fontWeight:700, letterSpacing:"-0.04em", marginTop:"0.5rem" }}>{c.title}</h4>
                  </div>
                  <span style={{ fontSize:24 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ padding:"10rem 1.5rem" }}>
        <div style={{ maxWidth:"80rem", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"5rem", marginBottom:"8rem", flexWrap:"wrap" }}>
            <div style={{ maxWidth:"48rem" }}>
              <h2 style={{ fontSize:"12vw", fontWeight:900, lineHeight:0.8, letterSpacing:"-0.04em", marginBottom:"4rem" }}>
                PROTECT<br/><span style={{ color:"#FF6B50" }}>YOUR BUSINESS.</span>
              </h2>
              <a href="mailto:security@fraudgraph.io" style={{ fontSize:"clamp(1.5rem,4vw,3rem)", fontWeight:700, letterSpacing:"-0.04em", color:"#fff", textDecoration:"none", transition:"color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FF6B50"}
                onMouseLeave={e => e.currentTarget.style.color = "#fff"}>
                security@fraudgraph.io
              </a>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"3rem" }}>
              <div>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.4em", color:"#4b5563", textTransform:"uppercase", marginBottom:"1.5rem" }}>Connect</p>
                <div style={{ display:"flex", gap:"1rem" }}>
                  <button className="social-btn" onClick={() => setModalOpen(true)}>📷</button>
                  <a href="#twitter" className="social-btn" style={{ textDecoration:"none", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>𝕏</a>
                  <a href="#linkedin" className="social-btn" style={{ textDecoration:"none", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>in</a>
                </div>
              </div>
              <div style={{ paddingTop:"3rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.4em", color:"#4b5563", textTransform:"uppercase", marginBottom:"1rem" }}>System Status</p>
                <p style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:14, fontWeight:500 }}>
                  <span style={{ width:8, height:8, background:"#00D9FF", borderRadius:"50%", animation:"pulse 2s infinite", display:"inline-block" }} />
                  All Systems Operational
                </p>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"5rem", borderTop:"1px solid rgba(255,255,255,0.05)", fontSize:10, fontWeight:700, letterSpacing:"0.15em", color:"#4b5563", textTransform:"uppercase" }}>
            <p>© 2024 FraudGraph Security Platform.</p>
            <div style={{ display:"flex", gap:"2rem" }}>
              <a href="#privacy" style={{ color:"#4b5563", textDecoration:"none" }}>Privacy</a>
              <a href="#terms" style={{ color:"#4b5563", textDecoration:"none" }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* INSTAGRAM MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem" }}>
              <h3 style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.03em" }}>Follow Our Team</h3>
              <button onClick={() => setModalOpen(false)} style={{ width:40, height:40, border:"1px solid rgba(255,255,255,0.1)", borderRadius:"50%", background:"transparent", color:"#fff", cursor:"pointer", fontSize:18 }}>✕</button>
            </div>
            <p style={{ fontSize:14, color:"#6b7280", marginBottom:"2rem" }}>Connect with our team members on Instagram</p>
            {[
              { name:"Krishna", handle:"@its_krishnaff", href:"https://www.instagram.com/its_krishnaff?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
              { name:"Aryan", handle:"@_aryan__vish_", href:"https://www.instagram.com/_aryan__vish_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
              { name:"Ayush", handle:"@iam_ayushbhushan", href:"https://www.instagram.com/iam_ayushbhushan?utm_source=qr&igsh=MWg1ZnJqODMyMG1ncg==" },
            ].map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noreferrer" className="ig-link">
                <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div style={{ width:48, height:48, background:"linear-gradient(135deg,#a855f7,#ec4899,#f97316)", borderRadius:"0.75rem", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📷</div>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff" }}>{p.name}</p>
                    <p style={{ fontSize:12, color:"#6b7280" }}>{p.handle}</p>
                  </div>
                </div>
                <span style={{ color:"#6b7280", fontSize:18 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FLOATING NAV */}
      <div className="glass-nav float-nav">
        <button className="float-btn" title="Dashboard" onClick={onDashboard}>📊</button>
        <button className="float-btn" title="Alerts">🔔</button>
        <div style={{ width:1, height:24, background:"rgba(255,255,255,0.1)", margin:"0 0.5rem" }} />
        <button className="float-btn" title="Live Monitoring" style={{ position:"relative" }}>
          📡
          <span style={{ position:"absolute", top:8, right:8, width:8, height:8, background:"#00D9FF", borderRadius:"50%", animation:"pulse 2s infinite" }} />
        </button>
        <button onClick={onEnter} style={{ background:"#FF6B50", color:"#000", padding:"0.75rem 1.5rem", borderRadius:"9999px", border:"none", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", transition:"transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          Get Started
        </button>
      </div>
    </div>
  );
}