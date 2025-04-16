import { useEffect, useState } from "react";

export default function AppCard({ participantId }) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/applications/${participantId}`);
            if (!response.ok) throw new Error("Échec du chargement");
            const { data } = await response.json();
            setApplications(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (applicationId) => {
        if (!confirm("Confirmer le rejet ?")) return;
        
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/applications/${applicationId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error("Échec du rejet");
            setApplications(prev => prev.filter(app => app.id !== applicationId));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (participantId) fetchApplications();
    }, [participantId]);

    const renderStatusBadge = (status) => {
        const statusColors = {
            "in process": "yellow-400",
            "accepted": "green-400",
            "rejected": "red-400"
        };
        
        return (
            <span className={`font-medium ml-1 text-${statusColors[status] || 'cyan-400'}`}>
                {status}
            </span>
        );
    };

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (!applications.length) return <EmptyState />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
            <BackgroundEffects />
            
            {applications.map(application => (
                <ApplicationCard 
                    key={application.id}
                    application={application}
                    onReject={handleReject}
                    renderStatusBadge={renderStatusBadge}
                />
            ))}
        </div>
    );
}

// Composants enfants
const Loader = () => (
    <div className="text-center py-4 text-cyan-300 font-medium bg-gray-900 bg-opacity-50 rounded-lg border border-cyan-800 shadow-lg">
        Chargement...
    </div>
);

const Error = ({ message }) => (
    <div className="text-red-500 text-center py-4 bg-gray-900 bg-opacity-50 rounded-lg border border-red-800 shadow-lg">
        Erreur: {message}
    </div>
);

const EmptyState = () => (
    <div className="text-center py-4 text-cyan-300 bg-gray-900 bg-opacity-50 rounded-lg border border-cyan-800 shadow-lg">
        Aucune candidature trouvée
    </div>
);

const BackgroundEffects = () => (
    <>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-200" />
    </>
);

const ApplicationCard = ({ application, onReject, renderStatusBadge }) => (
    <div className="p-4 border rounded-lg shadow-md bg-gray-900 bg-opacity-70 border-cyan-800 hover:border-cyan-500 transition-all duration-300 relative z-10">
        <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
            {application.post?.title || "Titre non disponible"}
        </h3>
        <p className="text-cyan-100">{application.description}</p>
        
        <div className="mt-2 text-sm text-cyan-300">
            Statut: {renderStatusBadge(application.status)}
        </div>
        
        <p className="text-sm text-cyan-300">
            Date: {new Date(application.created_at).toLocaleDateString()}
        </p>

        {!["accepted", "rejected"].includes(application.status) && (
            <div className="flex justify-end mt-2">
                <button 
                    onClick={() => onReject(application.id)}
                    className="bg-red-600 hover:bg-red-300 rounded-lg py-1 px-2"
                >
                    Rejeter
                </button>
            </div>
        )}
    </div>
);