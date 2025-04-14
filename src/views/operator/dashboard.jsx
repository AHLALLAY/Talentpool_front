import Authinfo from "../../components/AuthInfo";
import NavBarOpearator from "../../components/operator/NavBarOpearator";
import PostCard from "../../components/operator/PostCard";

export default function dashboard() {

    return (
        <div className="pt-20 flex h-screen">
            <NavBarOpearator />
            <aside className="w-64 bg-gray-100 p-4 border-r flex flex-col justify-start h-full">
                <Authinfo />
                <button className="mb-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
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
    );
}