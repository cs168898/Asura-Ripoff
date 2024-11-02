import React, { useState, useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from 'react-router-dom';
import useUserSession from '../components/check_session'; // Custom hook to check session

function Comics() {
    const [comics, setComics] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Filter state
    const { loggedIn, userId, username, loading } = useUserSession(); // Destructure loading status from custom hook

    
    useEffect(() => {
        if (!loading && !loggedIn) {
            // Redirect to login page if not logged in after loading
            window.location.href = '/login';
        }
    }, [loading, loggedIn]); // Run effect when loading or loggedIn changes


    useEffect(() => {
        fetch('http://localhost/comic_backend/get_comics.php')
            .then(response => response.json())
            .then(data => setComics(data))
            .catch(error => console.error('Error fetching data', error));
    }, []);

    // Filter comics based on searchQuery
    const filteredComics = comics.filter(comic => {
        const titleMatch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Split genre string by comma, trim whitespace, and check if any genre matches the search query
        const genreMatch = comic.genre.split(',').some(genre => 
            genre.trim().toLowerCase().includes(searchQuery.toLowerCase())
        );

        return titleMatch || genreMatch;
    });

    return(
        <>
        <Header />
            <div className="comics-page-wrapper">
                <div className="container">
                    
                    <div className="comic-filter-wrapper">
                        {/* Filter input */}
                        <div className="filter-bar">
                            <div className="header">
                            Comics:
                            </div>
                                <input 
                                    type="text" 
                                    placeholder="Filter by title or genre..." 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                />
                        </div>
                        <div className="comic-wrapper">
                                
                            {filteredComics.map((comic, index) => (
                                <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">
                                <div key={comic.id} className="comic-card">   
                                    <div className="comic-title">{comic.title}</div>
                                    <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} Cover`} className="comic-cover" />
                                </div> 
                                </Link>
                            )
                        )} 
                        </div>
                    </div>
                    
                </div>
            </div>
        
        <Footer />
        </>
    );
}

export default Comics