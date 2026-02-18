import React, { useEffect, useMemo, useState } from "react";
import LandingPage from "./components/LandingPage";
import BirthdayReveal from "./components/BirthdayReveal";
import FlowerBouquet from "./components/FlowerBouquet";
import CakePage from "./components/CakePage";
import FinalWish from "./components/FinalWish";

type Stage =
  | "unlock" // ✅ user taps play once here (iOS-friendly)
  | "boot"
  | "landing"
  | "t1"
  | "reveal"
  | "t2"
  | "flowers"
  | "t3"
  | "cake"
  | "final";

function TransitionScreen({
  text,
  seconds = 5,
}: {
  text: React.ReactNode;
  seconds?: number;
}) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        dur: `${4 + Math.random() * 3}s`,
        emoji: ["✨", "💗", "🎀", "🧸", "🌸"][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-200" />

      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <div
            key={s.key}
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              fontSize: "1.6rem",
              opacity: 0.72,
              filter: "drop-shadow(0 14px 18px rgba(0,0,0,.12))",
              animation: `floaty ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          >
            {s.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-[min(980px,96vw)] rounded-[32px] border border-white/50 bg-white/30 p-10 shadow-2xl backdrop-blur-xl text-center">
        <div className="text-[clamp(22px,3vw,40px)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 leading-tight">
          {text}
        </div>

        <div className="mt-7 flex items-center justify-center gap-5">
          <div className="spinner" />
          <div className="loading-text">
            Loading<span className="dots">...</span>
          </div>
        </div>

        <div className="progress-container mt-7">
          <div className="progress-bar" style={{ animationDuration: `${seconds}s` }} />
        </div>
      </div>

      <style>{`
        @keyframes floaty{
          0%,100%{ transform: translateY(0px) rotate(-6deg); }
          50%{ transform: translateY(18px) rotate(6deg); }
        }

        .spinner{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 5px solid rgba(255,255,255,.45);
          border-top: 5px solid rgba(236,72,153,.95);
          animation: spin 1.1s linear infinite;
          box-shadow: 0 12px 34px rgba(236,72,153,.25);
        }
        @keyframes spin{ from{ transform: rotate(0deg);} to{ transform: rotate(360deg);} }

        .loading-text{
          font-size: 1.05rem;
          font-weight: 800;
          color: rgba(236,72,153,.95);
          letter-spacing: .2px;
          text-shadow: 0 10px 18px rgba(0,0,0,.10);
        }
        .dots{
          display:inline-block;
          width: 24px;
          text-align:left;
          animation: dots 1.2s steps(4) infinite;
        }
        @keyframes dots{
          0%{ opacity:.5; }
          25%{ opacity:.75; }
          50%{ opacity:1; }
          75%{ opacity:.75; }
          100%{ opacity:.5; }
        }

        .progress-container{
          width: 100%;
          height: 9px;
          background: rgba(255,255,255,.38);
          border-radius: 999px;
          overflow: hidden;
          box-shadow: inset 0 0 18px rgba(0,0,0,.08);
        }

        .progress-bar{
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, rgba(236,72,153,.95), rgba(244,63,94,.92), rgba(245,158,11,.95));
          animation: loadBar linear forwards;
          border-radius: 999px;
        }
        @keyframes loadBar{ from{ width:0%; } to{ width:100%; } }
      `}</style>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState<Stage>("unlock");

  const [musicMode, setMusicMode] = useState<
    "landingShort" | "intro" | "bouquet" | "cake"
  >("landingShort");

  // For iOS: start unmuted is fine once user presses play on the player itself
  const [muted, setMuted] = useState(false);

  // Controls ONLY for unlock stage (so user can press ▶)
  const showPlayerControls = stage === "unlock";

  // Player “visibility mode”: big on unlock, tiny afterward (but still on-screen)
  const playerIsBig = stage === "unlock";

  const LANDING_SHORT_ID = "maHSAImuzH8";
  const INTRO_SONG_ID = "c968eqcH3c0";
  const BOUQUET_SONG_ID = "4Oc6PTtcthA";
  const CAKE_SONG_ID = "IHVsjOtj278";

  const mkYtLoop = (id: string, mute: boolean, controls: boolean) =>
    `https://www.youtube.com/embed/${id}` +
    `?autoplay=1` +
    `&controls=${controls ? 1 : 0}` +
    `&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1` +
    `&playsinline=1&rel=0&loop=1&playlist=${id}` +
    `&mute=${mute ? 1 : 0}`;

  // ✅ boot -> landing delay
  useEffect(() => {
    if (stage !== "boot") return;
    const t = setTimeout(() => setStage("landing"), 4000);
    return () => clearTimeout(t);
  }, [stage]);

  // ✅ other delays auto-advance
  useEffect(() => {
    let next: Stage | null = null;
    if (stage === "t1") next = "reveal";
    if (stage === "t2") next = "flowers";
    if (stage === "t3") next = "cake";
    if (!next) return;

    const t = setTimeout(() => setStage(next!), 5000);
    return () => clearTimeout(t);
  }, [stage]);

  // User flow
  const handleContinueAfterPlay = () => {
    // After user taps ▶ on the visible player, they click Continue:
    // start the first delay screen
    setStage("boot");
  };

  const handleYesClick = () => {
    setMusicMode("intro");
    setStage("t1");
  };

  const handleClickMe = () => {
    setMusicMode("bouquet");
    setStage("t2");
  };

  const handleCakeTime = () => {
    setMusicMode("cake");
    setStage("t3");
  };

  const handleAllCandlesBlown = () => {
    setStage("final");
  };

  // ✅ landingShort plays from unlock -> boot -> landing until Yes/No
  const shouldPlay =
    (musicMode === "landingShort" &&
      (stage === "unlock" || stage === "boot" || stage === "landing")) ||
    (musicMode === "intro" && (stage === "t1" || stage === "reveal")) ||
    (musicMode === "bouquet" && (stage === "t2" || stage === "flowers" || stage === "t3")) ||
    (musicMode === "cake" && (stage === "cake" || stage === "final"));

  const musicId =
    musicMode === "landingShort"
      ? LANDING_SHORT_ID
      : musicMode === "intro"
      ? INTRO_SONG_ID
      : musicMode === "bouquet"
      ? BOUQUET_SONG_ID
      : CAKE_SONG_ID;

  // IMPORTANT: keep key stable across stage changes to avoid restarts
  // Only change when musicMode changes (and when controls toggle on unlock).
  const iframeKey = `${musicMode}-${showPlayerControls ? 1 : 0}-${muted ? 1 : 0}`;

  const musicSrc = mkYtLoop(musicId, muted, showPlayerControls);

  return (
    <div className="min-h-screen relative">
      {/* ✅ Global player (iOS-friendly: always on-screen, never offscreen) */}
      {shouldPlay && (
        <iframe
          key={iframeKey}
          src={musicSrc}
          title="Background music"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "fixed",
            right: 12,
            bottom: 12,
            width: playerIsBig ? 340 : 160,
            height: playerIsBig ? 190 : 90,
            opacity: playerIsBig ? 1 : 0.08, // tiny but not “invisible” for iOS
            pointerEvents: playerIsBig ? "auto" : "none",
            border: 0,
            borderRadius: 18,
            boxShadow: playerIsBig ? "0 18px 50px rgba(0,0,0,.28)" : "none",
            zIndex: 9998,
            transition: "all 350ms ease",
            background: "transparent",
          }}
        />
      )}

      {/* ✅ Unlock screen with visible player & Continue button */}
      {stage === "unlock" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "linear-gradient(135deg,#fbcfe8,#fda4af)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              width: "min(720px, 96vw)",
              borderRadius: 28,
              padding: 22,
              background: "rgba(255,255,255,.45)",
              border: "1px solid rgba(255,255,255,.65)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 18px 50px rgba(0,0,0,.18)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "#be185d",
              }}
            >
              hey hey, before we start…  🎉
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "rgba(190,24,93,.9)",
                lineHeight: 1.35,
              }}
            >
              Tap the ▶ on the little player at the bottom-right once,
              <br />
              then press <b>Continue</b>.
            </div>

            <button
              onClick={handleContinueAfterPlay}
              style={{
                marginTop: 16,
                padding: "14px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.6)",
                background:
                  "linear-gradient(135deg, rgba(236,72,153,.95), rgba(244,63,94,.92))",
                color: "white",
                fontWeight: 900,
                fontSize: "1.05rem",
                boxShadow: "0 16px 40px rgba(236,72,153,.25)",
                cursor: "pointer",
              }}
            >
              Continue ✨
            </button>

            <div style={{ marginTop: 10, fontSize: ".92rem", opacity: 0.75, color: "#9d174d" }}>
              (After this, you won’t need to tap again.)
            </div>
          </div>
        </div>
      )}

      {/* boot delay (starts after Continue) */}
      {stage === "boot" && (
        <TransitionScreen
          seconds={6}
          text={
            <>
              waittttt… 💗
              <br />
              the surprise is loading…
              <br />
              have some patience, senorita!
              <p className="mt-12 text-sm text-gray-600 italic">
                (ps. Increase the volume! ✨)
              </p>
            </>
          }
        />
      )}

      {stage === "landing" && <LandingPage onYesClick={handleYesClick} />}

      {stage === "t1" && (
        <TransitionScreen
          seconds={5}
          text={
            <>
              you really wanna know? don't worry
              <br />
              Main Hoon Na!!!
            </>
          }
        />
      )}

      {stage === "reveal" && <BirthdayReveal onClickMe={handleClickMe} />}

      {stage === "t2" && (
        <TransitionScreen
          seconds={5}
          text={
            <>
              hold your breatheeeeee,
              <br />
              cz something is coming from 9060 km away!
            </>
          }
        />
      )}

      {stage === "flowers" && <FlowerBouquet onCakeClick={handleCakeTime} />}

      {stage === "t3" && (
        <TransitionScreen
          seconds={5}
          text={
            <>
              btw, what is a birthday without a cake
              <br />
              and without birthday wish??
            </>
          }
        />
      )}

      {stage === "cake" && <CakePage onAllCandlesBlown={handleAllCandlesBlown} />}

      {stage === "final" && <FinalWish />}
    </div>
  );
}

export default App;
