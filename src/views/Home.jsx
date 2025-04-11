import NavBarHome from '../components/NavBarHome';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-900 text-white overflow-hidden">
      <NavBarHome />
      <main className="flex-grow bg-gradient-to-b from-blue-800 via-purple-800 to-gray-900 w-full relative">
        {/* Glow en arrière-plan */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-200"></div>

        <div className="mx-auto py-20 px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                Bienvenue sur
              </span>

              <span className="block mt-4 text-6xl md:text-7xl font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                Talent
              </span>

              <span className="ml-2 inline-flex items-center font-mono text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                P
                <span className="inline-flex items-center mx-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A5D8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 animate-pulse text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]">
                    <circle cx="11" cy="11" r="6"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A5D8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 -ml-2 animate-pulse delay-150 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]">
                    <circle cx="11" cy="11" r="6"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                l
              </span>
            </h1>

            <p className="mt-6 mx-auto text-xl text-cyan-200 max-w-2xl drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">
              Découvrez nos services exceptionnels en vous connectant ou en créant un compte.
            </p>

            <div className="mt-10 flex justify-center space-x-6">
              <button
                onClick={() => window.location.href = '/login'}
                className="relative px-8 py-3 text-base font-bold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.7)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)]"
              >
                Se connecter
              </button>

              <button
                onClick={() => window.location.href = '/register'}
                className="relative px-8 py-3 text-base font-bold rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-500 shadow-[0_0_20px_rgba(219,39,119,0.6)] hover:shadow-[0_0_30px_rgba(219,39,119,0.8)]"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
