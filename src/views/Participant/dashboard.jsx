import { useState, useEffect } from "react";
import Authinfo from "../../components/AuthInfo";
import NavBarOpearator from "../../components/operator/NavBarOpearator";
import PostCard from "../../components/operator/PostCard";

export default function Dashboard() {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts/all');
            const data = await response.json();
            setPosts(data.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des annonces :", err);
            setError("Impossible de charger les annonces.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
            if (user && user.id) {
                fetchPosts(user.id);
            }
        } catch (err) {
            console.error("Erreur lors du chargement de l'utilisateur :", err);
            setError("Utilisateur introuvable.");
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* NavBar fixe en haut */}
            <div className="fixed top-0 left-0 right-0 z-20">
                <NavBarOpearator />
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
                        <button
                            onClick={() => window.location.href = '/statistics'}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        >
                            Mes Postulations
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-purple-900 via-cyan-900 to-blue-900 relative">
                    {/* Overlay néon */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 via-cyan-300/80 to-blue-600/80 backdrop-filter backdrop-blur-sm"></div>

                    <div className="relative z-10">
                        {/* Gestion du chargement */}
                        {loading ? (
                            <div className="text-center text-cyan-100 mt-12">Chargement en cours...</div>
                        ) : error ? (
                            <div className="text-center text-red-400 mt-12">{error}</div>
                        ) : (
                            <PostCard posts={posts} user={user}/>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
