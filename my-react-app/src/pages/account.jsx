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

    // Check if user is premium
    const [user, setUser] = useState({ is_premium: false }); // Placeholder for user data
    const session = useUserSession(); // Assume useUserSession returns an object with login status
    
    useEffect(() => {
        
        if (session.loggedIn) {
            axios.get(`http://localhost/comic_backend/is_premium.php`, { withCredentials: true })
            .then(response => setUser({ is_premium: response.data.is_premium === 1 }))
            
            .catch(error => console.error("Error checking bookmark status:", error));
            
        } else {
            setUser({ is_premium: false });
        }
    }, [session.loggedIn]);

    // end of check if user is premium

    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    const [credentials, setCredentials] = useState({
        newUsername: '',
        newEmail: '',
        currentPassword:'',
        newPassword:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    useEffect(() => {
        async function fetchProfilePicture() {
            try {
                const response = await axios.get(
                    `http://localhost/comic_backend/get_profile_picture.php`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setProfilePicUrl(`http://localhost/${response.data.profile_picture}?${Date.now()}`);
                }
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        }

        if (loggedIn) {
            fetchProfilePicture();
        }
    }, [loggedIn]);
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleProfilePictureSubmit = async (e) => {
        e.preventDefault();
        if (!profilePicture) {
            setMessage("Please select a profile picture to upload.");
            return;
        }
        const formData = new FormData();
        formData.append('profile_picture', profilePicture);
    
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/upload_profile_picture.php',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
            );
            setMessage(response.data.message);
            if (response.data.success) {
                setProfilePicUrl(`http://localhost/uploads/profile-picture/profile_${userId}.jpg?${Date.now()}`);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            setMessage("An error occurred while uploading the profile picture.");
        }
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/change_username.php',
                credentials,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            setMessage(response.data.message);
            setMessage("Username changed successfully!");
            if (response.data.success) {
                setCredentials({ ...credentials, newUsername: '' });
            }
        } catch (error) {
            console.error("Error changing credentials:", error);
            setMessage("An error occured. Please try again.");
        }
    }

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
                    <img 
                        src={profilePicUrl || 'http://localhost/uploads/profile-picture/person.png'} 
                        alt="profile-picture"
                        onError={(e) => {e.target.src = 'http://localhost/uploads/profile-picture/person.png'}}
                     />
                     <form onSubmit={handleProfilePictureSubmit}>
                        <input type="file" accept="image/*" onChange={handleFileChange}/>                    
                        <button type="submit">Upload Profile Picture</button>
                     </form>
                </div>

                <div className="subscription-status">
                    <div className="subscription-message">
                        {user.is_premium ? (
                            <>
                                <p>Your account is premium!</p>
                                <p>You can now:</p>
                                <div className="premium-list">
                                    <ol>
                                        <li>Search for products by their title or genre</li>
                                        <li>Bookmark Comics</li>
                                        <li>Like Comics</li>
                                        <li>Access the latest chapters</li>
                                    </ol>
                                </div>
                            </>
                        ) : (
                            <p>Your account is NOT premium</p>
                        )}
                    </div>
                    
                    <button onClick={(user.is_premium ? (null) : (openModal))}>{(user.is_premium ? ( 'Subscribed') : ('Subscribe'))}</button>
                </div>
                <Subscription_Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    
                </Subscription_Modal>
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
                <div className="upload-checklist">
                                    <ol>
                                        <li>Ensure you are uploading a zipfile</li>
                                        <li>Ensure zipfile contains main comic folder</li>
                                        <li>Inside main comic folder should contain chapters folder with their name as the chapter number only</li>
                                        <li>Inside the chapter folders contain the images for that chapter </li>
                                    </ol>
                                </div>
                <a href="/upload-comic">
                <button>Upload Comics</button>
                </a>

            </div>
            </div>
                <div className="logout-button">
                <button onClick={handleLogout}> Log Out</button>
            </div>
            <Footer />
        </div>

        

        </>
    )

}

export default Account;