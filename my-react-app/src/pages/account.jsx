import Header from '../components/header'
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import Subscription_Modal from '../components/subscription-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserSession from '../components/check_session'; // Custom hook to check session


function Account(){
    //insert js here
    const { loggedIn, userId, username } = useUserSession(); // Destructure loggedIn status from custom hook

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [credentials, setCredentials] = useState({
        newUsername: '',
        newEmail: '',
        currentPassword:'',
        newPassword:''
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/change_username.php',
                credentials,
                { headers: { 'Content-Type': 'application/json'}, withCredentials: true}
            );
            setMessage(response.data.message);
            setMessage("Username changed successfully!");
            if (response.data.success) {
                setCredentials({...credentials, newUsername:''});
            }
        } catch (error) {
            console.error("Error changing credentials:", error);
            setMessage("An error occured. Please try again.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/change_password.php',
                credentials,
                { headers: { 'Content-Type': 'application/json'}, withCredentials: true}
            );
            setMessage(response.data.message);
            setMessage("Password changed successfully!");
            if (response.data.success) {
                setCredentials({...credentials, newPassword:''});
            }
        } catch (error) {
            console.error("Error changing credentials:", error);
            setMessage("An error occured. Please try again.");
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/change_email.php',
                credentials,
                { headers: { 'Content-Type': 'application/json'}, withCredentials: true}
            );
            setMessage(response.data.message);
            setMessage("Email changed successfully!");
            if (response.data.success) {
                setCredentials({...credentials, newEmail:''});
            }
        } catch (error) {
            console.error("Error changing credentials:", error);
            setMessage("An error occured. Please try again.");
        }
    };

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/comic_backend/logout.php');
            navigate('/'); 
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loggedIn === null) {
        return <p>Loading...</p>; // Display loading while checking session
    }

    if (!loggedIn) {
        // Redirect to login page or show login prompt
        window.location.href = '/login';
        return null; // Prevent further rendering
    }

    

    

    return(
        <>
        <Header />

        <div className="account-page-wrapper">
        <h2>Hi {username}</h2>
            <div className="account-page-inner">
            
                <div className="profile-picture">
                    <img src="/" alt="profile-picture" />
                </div>
                <div className="subscription-status">
                    <div className="subscription-message">
                        Your account is NOT premium
                    </div>
                    <button onClick={openModal}>Subscribe</button>
                </div>
                <Subscription_Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    
                </Subscription_Modal>

            </div>
            
            <div className="change-credentials-form">
                    <form onSubmit={handleUsernameSubmit}>
                        <label htmlFor="newUsername" >Change Username: </label>
                        <input 
                            type="text" 
                            name="newUsername"
                            value={credentials.newUsername}
                            onChange={handleInputChange}
                            placeholder="Enter new username"
                         />
                        <button type="submit">Change</button>
                    </form>
                    <form onSubmit={handlePasswordSubmit}>
                        <label htmlFor="newPassword">Change Password: </label>
                        <input 
                            type="password"
                            name="newPassword"
                            value={credentials.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                        />
                        <button type="submit">Change</button>
                    </form>
                    <form onSubmit={handleEmailSubmit}>
                        <label htmlFor="newEmail">Change Email: </label>
                        <input 
                            type="email" 
                            name="newEmail"
                            value={credentials.newEmail}
                            onChange={handleInputChange}
                            placeholder="Enter new email"
                        />
                        <button type="submit">Change</button>
                    </form>
            </div>
            <div className="upload-comics-wrapper">
                <p>Want to upload your own comic?</p>
                <a href="/upload-comic">
                <button>Upload Comics</button>
                </a>

            </div>
            <div className="logout-button">
                <button onClick={handleLogout}> Log Out</button>
            </div>
        </div>


        <Footer />

        </>
    )

}

export default Account;