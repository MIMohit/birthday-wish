import { useState, useEffect } from "react";

interface CakePageProps {
  onAllCandlesBlown: () => void;
}

function CakePage({ onAllCandlesBlown }: CakePageProps) {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const allBlown = candles.every((c) => !c);

  useEffect(() => {
    if (allBlown) {
      const t = setTimeout(() => onAllCandlesBlown(), 900);
      return () => clearTimeout(t);
    }
  }, [allBlown, onAllCandlesBlown]);

  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-rose-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* soft bokeh lights */}
      <div className="bokeh" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 6}s` }} />
        ))}
      </div>

      <div className="text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-pink-100 mb-8 animate-fade-in drop-shadow-[0_14px_30px_rgba(0,0,0,.25)]">
          Make a wish and blow the candles 🌟
        </h2>

        <div className="cake-container">
          {/* candles */}
          <div className="candles-row">
            {candles.map((isLit, index) => (
              <div
                key={index}
                className="candle-wrapper"
                onClick={() => blowCandle(index)}
                style={{ animationDelay: `${index * 0.18}s` }}
                role="button"
                aria-label={`Candle ${index + 1}`}
              >
                <div className={`flame ${isLit ? "burning" : "blown"}`}>
                  {isLit && <div className="flame-inner" />}
                </div>
                <div className="candle" />
                <div className="wick" />
              </div>
            ))}
          </div>

          {/* cake */}
          <div className="cake-stage">
            <div className="cake-shadow" />
            <div className="plate" />

            <div className="cake cute-bob">
              <div className="cake-topper-sparkle" aria-hidden="true" />

              {/* top icing */}
              <div className="icing-top">
                <div className="icing-sheen" />
                {["12%", "28%", "46%", "64%", "82%"].map((l, i) => (
                  <div key={i} className="frosting-drip" style={{ left: l }} />
                ))}
                <div className="sprinkles">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <span key={i} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 180}deg)` }} />
                  ))}
                </div>
              </div>

              {/* layers */}
              <div className="layer layer-1">
                <div className="crumb" />
              </div>
              <div className="layer layer-2">
                <div className="cream-band" />
              </div>
              <div className="layer layer-3">
                <div className="crumb" />
              </div>

              {/* strawberries */}
              <div className="strawberry s1" />
              <div className="strawberry s2" />
              <div className="strawberry s3" />

              {/* cute face */}
              <div className="cake-face" aria-hidden="true">
                <span className="eye left" />
                <span className="eye right" />
                <span className="mouth" />
                <span className="blush left" />
                <span className="blush right" />
              </div>
            </div>
          </div>
        </div>

        {!allBlown && (
          <p className="mt-8 text-pink-200 text-lg animate-pulse">
            Click on each candle to blow it out ✨
          </p>
        )}
      </div>

      <style>{`
        /* bokeh */
        .bokeh { position:absolute; inset:0; pointer-events:none; opacity:.55; }
        .bokeh span{
          position:absolute;
          width: 120px; height:120px; border-radius:999px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.22), rgba(244,63,94,.12), transparent 70%);
          filter: blur(1px);
          animation: drift 8s ease-in-out infinite;
        }
        @keyframes drift{
          0%,100%{ transform: translate(0px,0px) scale(1); opacity:.55; }
          50%{ transform: translate(18px,-22px) scale(1.08); opacity:.8; }
        }

        .cake-container{ display:flex; flex-direction:column; align-items:center; gap: 10px; }

        .candles-row{
          display:flex;
          justify-content:center;
          gap: 14px;
          margin-bottom: 10px;
        }
        .candle-wrapper{
          width: 42px;
          height: 120px;
          position: relative;
          cursor:pointer;
          animation: popIn .55s ease both;
          filter: drop-shadow(0 18px 26px rgba(0,0,0,.18));
          user-select:none;
        }
        @keyframes popIn{ from{opacity:0; transform: translateY(10px) scale(.92);} to{opacity:1; transform: translateY(0) scale(1);} }

        .candle{
          position:absolute;
          left:50%;
          bottom: 10px;
          width: 18px;
          height: 70px;
          transform: translateX(-50%);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,.08)),
            repeating-linear-gradient(90deg, rgba(244,114,182,.95) 0 6px, rgba(251,207,232,.95) 6px 12px);
          border: 1px solid rgba(255,255,255,.22);
          box-shadow: inset 0 0 10px rgba(255,255,255,.18);
        }
        .wick{
          position:absolute;
          left:50%;
          bottom: 78px;
          width: 3px;
          height: 10px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(30,20,20,.9);
        }
        .flame{
          position:absolute;
          left:50%;
          bottom: 88px;
          width: 22px;
          height: 34px;
          transform: translateX(-50%);
          border-radius: 999px 999px 999px 999px;
          filter: drop-shadow(0 12px 20px rgba(250,204,21,.25));
          transition: opacity .3s ease, transform .3s ease;
        }
        .flame.burning{
          background: radial-gradient(circle at 40% 25%, rgba(255,255,255,.55), rgba(251,191,36,.95) 35%, rgba(249,115,22,.95) 68%, rgba(239,68,68,.85));
          animation: flicker .11s infinite alternate;
          opacity:1;
        }
        .flame .flame-inner{
          position:absolute;
          left:50%;
          top: 8px;
          width: 10px;
          height: 16px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: radial-gradient(circle at 40% 25%, rgba(255,255,255,.7), rgba(253,230,138,.95), transparent 70%);
          opacity:.9;
        }
        @keyframes flicker{
          from{ transform: translateX(-50%) rotate(-2deg) scale(.98); }
          to{ transform: translateX(-50%) rotate(2deg) scale(1.02); }
        }
        .flame.blown{
          opacity:0;
          transform: translateX(-50%) translateY(8px) scale(.8);
        }

        /* cake stage */
        .cake-stage{
          width:min(520px, 92vw);
          height: 420px;
          position:relative;
          display:flex;
          align-items:flex-end;
          justify-content:center;
        }
        .cake-shadow{
          position:absolute;
          bottom: 54px;
          width: 320px;
          height: 70px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(0,0,0,.35), transparent 70%);
          filter: blur(2px);
        }
        .plate{
          position:absolute;
          bottom: 38px;
          width: 420px;
          height: 90px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,.28), rgba(255,255,255,.12) 40%, rgba(255,255,255,.06)),
            linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.04));
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: inset 0 0 26px rgba(255,255,255,.08), 0 22px 50px rgba(0,0,0,.22);
        }

        .cake{
          width: 340px;
          height: 310px;
          position:absolute;
          bottom: 74px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-end;
          filter: drop-shadow(0 34px 60px rgba(0,0,0,.22));
        }
        .cute-bob{ animation: bob 3.4s ease-in-out infinite; transform-origin: 50% 100%; }
        @keyframes bob{ 0%,100%{ transform: translateY(0px); } 50%{ transform: translateY(-8px); } }

        .icing-top{
          width: 320px;
          height: 86px;
          border-radius: 28px 28px 22px 22px;
          background:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,.35), rgba(255,255,255,.12) 35%, transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.20), rgba(255,255,255,.06)),
            linear-gradient(135deg, rgba(251,207,232,.95), rgba(244,114,182,.92));
          border: 1px solid rgba(255,255,255,.22);
          position:relative;
          overflow:hidden;
          box-shadow: inset 0 -10px 20px rgba(0,0,0,.12);
        }
        .icing-sheen{
          position:absolute;
          inset:-40px -60px auto auto;
          width: 200px; height: 160px;
          transform: rotate(18deg);
          background: radial-gradient(circle, rgba(255,255,255,.25), transparent 62%);
          opacity:.7;
          animation: sheen 4.6s ease-in-out infinite;
        }
        @keyframes sheen{ 0%,100%{ transform: rotate(18deg) translateX(0);} 50%{ transform: rotate(18deg) translateX(-22px);} }

        .frosting-drip{
          position:absolute;
          top: 62px;
          width: 18px;
          height: 46px;
          border-radius: 0 0 999px 999px;
          background: linear-gradient(180deg, rgba(244,114,182,.95), rgba(251,207,232,.92));
          box-shadow: inset 0 -10px 16px rgba(0,0,0,.12);
          opacity:.95;
          animation: dripWiggle 2.6s ease-in-out infinite;
        }
        @keyframes dripWiggle{ 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(2px);} }

        .sprinkles{
          position:absolute;
          inset: 10px 12px;
          pointer-events:none;
          opacity:.9;
        }
        .sprinkles span{
          position:absolute;
          width: 12px; height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,.7), rgba(255,255,255,.25));
          box-shadow: 0 6px 10px rgba(0,0,0,.10);
          opacity:.55;
        }

        .layer{
          width: 330px;
          height: 70px;
          border-radius: 22px;
          margin-top: -8px;
          position:relative;
          border: 1px solid rgba(255,255,255,.16);
          overflow:hidden;
        }
        .layer-1{
          background:
            radial-gradient(circle at 30% 35%, rgba(255,255,255,.18), transparent 55%),
            linear-gradient(180deg, rgba(253,164,175,.95), rgba(244,63,94,.85));
          box-shadow: inset 0 -14px 22px rgba(0,0,0,.14);
        }
        .layer-2{
          background:
            radial-gradient(circle at 30% 35%, rgba(255,255,255,.16), transparent 55%),
            linear-gradient(180deg, rgba(251,207,232,.92), rgba(244,114,182,.82));
          box-shadow: inset 0 -14px 22px rgba(0,0,0,.14);
        }
        .layer-3{
          background:
            radial-gradient(circle at 30% 35%, rgba(255,255,255,.18), transparent 55%),
            linear-gradient(180deg, rgba(253,164,175,.95), rgba(244,63,94,.85));
          box-shadow: inset 0 -14px 22px rgba(0,0,0,.14);
        }
        .crumb{
          position:absolute;
          inset:0;
          background:
            radial-gradient(circle at 20% 40%, rgba(255,255,255,.10), transparent 55%),
            radial-gradient(circle at 60% 50%, rgba(0,0,0,.10), transparent 55%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,.08), transparent 55%);
          opacity:.7;
        }
        .cream-band{
          position:absolute;
          left: 0; right: 0;
          top: 18px;
          height: 30px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,.10));
          box-shadow: inset 0 -10px 20px rgba(0,0,0,.10);
          opacity:.8;
        }

        .strawberry{
          position:absolute;
          top: -10px;
          width: 44px;
          height: 44px;
          border-radius: 18px 18px 26px 26px;
          background:
            radial-gradient(circle at 30% 25%, rgba(255,255,255,.22), rgba(239,68,68,.98) 40%, rgba(190,18,60,1));
          box-shadow: 0 16px 26px rgba(0,0,0,.18);
        }
        .strawberry:before{
          content:"";
          position:absolute;
          left:50%;
          top:-12px;
          width: 26px; height: 18px;
          transform: translateX(-50%);
          border-radius: 999px 999px 10px 10px;
          background: linear-gradient(135deg, rgba(34,197,94,.95), rgba(22,163,74,1));
          box-shadow: 0 10px 16px rgba(0,0,0,.12);
        }
        .s1{ left: 64px; }
        .s2{ left: 148px; top: -16px; transform: rotate(-8deg); }
        .s3{ right: 64px; top: -12px; transform: rotate(10deg); }

        .cake-face{
          position:absolute;
          left:50%;
          top: 164px;
          width: 210px;
          height: 86px;
          transform: translateX(-50%);
          opacity:.9;
          filter: drop-shadow(0 10px 14px rgba(0,0,0,.10));
        }
        .eye{
          position:absolute;
          top: 24px;
          width: 16px;
          height: 22px;
          border-radius: 999px;
          background: rgba(20,10,16,.75);
        }
        .eye:after{
          content:"";
          position:absolute;
          left:4px;
          top:4px;
          width: 6px;
          height: 6px;
          border-radius:999px;
          background: rgba(255,255,255,.6);
        }
        .eye.left{ left: 64px; }
        .eye.right{ right: 64px; }

        .mouth{
          position:absolute;
          left:50%;
          top: 46px;
          width: 26px;
          height: 14px;
          transform: translateX(-50%);
          border-radius: 0 0 999px 999px;
          border: 3px solid rgba(20,10,16,.65);
          border-top: none;
          opacity:.9;
        }
        .blush{
          position:absolute;
          top: 44px;
          width: 24px;
          height: 14px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(251,113,133,.55), transparent 70%);
        }
        .blush.left{ left: 34px; }
        .blush.right{ right: 34px; }

        .cake-topper-sparkle{
          position:absolute;
          left: 50%;
          top: -34px;
          width: 180px;
          height: 80px;
          transform: translateX(-50%);
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.18), transparent 65%);
          opacity:.55;
          animation: sparkle 3.2s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes sparkle{ 0%,100%{ opacity:.35; transform: translateX(-50%) scale(1);} 50%{ opacity:.65; transform: translateX(-50%) scale(1.06);} }

        .animate-fade-in{ animation: fadeIn .8s ease both; }
        @keyframes fadeIn{ from{ opacity:0; transform: translateY(14px);} to{opacity:1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

export default CakePage;
