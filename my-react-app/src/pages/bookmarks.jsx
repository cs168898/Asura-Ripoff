import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserSession from '../components/check_session'; // Custom hook to check session

function Bookmarks() {
    const [comics, setComics] = useState([]);
    const { loggedIn, userId, username, loading } = useUserSession(); // Destructure loading status from custom hook

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

    return (
        <>
            <Header />
            <div className="bookmark-page-wrapper">

            
            <div className="header">
                Bookmarks
            </div>
            <div className="comic-wrapper">
                
                {comics.length > 0 ? (
                    comics.map((comic, index) => (
                        <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">
                        <div key={comic.comic_id} className="comic-card">   
                            <div className="comic-title">{comic.title}</div>
                            <img 
                                src={`http://localhost/${comic.cover_page_url}`} 
                                alt={`${comic.title} Cover`} 
                                className="comic-cover" 
                            />
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
            <Footer />
        </>
    );
}

export default Bookmarks;
