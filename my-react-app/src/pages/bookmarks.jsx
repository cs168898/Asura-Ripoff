import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserSession from '../components/check_session'; // Custom hook to check session

function Bookmarks() {
    const [comics, setComics] = useState([]);
    const { loggedIn, userId, username, loading } = useUserSession(); // Destructure loading status from custom hook
    const [searchQuery, setSearchQuery] = useState(''); // Filter state

    useEffect(() => {
        if (!loading && !loggedIn) {
            // Redirect to login page if not logged in after loading
            window.location.href = '/login';
        }
    }, [loading, loggedIn]); // Run effect when loading or loggedIn changes

    useEffect(() => {
        axios.get('http://localhost/comic_backend/get_userbookmarks.php', { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    console.log('Bookmarked Comics:', response.data.bookmarked_comics);
                    setComics(response.data.bookmarked_comics);
                } else {
                    console.log('Error:', response.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching bookmarked comics:", error);
            });
    }, []); // Empty dependency array to run only once on component mount

    // Filter comics based on searchQuery
    const filteredComics = comics.filter(comic => {
        const titleMatch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Split genre string by comma, trim whitespace, and check if any genre matches the search query
        const genreMatch = comic.genre.split(',').some(genre => 
            genre.trim().toLowerCase().includes(searchQuery.toLowerCase())
        );

        return titleMatch || genreMatch;
    });

    return (
        <>
            <Header />
            <div className="bookmark-page-wrapper">

                <div className="container">

                    
                    <div className="comic-filter-wrapper">
                        
                        <div className="filter-bar">
                            <div className="header">
                            Bookmarks:
                            </div>
                                        <input 
                                            type="text" 
                                            placeholder="Filter by title or genre..." 
                                            value={searchQuery} 
                                            onChange={(e) => setSearchQuery(e.target.value)} 
                                        />
                                </div>
                        
                        <div className="comic-wrapper">
                            
                            {comics.length > 0 ? (
                                filteredComics.map((comic, index) => (
                                    <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">
                                    <div key={comic.comic_id} className="comic-card">   
                                        <img 
                                            src={`http://localhost/${comic.cover_page_url}`} 
                                            alt={`${comic.title} Cover`} 
                                            className="comic-cover" 
                                        />
                                        <div className="comic-title">{comic.title}</div>
                                    </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="no-bookmark-wrapper">
                                    <p className="no-bookmark">No bookmarked comics.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Bookmarks;
