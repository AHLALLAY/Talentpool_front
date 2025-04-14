import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');

    const handleClose = () => {
        navigate('/');
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation basique
        if (!name || !email || !password || !roles || roles === "default") {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, roles })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Erreur lors de l\'inscription');

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
            <form onSubmit={handelSubmit} className="bg-gray-950 bg-opacity-90 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md rounded-xl p-8 w-full max-w-md text-white">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
                        Inscription
                    </h2>
                    <button
                        onClick={handleClose}
                        type="button"
                        className="text-pink-400 text-2xl font-bold hover:text-pink-500 transition"
                        title="Fermer"
                    >
                        &times;
                    </button>
                </div>

                {/* affichage des erreurs */}
                {error && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Champs */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-cyan-200 mb-1">
                            Nom Complet <span className="text-pink-400 font-bold">*</span>
                        </label>
                        <input type="text" id="fullName" name="fullName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="Votre nom complet" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-cyan-200 mb-1">
                            Email <span className="text-pink-400 font-bold">*</span>
                        </label>
                        <input type="email" id="email" name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="exemple@mail.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-cyan-200 mb-1">
                            Mot de passe <span className="text-pink-400 font-bold">*</span>
                        </label>
                        <input type="password" id="password" name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="********" required />
                    </div>
                    <div>
                        <label htmlFor="roles" className="block text-cyan-200 mb-1">
                            Roles <span className="text-pink-400 font-bold">*</span>{" "}
                            <span className="text-xs text-gray-400">Le choix du rôle est irréversible après l'inscription</span>
                        </label>
                        <select name="roles" id="roles"
                            value={roles}
                            onChange={(e) => setRoles(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required>
                            <option value="default">Choisir ...</option>
                            <option value="participant">participant</option>
                            <option value="operator">operator</option>
                        </select>
                    </div>
                </div>

                {/* Bouton */}
                <div className="mt-6">
                    <button type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300"
                    >
                        Inscription
                    </button>
                </div>

                {/* Lien vers login */}
                <div className="mt-4 text-sm text-cyan-200 text-center">
                    Vous avez déjà un compte ?{" "}
                    <a
                        href="/login"
                        className="text-pink-400 hover:text-pink-300 font-semibold transition duration-300 underline underline-offset-2"
                    >
                        Connectez-vous ici
                    </a>
                </div>
            </form>
        </div>
    );
}
