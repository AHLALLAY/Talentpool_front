import NavBarOperator from "../../components/operator/NavBarOperator";
import Authinfo from "../../components/AuthInfo";


export default function Application() {
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* NavBar fixe en haut */}
            <div className="fixed top-0 left-0 right-0 z-20">
                <NavBarOperator />
            </div>

            {/* Contenu principal (flex container) */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar uniquement en desktop */}
                <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-purple-500/40 p-4 flex-col backdrop-blur-sm hidden lg:flex">
                    <Authinfo />
                    <div className="space-y-3 mt-4">
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        >
                            Dashboard
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-purple-900 via-cyan-900 to-blue-900 relative">

                </main>
            </div>
        </div>
    );
}