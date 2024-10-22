import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const UserDetails = () => {
    const { roomNo } = useParams();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users-with-dependents/${roomNo}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roomNo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const processedData = userData.reduce((acc, user) => {
        const { userId, roomNo, fullName, address, panNo, aadharNo, mobileNo, altMobileNo, photo, aadharPhoto, panPhoto, dependentId, dependentName, dependentRelation, dependentMobileNo } = user;

        let existingUser = acc.find(item => item.userId === userId);
        if (!existingUser) {
            existingUser = {
                userId,
                roomNo,
                fullName,
                address,
                panNo,
                aadharNo,
                mobileNo,
                altMobileNo,
                photo,
                aadharPhoto,
                panPhoto,
                dependents: []
            };
            acc.push(existingUser);
        }

        if (dependentId) {
            existingUser.dependents.push({
                dependentId,
                dependentName,
                dependentRelation,
                dependentMobileNo
            });
        }

        return acc;
    }, []);

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>User and Dependents Details for Room No: {roomNo}</h1>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '10px 20px', marginRight: '10px' }}
                >
                    Home
                </button>
            </div>
            {processedData.length === 0 ? (
                <p>No data found for this room number.</p>
            ) : (
                <div>
                    {processedData.map((user) => (
                        <div key={user.userId} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                            <h2 style={{ margin: '10px 0' }}>{user.fullName}</h2>
                            <p><strong>Address:</strong> {user.address}</p>
                            <p><strong>PAN No:</strong> {user.panNo}</p>
                            <p><strong>Aadhar No:</strong> {user.aadharNo}</p>
                            <p><strong>Mobile No:</strong> {user.mobileNo}</p>
                            <p><strong>Alt Mobile No:</strong> {user.altMobileNo}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                <div>
                                    <strong>Photo:</strong>
                                    <img 
                                        src={user.photo} 
                                        alt="User Photo" 
                                        width="100" 
                                        height="100" 
                                        style={{ borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }} 
                                        onClick={() => openModal(user.photo)} 
                                    />
                                </div>
                                <div>
                                    <strong>Aadhar Photo:</strong>
                                    <img 
                                        src={user.aadharPhoto} 
                                        alt="Aadhar Photo" 
                                        width="100" 
                                        height="100" 
                                        style={{ borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }} 
                                        onClick={() => openModal(user.aadharPhoto)} 
                                    />
                                </div>
                                <div>
                                    <strong>PAN Photo:</strong>
                                    <img 
                                        src={user.panPhoto} 
                                        alt="PAN Photo" 
                                        width="100" 
                                        height="100" 
                                        style={{ borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }} 
                                        onClick={() => openModal(user.panPhoto)} 
                                    />
                                </div>
                            </div>
                            <h3>Dependents:</h3>
                            {user.dependents.length > 0 ? (
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {user.dependents.map((dependent) => (
                                        <li key={dependent.dependentId} style={{ padding: '5px 0', borderBottom: '1px solid #ddd' }}>
                                            <strong>Name:</strong> {dependent.dependentName}<br />
                                            <strong>Relation:</strong> {dependent.dependentRelation}<br />
                                            <strong>Mobile:</strong> {dependent.dependentMobileNo}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No dependents found.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <Modal isOpen={modalIsOpen} onClose={closeModal} imageSrc={selectedImage} />
        </div>
    );
};

export default UserDetails;
