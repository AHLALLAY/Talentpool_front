import { useEffect, useState } from "react";

export default function Authinfo() {
    const [user, setUser] = useState('');

    useEffect(() => {
        try {
            const UserInfo = JSON.parse(localStorage.getItem('user'));
            if (UserInfo && UserInfo.name) {
                setUser(UserInfo);
            }
        } catch (error) {
            console.error("Erreur lors de la lecture de l'utilisateur depuis le localStorage :", error);
        }
    }, []);

    return (
        <div className="p-4 border-b border-cyan-500/30 mb-4">
            <label className="text-cyan-200 text-lg font-semibold">Welcome</label>{" "}
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {user.name}
            </span>
        </div>
    );
}
