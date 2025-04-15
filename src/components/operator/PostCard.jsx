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
                    <div
                        key={post.id}
                        className="relative bg-gray-800/80 border border-cyan-500/30 rounded-xl p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] group overflow-hidden"
                    >
                        {/* Effets de lueur */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 relative z-10">
                            {post.title}
                        </h2>

                        <div className="space-y-2 relative z-10">
                            <p className="text-sm">
                                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-200">éditeur :</span>
                                <span className="text-cyan-100 ml-1">{post.operator_id}</span>
                            </p>

                            <p className="text-sm">
                                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-200">Lancé le :</span>
                                <span className="text-cyan-100 ml-1">{new Date(post.created_at).toLocaleDateString()}</span>
                            </p>

                            <p className="text-sm">
                                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-200">Expire le :</span>
                                <span className="text-cyan-100 ml-1">{new Date(post.expired_date).toLocaleDateString()}</span>
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-cyan-500/20 relative z-10">
                            <p className="text-sm text-cyan-100 leading-relaxed">
                                {post.description}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-cyan-200 font-medium">
                    Vous n'avez pas encore annoncé quelque chose
                </div>
            )}
        </section>
    );
}