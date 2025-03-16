import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!id) return; // Prevent API call if ID is not available

        axios.get(`http://localhost:8000/v1/profile/${id}`, { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    setError("Failed to fetch profile");
                }
            })
            .catch((error) => {
                setError("Error fetching profile");
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="profile-container">
            {loading ? (
                <p className="loading">Loading profile...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="profile-card">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}
                        alt="Profile Avatar"
                        className="avatar"
                    />
                    <h2>{data.name}</h2>
                    <p className="email">{data.email}</p>
                </div>
            )}
        </div>
    );
}
