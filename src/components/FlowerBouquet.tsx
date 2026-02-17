import bouquetVideo from "../../bouquet/bloom.mp4";

interface FlowerBouquetProps {
  onCakeClick: () => void;
}

function FlowerBouquet({ onCakeClick }: FlowerBouquetProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Cake Time button (top-right) */}
      <button
        className="cake-fab"
        onClick={() => {
          if (typeof onCakeClick === "function") onCakeClick();
        }}
      >
        <span className="cake-emoji">🎂</span>
        <span className="cake-text">click me</span>
      </button>

      {/* Video */}
      <video
        className="bouquet-video"
        src={bouquetVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlays */}
      <div className="overlay" />
      <div className="grain" />

      {/* Text */}
      <div className="content">
        <h2 className="title">A bouquet that blooms into forever 🌻🌹🌻</h2>
        <p className="sub">Bloom… gather… glow - just like love.</p>
        <p className="sub">Remember the Sunflower Thoery?!</p>
      </div>

      <style>{`
        .cake-fab{
          position:absolute;
          top:14px;
          right:14px;
          z-index:20;
          display:flex;
          align-items:center;
          gap:12px;
          padding:16px 22px;
          border-radius:999px;
          font-weight:900;
          color: rgba(255,255,255,.96);
          background: linear-gradient(135deg, rgba(251,191,36,.95), rgba(244,63,94,.9));
          border: 1px solid rgba(255,255,255,.35);
          box-shadow: 0 18px 44px rgba(0,0,0,.24);
          backdrop-filter: blur(10px);
        }
        .cake-fab:active{ transform: scale(.98); }
        .cake-emoji{ font-size: 1.9rem; filter: drop-shadow(0 10px 14px rgba(0,0,0,.22)); }
        .cake-text{ font-size: 1.15rem; letter-spacing:.2px; }

        .bouquet-video{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit: cover;
          transform: scale(1.03);
          filter: contrast(1.05) saturate(1.08);
        }

        .overlay{
          position:absolute; inset:0;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 55%),
            linear-gradient(180deg, rgba(17,24,39,.25), rgba(244,63,94,.18));
          backdrop-filter: blur(0.4px);
        }

        .grain{
          position:absolute; inset:-20%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
          opacity:.16;
          mix-blend-mode: overlay;
          animation: grainMove 6s steps(6) infinite;
          pointer-events:none;
        }
        @keyframes grainMove{
          0%{ transform: translate(0,0); }
          100%{ transform: translate(-6%, -6%); }
        }

        .content{
          position:relative;
          z-index:10;
          padding: 18px 22px;
          border-radius: 18px;
          text-align:center;
          color: rgba(255,255,255,.95);
          background: rgba(17,24,39,.22);
          border: 1px solid rgba(255,255,255,.22);
          box-shadow: 0 24px 60px rgba(0,0,0,.28);
          backdrop-filter: blur(10px);
          animation: rise .9s ease both;
          max-width: min(760px, 92vw);
        }
        @keyframes rise{
          from{ opacity:0; transform: translateY(16px); }
          to{ opacity:1; transform: translateY(0); }
        }

        .title{
          font-size: clamp(28px, 4vw, 44px);
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          text-shadow: 0 14px 30px rgba(0,0,0,.35);
        }
        .sub{
          margin-top: 10px;
          font-size: clamp(16px, 2vw, 20px);
          opacity:.92;
        }
        .tiny{
          margin-top: 8px;
          font-size: 0.92rem;
          opacity: .75;
        }
      `}</style>
    </div>
  );
}

export default FlowerBouquet;
