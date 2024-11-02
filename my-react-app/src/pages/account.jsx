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
                    <form action="">
                        <label htmlFor="username" >Change Username: </label>
                        <input type="text" />
                        <button>Change</button>

                        <label htmlFor="username">Change Password: </label>
                        <input type="text" />
                        <button>Change</button>

                        <label htmlFor="username">Change Email: </label>
                        <input type="text" />
                        <button>Change</button>
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