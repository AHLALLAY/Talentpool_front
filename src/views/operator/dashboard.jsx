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
    const [posts, setPosts] = useState([]);


    const fetchPosts = async (operatorId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/posts/operator/${operatorId}`);
            const data = await response.json();
            setPosts(data.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des annonces :", err);
        }
    };

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.id) {
                setUser(storedUser);
                fetchPosts(storedUser.id);
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
            closeModal();

            await fetchPosts(user.id);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* NavBar fixe en haut */}
            <div className="fixed top-0 left-0 right-0 z-20">
                <NavBarOpearator />
            </div>

            {/* Contenu principal (flex container) */}
            <div className="flex flex-1 pt-16"> {/* pt-16 pour compenser la NavBar */}
                {/* Aside fixe (sidebar) */}
                <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-purple-500/40 p-4 flex flex-col backdrop-blur-sm hidden lg:flex">
                    <Authinfo />
                    <div className="space-y-3 mt-4">
                        <button
                            onClick={openModal}
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        >
                            Ajouter Annonce
                        </button>
                        <button onClick={() => window.location.href = '/statistics'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                            Voir les statistiques
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-purple-900 via-cyan-900 to-blue-900 relative">
                    {/* Overlay pour renforcer l'effet néon */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 via-cyan-300/80 to-blue-600/80 backdrop-filter backdrop-blur-sm"></div>
                    {/* Contenu scrollable */}
                    <div className="relative z-10">
                        <PostCard posts={posts} />
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="relative bg-gray-900 border border-purple-500/40 p-6 rounded-xl shadow-lg max-w-md w-full">
                        {/* Effets de lueur */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl opacity-40 z-0"></div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-2xl opacity-40 z-0"></div>

                        <div className="relative z-10">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-3 text-cyan-400 hover:text-white text-2xl font-bold transition-colors"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                                Ajouter une annonce
                            </h2>

                            {error && (
                                <p className="text-red-400 mb-4 p-2 bg-red-900/30 rounded-lg border border-red-500/40">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-1">
                                        Titre <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="mt-1 block w-full bg-gray-800/50 border border-purple-500/40 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyan-300 mb-1">
                                        Description <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 block w-full bg-gray-800/50 border border-cyan-500/40 text-white rounded-lg p-3 h-24 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-300 mb-1">
                                        Date d'expiration <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={expiredDate}
                                        onChange={(e) => setExpiredDate(e.target.value)}
                                        className="mt-1 block w-full bg-gray-800/50 border border-blue-500/40 text-white rounded-lg p-3 [&::-webkit-calendar-picker-indicator]:filter-invert focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 hover:from-purple-500 hover:via-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300"
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