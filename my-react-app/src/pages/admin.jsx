import { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

function Admin() {
    const [comicData, setComicData] = useState({
        comic_id: '',
        title: '',
        chapters: '',
        genre: '',
        likes_count: '',
        author: '',
        artist: '',
        synopsis: '',
        status: '',
        cover_page_url: '',
    });
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [userIdAdmin, setUserIdAdmin] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComicData({ ...comicData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting comic data:", comicData);
            const response = await axios.post(
                'http://localhost/comic_backend/admin_update_comics.php',
                JSON.stringify(comicData),
                { headers: { 'Content-Type': 'application/json' } }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Error updating comic:", error);
            setMessage("An error occurred while updating the comic.");
        }
    };

    const handlePremiumChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSetPremium = async (e) => {
        e.preventDefault();

        try {
            console.log("Setting premium for user ID:", userId);
            const response = await axios.post(
                'http://localhost/comic_backend/set_premium.php',
                { user_id: userId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Error setting premium for user:", error);
            setMessage("An error occurred while setting premium for the user.");
        }
    };

    const handleSetAdmin = async (e) => {
        e.preventDefault();

        try {
            console.log("Setting Admin for user ID:", userIdAdmin);
            const response = await axios.post(
                'http://localhost/comic_backend/set_admin.php',
                { user_id: userIdAdmin },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Error setting admin for user:", error);
            setMessage("An error occurred while setting admin for the user.");
        }
    };

    const handleAdminChange = (e) => {
        setUserIdAdmin(e.target.value);
    };

    return (
        <>
            <Header />
                <div className="admin-panel-wrapper">
                <h2>Admin Panel</h2>
                {/* Display a success/error message */}
                {message && <p>{message}</p>}
                    <div className="admin-wrapper">
                        <h2 className='update-specific-comic'>Select a comic id to update</h2>
                        
                        <form className='update-comics' onSubmit={handleSubmit}>
                        
                            <label><b>Comic ID:</b></label>
                            <input
                                type="number"
                                name="comic_id"
                                value={comicData.comic_id}
                                onChange={handleChange}
                                required
                            />

                            <label><b>Update Title:</b></label>
                            <input
                                type="text"
                                name="title"
                                value={comicData.title}
                                onChange={handleChange}
                            />

                            <label><b>Chapters:</b></label>
                            <input
                                type="number"
                                name="chapters"
                                value={comicData.chapters}
                                onChange={handleChange}
                            />

                            <label><b>Genre:</b></label>
                            <input
                                type="text"
                                name="genre"
                                value={comicData.genre}
                                onChange={handleChange}
                            />

                            <label><b>Likes Count:</b></label>
                            <input
                                type="number"
                                name="likes_count"
                                value={comicData.likes_count}
                                onChange={handleChange}
                            />

                            <label><b>Author:</b></label>
                            <input
                                type="text"
                                name="author"
                                value={comicData.author}
                                onChange={handleChange}
                            />

                            <label><b>Artist:</b></label>
                            <input
                                type="text"
                                name="artist"
                                value={comicData.artist}
                                onChange={handleChange}
                            />

                            <label><b>Synopsis:</b></label>
                            <textarea
                                name="synopsis"
                                value={comicData.synopsis}
                                onChange={handleChange}
                            ></textarea>

                            <label><b>Status:</b></label>
                            <input
                                type="text"
                                name="status"
                                value={comicData.status}
                                onChange={handleChange}
                            />

                            <label><b>Cover Page URL:</b></label>
                            <input
                                type="text"
                                name="cover_page_url"
                                value={comicData.cover_page_url}
                                onChange={handleChange}
                            />

                            <button type="submit" className="admin-submit-button">Submit</button>
                        </form>
                    <div className="premium-admin-container">
                        <h2>Set premium or admin for users</h2>

                        <label>Set premium for user ID: </label>
                        <input type="text" name='user_id' value={userId} onChange={handlePremiumChange} />
                        <button onClick={handleSetPremium}>Set Premium</button>

                        <label>Set Admin for user ID: </label>
                        <input type="text" name='user_id_admin' value={userIdAdmin} onChange={handleAdminChange}/>
                        <button onClick={handleSetAdmin}>Submit</button>
                    </div>
                
                    </div>
                
                </div>
            <Footer />
        </>
    );
}

export default Admin;
