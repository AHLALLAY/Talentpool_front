import { useEffect, useState } from "react";

export default function PostCard() {
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);


    const handleData = async () => {
        let operatorId = null;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                operatorId = user.id;
            }
        } catch (error) {
            console.error("Erreur lors de la lecture de l'utilisateur depuis le localStorage :", error);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/posts/operator/${operatorId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Erreur lors de la récupération des données');

            const data = await response.json();
            console.log('Données récupérées :', data);
            setPosts(data.data);
        } catch (err) {
            setError(err.message);
        }
    };


    useEffect(() => {
        handleData();
    }, []);

    if (error) {
        return (
            <div className="text-red-600 font-semibold text-center my-4">
                {error}
            </div>
        );
    }

    return (
        <section className="mt-24 px-4 md:px-10 lg:px-20 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-bold text-cyan-700 mb-2">{post.title}</h2>
                        <p className="text-sm text-gray-500 mb-1">
                            <strong className="text-gray-700">Entreprise :</strong> {post.operator_id}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                            <strong className="text-gray-700">Lancé le :</strong> {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                            <strong className="text-gray-700">Expire le :</strong> {new Date(post.expired_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-4">
                            {post.description}
                        </p>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-600 font-medium">
                    Vous n'avez pas encore annoncer quelque chose
                </div>
            )}
        </section>
    );
}