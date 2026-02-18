import React, { useEffect, useMemo, useRef, useState } from "react";
import LandingPage from "./components/LandingPage";
import BirthdayReveal from "./components/BirthdayReveal";
import FlowerBouquet from "./components/FlowerBouquet";
import CakePage from "./components/CakePage";
import FinalWish from "./components/FinalWish";

type Stage =
  | "unlock" // tap screen first
  | "boot"   // first delay starts AFTER tap
  | "landing"
  | "t1"
  | "reveal"
  | "t2"
  | "flowers"
  | "t3"
  | "cake"
  | "final";

type MusicMode = "landingShort" | "intro" | "bouquet" | "cake";

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
          <div
            className="progress-bar"
            style={{ animationDuration: `${seconds}s` }}
          />
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
  const [musicMode, setMusicMode] = useState<MusicMode>("landingShort");

  // ✅ One tap unlock for Apple devices
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // ✅ Global audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Change these paths if your filenames differ
  const TRACKS: Record<MusicMode, string> = {
    landingShort: "/audio/landing.mp3",
    intro: "/audio/intro.mp3",
    bouquet: "/audio/bouquet.mp3",
    cake: "/audio/cake.mp3",
  };

  // --- Helpers
  const setTrack = (mode: MusicMode) => {
    const a = audioRef.current;
    if (!a) return;

    const nextSrc = TRACKS[mode];
    const current = a.getAttribute("data-track") || "";

    if (current !== nextSrc) {
      a.src = nextSrc;
      a.setAttribute("data-track", nextSrc);
    }

    a.loop = true;
    a.preload = "auto";
  };

  const tryPlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
    } catch {
      // iOS will fail play() until unlocked by user gesture
    }
  };

  // ✅ Keep audio in sync when musicMode changes (no breaks)
  useEffect(() => {
    setTrack(musicMode);
    if (audioUnlocked) {
      void tryPlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicMode, audioUnlocked]);

  // ✅ Boot -> Landing delay
  useEffect(() => {
    if (stage !== "boot") return;
    const t = setTimeout(() => setStage("landing"), 5000);
    return () => clearTimeout(t);
  }, [stage]);

  // ✅ Other transitions auto-advance
  useEffect(() => {
    let next: Stage | null = null;
    if (stage === "t1") next = "reveal";
    if (stage === "t2") next = "flowers";
    if (stage === "t3") next = "cake";
    if (!next) return;

    const t = setTimeout(() => setStage(next!), 5000);
    return () => clearTimeout(t);
  }, [stage]);

  // ✅ Tap once -> unlock + start first delay + start landing track
  const unlockAndStart = async () => {
    setAudioUnlocked(true);
    setMusicMode("landingShort"); // landing music starts now
    setStage("boot");

    // start playback within the user gesture (best for iOS)
    setTrack("landingShort");
    await tryPlay();
  };

  // Your original flow
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

  return (
    <div className="min-h-screen relative">
      {/* ✅ Global audio (single instance, no breaking) */}
      <audio ref={audioRef} playsInline />

      {/* ✅ Tap screen first (boot begins AFTER tap) */}
      {stage === "unlock" && (
        <div
          onClick={unlockAndStart}
          role="button"
          aria-label="Tap to start"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "linear-gradient(135deg,#fbcfe8,#fda4af)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 16,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.45)",
              padding: "28px 34px",
              borderRadius: "24px",
              backdropFilter: "blur(12px)",
              textAlign: "center",
              color: "#be185d",
              boxShadow: "0 18px 50px rgba(0,0,0,.18)",
              border: "1px solid rgba(255,255,255,.55)",
              maxWidth: "min(520px, 92vw)",
            }}
          >
            <div style={{ fontSize: "1.7rem", fontWeight: 900 }}>
              🎵 Tap to start the magic
            </div>
          </div>
        </div>
      )}

      {/* ✅ First delay screen (landing music already playing) */}
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
              you really wanna know? don&apos;t worry
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
              btw, what&apos;s a birthday without a cake
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
