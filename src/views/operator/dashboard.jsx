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
        <div>
            <div className="pt-20 flex h-screen">
                <NavBarOpearator />
                <aside className="w-64 bg-gray-100 p-4 border-r flex flex-col justify-start h-full">
                    <Authinfo />
                    <button
                        onClick={openModal}
                        className="mb-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Ajouter Annonce
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                        Voir les statistiques
                    </button>
                </aside>
                <main className="flex-1 p-6 bg-white">
                    <PostCard />
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white p-6 rounded shadow-md max-w-md w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">Ajouter une annonce</h2>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date d'expiration <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={expiredDate}
                                    onChange={(e) => setExpiredDate(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Publier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}