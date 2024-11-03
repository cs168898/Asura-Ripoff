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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComicData({ ...comicData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost/comic_backend/update_comic_and_feature.php',
                JSON.stringify(comicData),
                { headers: { 'Content-Type': 'application/json' } }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Error updating comic:", error);
            setMessage("An error occurred while updating the comic.");
        }
    };

    return (
        <>
            <Header />
            <div className="admin-wrapper">
                <h2>Admin Panel - Update Comic and Add to Featured</h2>
                <form onSubmit={handleSubmit}>
                    <label><b> Add to featured , Comic ID:</b></label>
                    <input
                        type="number"
                        name="comic_id"
                        value={comicData.comic_id}
                        onChange={handleChange}
                        required
                    />

                    <label><b>Title:</b></label>
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

                {/* Display a success/error message */}
                {message && <p>{message}</p>}
            </div>
            <Footer />
        </>
    );
}

export default Admin;
