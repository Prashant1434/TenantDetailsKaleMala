import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [selectedRoom, setSelectedRoom] = useState('');

    const handleAddTenant = () => {
        navigate('/tenant-details'); // Navigate to TenantDetails
    };

    const handleRoomSelection = () => {
        if (selectedRoom) {
            navigate(`/user-details/${selectedRoom}`); // Navigate to UserDetails with selected room number
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to the Tenant Management System</h1>
            <button 
                onClick={handleAddTenant} 
                style={{ padding: '10px 20px', margin: '10px', fontSize: '16px' }}
            >
                Add Tenant
            </button>
            <div style={{ margin: '20px 0' }}>
                <label htmlFor="room-select" style={{ fontSize: '18px' }}>Select Room No: </label>
                <select 
                    id="room-select" 
                    value={selectedRoom} 
                    onChange={(e) => setSelectedRoom(e.target.value)} 
                    style={{ margin: '0 10px', padding: '5px', fontSize: '16px' }}
                >
                    <option value="">--Select Room--</option>
                    {[...Array(36)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                <button 
                    onClick={handleRoomSelection} 
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    View User Details
                </button>
            </div>
        </div>
    );
};

export default HomePage;
