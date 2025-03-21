import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = useSelector((state) => state.auth.user);
    const userRole = useSelector((state) => state.auth.role);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError("User not logged in");
            return;
        }

        console.log("Fetching profile for user ID:", id);
        
        axios.get(`http://localhost:8000/v1/profile/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Profile response:", response.data);
                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch profile");
                }
            })
            .catch((error) => {
                console.error("Profile fetch error:", error.response?.data || error.message);
                setError("Error fetching profile: " + (error.response?.data?.message || error.message));
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (!id) {
        return (
            <div className="profile-container">
                <p className="error">Please log in to view your profile</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {loading ? (
                <p className="loading">Loading profile...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="profile-card">
                    {data && (
                        <>
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}
                                alt="Profile Avatar"
                                className="avatar"
                            />
                            <h2>{data.name}</h2>
                            <p className="email">{data.email}</p>
                            <p className="role">Role: {userRole || 'Not specified'}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
