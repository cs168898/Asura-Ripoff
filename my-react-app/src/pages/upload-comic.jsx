import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header'
import Footer from '../components/footer';

function ComicUploadForm() {
    const [comicData, setComicData] = useState({
        title: '',
        genre: '',
        author: '',
        artist: '',
        synopsis: '',
        status: '',
    });
    const [coverImage, setCoverImage] = useState(null);
    const [zipFile, setZipFile] = useState(null);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComicData({
            ...comicData,
            [name]: value,
        });
    };

    // Handle cover image file selection
    const handleImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    // Handle ZIP file selection
    const handleZipChange = (e) => {
        setZipFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', comicData.title);
        formData.append('genre', comicData.genre);
        formData.append('author', comicData.author);
        formData.append('artist', comicData.artist);
        formData.append('synopsis', comicData.synopsis);
        formData.append('status', comicData.status);
        formData.append('cover_image', coverImage); // Add cover image to FormData
        if (zipFile) formData.append('zip_file', zipFile);

        try {
            const response = await axios.post('http://localhost/comic_backend/upload_comic.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Check response in console
            alert(response.data.message);
        } catch (error) {
            console.error('Error uploading comic:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                alert('Server error: ' + error.response.data.message);
            } else {
                alert('Failed to upload comic.');
            }
        }
    };

    return (
        <>
        <Header />
        <div className="upload-comic-page-wrapper">

        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title */}
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={comicData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Genre */}
            <div>
                <label>Genre:</label>
                <input
                    type="text"
                    name="genre"
                    value={comicData.genre}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Author */}
            <div>
                <label>Author:</label>
                <input
                    type="text"
                    name="author"
                    value={comicData.author}
                    onChange={handleInputChange}
                />
            </div>

            {/* Artist */}
            <div>
                <label>Artist:</label>
                <input
                    type="text"
                    name="artist"
                    value={comicData.artist}
                    onChange={handleInputChange}
                />
            </div>

            {/* Status */}
            <div>
                <label>Status:</label>
                <input
                    type="text"
                    name="status"
                    value={comicData.status}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Synopsis */}
            <div>
                <label>Synopsis:</label>
                <textarea
                    name="synopsis"
                    value={comicData.synopsis}
                    onChange={handleInputChange}
                />
            </div>

            {/* Cover Image */}
            <div>
                <label>Cover Image:</label>
                <input
                    type="file"
                    name="cover_image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                />
            </div>

            {/* ZIP File Upload */}
            <div>
                <label>Upload Chapters ZIP File:</label>
                <input
                    type="file"
                    name="zip_file"
                    onChange={handleZipChange}
                    accept=".zip"
                    required
                />
            </div>

            <button type="submit">Upload Comic</button>
        </form>
        </div>
        <Footer />
        </>
    );
}

export default ComicUploadForm;
