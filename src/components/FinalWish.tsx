import { Heart, Sparkles, Star } from 'lucide-react';

function FinalWish() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#ff6b9d', '#ffd93d', '#95e1d3', '#f38181', '#aa96da'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="text-center z-10 max-w-3xl mx-auto animate-scale-in">
        <div className="mb-8 flex justify-center gap-4">
          <Star className="w-12 h-12 text-yellow-500 animate-spin-slow" fill="currentColor" />
          <Heart className="w-16 h-16 text-rose-500 animate-pulse" fill="currentColor" />
          <Star className="w-12 h-12 text-yellow-500 animate-spin-slow" fill="currentColor" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 mb-12 animate-bounce-slow">
          HAPPY BIRTHDAY! 🎉
        </h1>

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-10 h-10 text-amber-500" />
          </div>

          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-6">
            On this special day, I want you to know how incredibly blessed I am to have you in my life.
          </p>

          <div className="mb-8 text-center">

            {/* Arz Kiya Hai Line */}
            <p className="text-sm md:text-base tracking-widest uppercase text-rose-400 font-semibold mb-4">
              Ghalib kehte hai...
            </p>

            {/* Main Shayari Quote */}
            <blockquote className="relative">
              <p className="text-2xl md:text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 leading-relaxed">
                “Aaina kyun na doon ke tamasha kahe jise,
                <br />
                Aisa kahan se laun ke tujh sa kahe jise.”
              </p>

              {/* Decorative Line */}
              <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
            </blockquote>

          </div>

          {/* <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            You bring sunshine to the cloudiest days and warmth to the coldest moments. Your smile lights up the world, and your kindness touches every heart around you.
          </p> */}

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            May this year bring you endless joy, beautiful surprises, and all the love your heart can hold. May your dreams blossom like the most beautiful flowers and your happiness multiply with each passing day.
          </p>

          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 mb-4">
            You deserve all the wonderful things life has to offer! 💝
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0s' }}>🌹</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.1s' }}>🌻</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎂</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎈</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
          </div>
        </div>

        <p className="mt-8 text-2xl font-script text-rose-600 italic">
          With all my love, always ❤️
        </p>
      </div>
    </div>
  );
}

export default FinalWish;
