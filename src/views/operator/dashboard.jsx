import { useState, useEffect } from "react";
import Authinfo from "../../components/AuthInfo";
import NavBarOpearator from "../../components/operator/NavBarOpearator";
import PostCard from "../../components/operator/PostCard";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expiredDate, setExpiredDate] = useState('');

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.id) {
                setUser(storedUser);
            }
        } catch (err) {
            console.error("Erreur lors du chargement de l'utilisateur :", err);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !description || !expiredDate) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    expired_date: expiredDate,
                    operator_id: user?.id
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'ajout de l'annonce.");
            }

            alert("Annonce ajoutée avec succès !");
            setTitle('');
            setDescription('');
            setExpiredDate('');
            closeModal(); // Fermer le modal après ajout
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col w-full bg-gray-900 text-white overflow-hidden">
            <NavBarOpearator />
            <div className="relative flex-grow bg-gradient-to-b from-blue-800 via-purple-800 to-gray-900">
                {/* Glow en arrière-plan */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse z-0"></div>
                <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-200 z-0"></div>

                {/* Contenu principal */}
                <div className="relative z-10 flex h-screen pt-10">
                    <aside className="w-64 bg-gray-800/80 text-white p-4 border-r border-cyan-500/30 flex flex-col justify-start h-full backdrop-blur-sm">
                        <Authinfo />
                        <button
                            onClick={openModal}
                            className="mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        >
                            Ajouter Annonce
                        </button>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-[0_0_15px_rgba(219,39,119,0.4)]">
                            Voir les statistiques
                        </button>
                    </aside>

                    <main className="flex-1 p-6 overflow-y-auto">
                        <PostCard />
                    </main>
                </div>
            </div>


            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="relative bg-gray-800 border border-cyan-500/30 p-6 rounded-xl shadow-lg max-w-md w-full backdrop-blur-md">
                        {/* Effets de lueur */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl opacity-20 z-0"></div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl opacity-20 z-0"></div>

                        <div className="relative z-10">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-3 text-cyan-300 hover:text-white text-2xl font-bold transition-colors"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                Ajouter une annonce
                            </h2>

                            {error && (
                                <p className="text-red-400 mb-4 p-2 bg-red-900/30 rounded-lg border border-red-500/30">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-cyan-200 mb-1">
                                        Titre <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="mt-1 block w-full bg-gray-700/50 border border-cyan-500/30 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyan-200 mb-1">
                                        Description <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 block w-full bg-gray-700/50 border border-cyan-500/30 text-white rounded-lg p-3 h-24 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyan-200 mb-1">
                                        Date d'expiration <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={expiredDate}
                                        onChange={(e) => setExpiredDate(e.target.value)}
                                        className="mt-1 block w-full bg-gray-700/50 border border-cyan-500/30 text-white rounded-lg p-3 [&::-webkit-calendar-picker-indicator]:filter-invert focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
                                >
                                    Publier
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}