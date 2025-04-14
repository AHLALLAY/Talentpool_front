export default function NavBarOpearator() {
    const handleLogout = () => {
        if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    };

    return (
        <nav className="bg-gray-900/80 backdrop-blur-sm shadow-lg py-3 px-6 fixed w-full top-0 z-50 border-b border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <div className="container mx-auto flex justify-between items-center w-full">
                <div className="flex items-center space-x-3 group">
                    <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-colors duration-300 group-hover:text-cyan-300">
                        Talent<span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]">Pool</span>
                    </span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={handleLogout}
                        className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,0.9)] transition-all duration-500 hover:from-red-600 hover:to-red-700 group overflow-hidden"
                    >
                        <span className="relative z-10">Déconnexion</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
                    </button>
                </div>
                <button className="md:hidden text-cyan-400 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}