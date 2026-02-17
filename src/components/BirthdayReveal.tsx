import { Sparkles, Gift, Star } from "lucide-react";

interface BirthdayRevealProps {
  onClickMe: () => void;
}

function BirthdayReveal({ onClickMe }: BirthdayRevealProps) {
  const confetti = Array.from({ length: 36 }).map((_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${3 + Math.random() * 3}s`,
    size: `${10 + Math.random() * 14}px`,
  }));

  const teddies = Array.from({ length: 6 }).map((_, i) => ({
    key: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 55}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${7 + Math.random() * 6}s`,
    size: `${2.0 + Math.random() * 1.5}rem`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti drizzle */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((c) => (
          <span
            key={c.key}
            className="confetti"
            style={{
              left: c.left,
              animationDelay: c.delay,
              animationDuration: c.duration,
              width: c.size,
              height: c.size,
            }}
          />
        ))}
      </div>

      {/* Floating teddies + birthday icons */}
      <div className="absolute inset-0 pointer-events-none">
        {teddies.map((t) => (
          <div
            key={t.key}
            className="teddy2"
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
        <div className="floatBadge b1">🎂</div>
        <div className="floatBadge b2">🎉</div>
        <div className="floatBadge b3">🎀</div>
        <div className="floatBadge b4">💗</div>
      </div>

      {/* Card */}
      <div className="text-center z-10">
        <div className="mx-auto w-[min(1000px,96vw)] rounded-[34px] border border-white/45 bg-white/28 p-12 shadow-2xl backdrop-blur-xl animate-pop">
          <div className="mb-8 flex justify-center gap-4">
            <Sparkles className="w-12 h-12 text-yellow-400 spin-slow" />
            <Gift className="w-16 h-16 text-pink-600 bounce-soft" />
            <Sparkles className="w-12 h-12 text-yellow-400 spin-slow" />
          </div>

          <h1 className="birthday-title">
            It&apos;s your Birthdayyyyyyyy!!!!
          </h1>

          <div className="flex justify-center gap-8 mb-10 flex-wrap">
            <div className="bounce-delay" style={{ animationDelay: "0s" }}>
              <Star className="w-20 h-20 text-rose-300" fill="currentColor" />
            </div>
            <div className="bounce-delay" style={{ animationDelay: "0.18s" }}>
              <Star className="w-24 h-24 text-pink-400" fill="currentColor" />
            </div>
            <div className="bounce-delay" style={{ animationDelay: "0.36s" }}>
              <Star className="w-20 h-20 text-rose-400" fill="currentColor" />
            </div>
          </div>

          <button onClick={onClickMe} className="clickme">
            Click Me 💕
          </button>

          <p className="mt-5 text-sm text-rose/400">
            Warning: clicking may cause happiness overload ✨😄
          </p>
        </div>
      </div>

      <style>{`
        .animate-pop{ animation: pop .85s cubic-bezier(.2,.9,.2,1) both; }
        @keyframes pop{
          from{ opacity:0; transform: translateY(16px) scale(.96); }
          to{ opacity:1; transform: translateY(0) scale(1); }
        }

        .confetti{
          position:absolute;
          top:-10%;
          border-radius: 4px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.45), rgba(255,255,255,.08)),
            radial-gradient(circle at 30% 30%, rgba(251,191,36,.95), rgba(244,63,94,.9));
          box-shadow: 0 12px 20px rgba(0,0,0,.12);
          opacity:.85;
          animation: confFall linear infinite;
        }
        @keyframes confFall{
          0%{ transform: translateY(-10vh) rotate(0deg); opacity:0; }
          10%{ opacity:.9; }
          100%{ transform: translateY(120vh) rotate(540deg); opacity:0; }
        }

        .teddy2{
          position:absolute;
          opacity:.58;
          filter: drop-shadow(0 16px 20px rgba(0,0,0,.12));
          animation: teddyFloat2 ease-in-out infinite;
        }
        @keyframes teddyFloat2{
          0%,100%{ transform: translateY(0px) rotate(-4deg); }
          50%{ transform: translateY(18px) rotate(5deg); }
        }

        .floatBadge{
          position:absolute;
          font-size: 2.1rem;
          opacity:.65;
          filter: drop-shadow(0 16px 22px rgba(0,0,0,.10));
          animation: badgeFloat 6.5s ease-in-out infinite;
        }
        .b1{ left: 8%; top: 12%; }
        .b2{ right: 10%; top: 18%; animation-delay: .6s; }
        .b3{ left: 14%; bottom: 18%; animation-delay: 1.1s; }
        .b4{ right: 14%; bottom: 16%; animation-delay: 1.7s; }
        @keyframes badgeFloat{
          0%,100%{ transform: translateY(0px) rotate(-6deg); }
          50%{ transform: translateY(18px) rotate(8deg); }
        }

        .spin-slow{ animation: spinSlow 3.2s linear infinite; }
        @keyframes spinSlow{ from{ transform: rotate(0deg);} to{ transform: rotate(360deg);} }

        .bounce-soft{ animation: bounceSoft 1.6s ease-in-out infinite; }
        @keyframes bounceSoft{
          0%,100%{ transform: translateY(0px); }
          50%{ transform: translateY(-10px); }
        }

        .bounce-delay{ animation: bounceSoft 1.6s ease-in-out infinite; }

        .birthday-title{
          font-family: 'Lilita One', cursive;
          font-size: clamp(30px, 5vw, 72px);
          line-height: 1.05;
          padding: 0 12px;
          background: linear-gradient(90deg, #ec4899, #f43f5e, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          letter-spacing: 0.5px;
        }

        .clickme{
          padding: 18px 54px;
          border-radius: 999px;
          font-size: 2rem;
          font-weight: 900;
          color: white;
          background: linear-gradient(135deg, rgba(236,72,153,.98), rgba(244,63,94,.95));
          border: 1px solid rgba(255,255,255,.35);
          box-shadow: 0 26px 70px rgba(244,63,94,.28);
          transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
          animation: wiggle 2.4s ease-in-out infinite;
        }
        .clickme:hover{ transform: translateY(-2px) scale(1.04); filter: brightness(1.03); }
        .clickme:active{ transform: scale(.98); }
        @keyframes wiggle{
          0%,100%{ transform: rotate(0deg); }
          25%{ transform: rotate(-1deg); }
          50%{ transform: rotate(1deg); }
          75%{ transform: rotate(-.6deg); }
        }
      `}</style>
    </div>
  );
}

export default BirthdayReveal;
