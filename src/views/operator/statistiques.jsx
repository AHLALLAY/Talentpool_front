import { useState, useEffect } from "react";
import Authinfo from "../../components/AuthInfo";
import NavBarAuth from "../../components/NavBarAuth";

export default function Statistics() {
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalApplications: 0,
        postsWithApplications: []
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/applications/${applicationId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
          });
      
          if (!res.ok) throw new Error("Erreur lors de la mise à jour.");
      
          // Recharger les stats ou mettre à jour localement
          alert("Statut mis à jour !");
        } catch (error) {
          alert("Erreur : " + error.message);
        }
      };
      

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const operatorId = user?.id;

        if (!operatorId) {
            setError("Utilisateur non connecté.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const postsRes = await fetch(`http://127.0.0.1:8000/api/posts/total/${operatorId}`);
                const appsRes = await fetch(`http://127.0.0.1:8000/api/applications/posts/operator/${operatorId}`);
                const apps = await fetch(`http://127.0.0.1:8000/api/posts/all/${operatorId}`);

                if (!postsRes.ok || !appsRes.ok) {
                    throw new Error("Erreur lors du chargement des statistiques.");
                }

                const postsData = await postsRes.json();
                const appsData = await appsRes.json();
                const app = await apps.json();

                console.log(app.data);

                setStats({
                    totalPosts: parseInt(postsData.number),
                    totalApplications: parseInt(appsData.data),
                    postsWithApplications: app.data || []
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div style={{ color: 'red' }}>Erreur : {error}</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <div className="fixed top-0 left-0 right-0 z-20">
                <NavBarAuth />
            </div>

            <div className="flex flex-1 pt-16">
                <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-purple-500/40 p-4 flex flex-col backdrop-blur-sm hidden lg:flex">
                    <Authinfo />
                    <div className="space-y-3 mt-4">
                        <button
                            onClick={() => window.location.href = '/operator'}
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all"
                        >
                            Gérer les Annonces
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-purple-900 via-cyan-900 to-blue-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-cyan-900/50 to-blue-900/50 backdrop-filter backdrop-blur-sm"></div>

                    {/* Effets lumineux (optionnels) */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse -z-10"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                            Statistiques
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-gray-800/40 border border-purple-500/30 rounded-xl p-6 shadow-lg">
                                <h2 className="text-lg font-medium text-purple-300 mb-2">Total des Annonces</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalPosts}</p>
                            </div>

                            <div className="bg-gray-800/40 border border-cyan-500/30 rounded-xl p-6 shadow-lg">
                                <h2 className="text-lg font-medium text-cyan-300 mb-2">Total des Postulations</h2>
                                <p className="text-4xl font-bold text-white">{stats.totalApplications}</p>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 border border-blue-500/20 rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-6">
                                Détail des Annonces
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-800/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Titre de l'annonce</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Nom du candidat</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Date de postulation</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Statut</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800/20 divide-y divide-gray-700">
                                        {stats.postsWithApplications.length > 0 ? (
                                            stats.postsWithApplications.flatMap((post) =>
                                                post.applications.map((app) => (
                                                    <tr key={app.id} className="hover:bg-gray-700/30 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{post.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{app.user?.name || 'N/A'}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {new Date(app.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'accepted'
                                                                    ? 'bg-green-500/20 text-green-300'
                                                                    : app.status === 'rejected'
                                                                        ? 'bg-red-500/20 text-red-300'
                                                                        : 'bg-yellow-500/20 text-yellow-300'
                                                                }`}>
                                                                {app.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <select
                                                                value={app.status}
                                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                                className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            >
                                                                <option value="in process">En cours</option>
                                                                <option value="accepted">Accepté</option>
                                                                <option value="rejected">Rejeté</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                                    Aucune postulation trouvée
                                                </td>
                                            </tr>
                                        )}
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