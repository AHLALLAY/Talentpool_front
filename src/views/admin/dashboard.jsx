import { useState, useEffect } from "react";
import Authinfo from "../../components/AuthInfo";
import NavBarAuth from "../../components/NavBarAuth";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalParticipants: 0,
        totalOperators: 0,
        totalPosts: 0,
        users: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer toutes les statistiques en une seule requête
                const response = await fetch('');
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.message || "Erreur de chargement");
                
                setStats({
                    totalUsers: data.total_users,
                    totalParticipants: data.total_participants,
                    totalOperators: data.total_operators,
                    totalPosts: data.total_posts,
                    users: data.users
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-cyan-400 text-xl">Chargement en cours...</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-red-400 text-xl">Erreur: {error}</div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* NavBar fixe en haut */}
            <div className="fixed top-0 left-0 right-0 z-20">
                <NavBarAuth />
            </div>

            {/* Contenu principal */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-purple-500/40 p-4 flex flex-col backdrop-blur-sm hidden lg:flex">
                    <Authinfo />
                    <div className="mt-6 space-y-3">
                        <button
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                            Tableau de bord
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-purple-900 via-cyan-900 to-blue-900 relative">
                    {/* Overlay pour l'effet néon */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 via-cyan-300/80 to-blue-600/80 backdrop-filter backdrop-blur-sm"></div>
                    
                    {/* Effets de lueur */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse -z-10"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                            Tableau de bord Admin
                        </h1>

                        {/* Cartes de statistiques */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Carte Utilisateurs totaux */}
                            <div className="bg-gray-800/40 border border-purple-500/30 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
                                <h2 className="text-lg font-medium text-purple-300 mb-2">Utilisateurs Totaux</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
                            </div>

                            {/* Carte Participants */}
                            <div className="bg-gray-800/40 border border-cyan-500/30 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all">
                                <h2 className="text-lg font-medium text-cyan-300 mb-2">Participants</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalParticipants}</p>
                            </div>

                            {/* Carte Opérateurs */}
                            <div className="bg-gray-800/40 border border-blue-500/30 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all">
                                <h2 className="text-lg font-medium text-blue-300 mb-2">Opérateurs</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalOperators}</p>
                            </div>

                            {/* Carte Annonces */}
                            <div className="bg-gray-800/40 border border-pink-500/30 rounded-xl p-6 shadow-lg hover:shadow-[0_0_25px_rgba(219,39,119,0.3)] transition-all">
                                <h2 className="text-lg font-medium text-pink-300 mb-2">Annonces Publiées</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalPosts}</p>
                            </div>
                        </div>

                        {/* Tableau des utilisateurs */}
                        <div className="bg-gray-800/30 border border-blue-500/20 rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                                Liste des Utilisateurs
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                                Nom
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                                                Rôle
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-pink-300 uppercase tracking-wider">
                                                Date d'inscription
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800/20 divide-y divide-gray-700">
                                        {stats.users.map((user, index) => (
                                            <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.roles === 'operator' 
                                                            ? 'bg-blue-500/20 text-blue-300' 
                                                            : 'bg-cyan-500/20 text-cyan-300'
                                                    }`}>
                                                        {user.roles}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}