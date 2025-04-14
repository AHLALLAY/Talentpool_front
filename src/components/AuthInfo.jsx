import { useEffect, useState } from "react";

export default function Authinfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.name) {
                setUser(user);
                console.log("Nom utilisateur :", user.name);
            }
        } catch (error) {
            console.error("Erreur lors de la lecture de l'utilisateur depuis le localStorage :", error);
        }
    }, []);

    return (
        <div className="p-4">
            <label className="text-gray-700 text-lg font-semibold">Welcome</label>{" "}
            <span className="text-xl font-bold text-cyan-600 mt-2">
                {user.name}
            </span>
        </div>
    );
}
