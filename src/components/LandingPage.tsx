import { Heart } from "lucide-react";

interface LandingPageProps {
  onYesClick: () => void;
}

function LandingPage({ onYesClick }: LandingPageProps) {
  const bokeh = Array.from({ length: 14 }).map((_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    size: `${90 + Math.random() * 140}px`,
  }));

  const balloons = Array.from({ length: 8 }).map((_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${9 + Math.random() * 6}s`,
    scale: 0.85 + Math.random() * 0.6,
    emoji: ["🎈", "🎀", "✨", "💗"][Math.floor(Math.random() * 4)],
  }));

  const teddies = Array.from({ length: 5 }).map((_, i) => ({
    key: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 60}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 6}s`,
    size: `${1.8 + Math.random() * 1.2}rem`,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Cute pink sky */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200" />

      {/* Soft bokeh */}
      <div className="absolute inset-0 pointer-events-none">
        {bokeh.map((b) => (
          <span
            key={b.key}
            className="bokeh"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Balloons / ribbons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((b) => (
          <div
            key={b.key}
            className="balloon"
            style={{
              left: b.left,
              animationDelay: b.delay,
              animationDuration: b.duration,
              transform: `scale(${b.scale})`,
            }}
          >
            {b.emoji}
          </div>
        ))}
      </div>

      {/* Floating teddies */}
      <div className="absolute inset-0 pointer-events-none">
        {teddies.map((t) => (
          <div
            key={t.key}
            className="teddy"
            style={{
              left: t.left,
              top: t.top,
              animationDelay: t.delay,
              animationDuration: t.duration,
              fontSize: t.size,
            }}
          >
            🧸
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 text-center animate-fade-in">
        <div className="mx-auto mb-8 w-[min(900px,96vw)] rounded-3xl border border-white/40 bg-white/30 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex justify-center">
            <div className="heart-ring">
              <Heart className="w-16 h-16 text-rose-500" fill="currentColor" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-gray-800 mb-10 leading-relaxed">
            Hello m&apos;lady!!
            <br />
            <span className="text-rose-600">Do you know what day it is?</span>
          </h1>

          <div className="flex gap-6 justify-center mt-8 flex-wrap">
            <button
              onClick={onYesClick}
              className="btn btn-rose"
            >
              Yes 💝
            </button>
            <button
              onClick={onYesClick}
              className="btn btn-amber"
            >
              No 😄
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .btn{
          padding: 14px 44px;
          border-radius: 999px;
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
          border: 1px solid rgba(255,255,255,.35);
          box-shadow: 0 22px 50px rgba(0,0,0,.18);
          transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
          backdrop-filter: blur(10px);
        }
        .btn:active{ transform: scale(.98); }
        .btn:hover{ transform: translateY(-2px) scale(1.03); filter: brightness(1.03); }
        .btn-rose{ background: linear-gradient(135deg, rgba(236,72,153,.95), rgba(244,63,94,.95)); }
        .btn-amber{ background: linear-gradient(135deg, rgba(251,191,36,.95), rgba(249,115,22,.95)); }

        .bokeh{
          position:absolute;
          border-radius:999px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.26), rgba(244,114,182,.14), transparent 70%);
          filter: blur(1px);
          opacity:.75;
          animation: drift 8s ease-in-out infinite;
        }
        @keyframes drift{
          0%,100%{ transform: translate(0,0) scale(1); opacity:.65; }
          50%{ transform: translate(18px,-22px) scale(1.08); opacity:.9; }
        }

        .balloon{
          position:absolute;
          top: 105%;
          font-size: 2.2rem;
          opacity:.75;
          filter: drop-shadow(0 16px 22px rgba(0,0,0,.10));
          animation: floatUp linear infinite;
        }
        @keyframes floatUp{
          0%{ transform: translateY(0) rotate(-6deg); opacity:0; }
          12%{ opacity:.75; }
          100%{ transform: translateY(-130vh) rotate(6deg); opacity:0; }
        }

        .teddy{
          position:absolute;
          opacity:.55;
          filter: drop-shadow(0 14px 18px rgba(0,0,0,.10));
          animation: teddyFloat ease-in-out infinite;
        }
        @keyframes teddyFloat{
          0%,100%{ transform: translateY(0px) rotate(-3deg); }
          50%{ transform: translateY(18px) rotate(4deg); }
        }

        .heart-ring{
          width: 92px;
          height: 92px;
          border-radius: 999px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.75), rgba(255,255,255,.18));
          border: 1px solid rgba(255,255,255,.55);
          box-shadow: 0 20px 45px rgba(244,63,94,.20);
          animation: pulseGlow 2.2s ease-in-out infinite;
        }
        @keyframes pulseGlow{
          0%,100%{ transform: scale(1); box-shadow: 0 20px 45px rgba(244,63,94,.20); }
          50%{ transform: scale(1.05); box-shadow: 0 26px 55px rgba(244,63,94,.26); }
        }

        .animate-fade-in{ animation: fadeIn .8s ease both; }
        @keyframes fadeIn{ from{ opacity:0; transform: translateY(14px);} to{opacity:1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

export default LandingPage;
