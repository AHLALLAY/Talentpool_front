import { useEffect, useState } from "react";

export default function AppCard({ participantId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApp = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/applications/${participantId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result.data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching applications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (participantId) {
            fetchApp();
        }
    }, [participantId]);

    if (loading) {
        return <div className="text-center py-4">Chargement en cours...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Erreur: {error}</div>;
    }

    if (!data) {
        return <div className="text-center py-4">Aucune donnée disponible</div>;
    }

    return (
        <div className="space-y-4">
            {Array.isArray(data) ? (
                data.map((application) => (
                    <div key={application.id} className="p-4 border rounded-lg shadow-md bg-white">
                        <h3 className="font-bold text-lg">{application.title}</h3>
                        <p className="text-gray-600">{application.description}</p>
                        <p className="text-sm text-gray-500">
                            Statut: <span className="font-medium">{application.status}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Date: {new Date(application.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <div className="p-4 border rounded-lg shadow-md bg-white">
                    <h3 className="font-bold text-lg">{data.title}</h3>
                    <p className="text-gray-600">{data.description}</p>
                </div>
            )}
        </div>
    );
}