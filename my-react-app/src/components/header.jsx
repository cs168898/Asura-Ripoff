import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import personImg from '../assets/person.png';
import asurascan from '../assets/Site-logo.webp';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';


import useUserSession from './check_session';


function Header(){
    

    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [results, setResults] = useState([]); // State for search results
    const [showResults, setShowResults] = useState(false); // Controls the popup visibility
    const { loggedIn, userId } = useUserSession(); // Destructure the session data
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to track if the screen is mobile size
    const [menuOpen, setMenuOpen] = useState(false); // State for managing mobile menu visibility

    console.log(`User is logged in: ${loggedIn}, User ID: ${userId}`); // For debugging
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Fetch results from the API
    const fetchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost/comic_backend/search_comics.php?query=${query}`);
            setResults(response.data); // Set fetched results
            console.log(`the filtered results is ${response.data}`)
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    // Handle change in search input and show results
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query); // Update the search query state
        setShowResults(!!query); // Show results only if there's a query

        // Trigger the AJAX call only if the query is not empty
        if (query) {
            fetchResults(query);
        } else {
            setResults([]); // Clear results if the query is empty
        }
    };

    // Close the popup when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-bar') && !event.target.closest('.hamburger-menu')) {
                setShowResults(false);
                setMenuOpen(false); // Close the menu when clicking outside
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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
        setProfilePicUrl(e.target.files[0]);
    };

    return(
        <>
        <div className='header-wrapper'>
            <div className='logo'>
                <a href="/">
                <img src={asurascan} alt="Website Logo" />
                </a>
            </div>
            <div className='nav-bar'>
                {/* if it is mobile, load hamburger menu */}
                {isMobile ? (
                    <div className="hamburger-menu">
                         <FaBars onClick={toggleMenu} />
                        {menuOpen && (
                            <div className="mobile-menu">
                                <nav>
                                    <Link to="/">Home</Link>
                                
                                    <Link to="/bookmarks">Bookmarks</Link>
                                
                                    <Link to="/comics">Comics</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                ) : /* else */ (<nav> 
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/bookmarks">Bookmarks</Link>
                        </li>
                        <li>
                            <Link to="/comics">Comics</Link>
                        </li>
                    </ul>
                    </nav>)}
                
            </div>
            <div className='searchbar-and-avatar'>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search comics..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowResults(!!searchQuery)} // Show results when input is focused
                        style={{ display: loggedIn ? 'block' : 'none' }} // Conditional display style based on loggedIn
                    /> 
                    {/* Popup for displaying results */}
                    {showResults && results.length > 0 && (
                        <div className="results-popup">
                            {results.map((comic, index) => (
                                
                                <div key={index} className="result-item">
                                    <a href={`/specific-comic/${comic.comic_id}`}>

                                    <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} cover` }  />
                                    <div>
                                        <p>{comic.title}</p>
                                        <p className='chapter-numbers'>{comic.chapters} Chapters</p>
                                    </div>
                                    
                                    </a>
                                </div>
                                
                            ))}
                </div>
                )}
            </div>
                <a href="/account">
                
                {loggedIn ? (
                    // add user profile picture from DB below 
                <img src={profilePicUrl || 'http://localhost/uploads/profile-picture/person.png'  } alt="profile picture"  onError={(e) => {e.target.src = 'http://localhost/uploads/profile-picture/person.png'}}/>
            ) : (
                <p className='login-signup'>Login / Sign up</p>
            )}
                
                </a>
            </div>
        </div> 
        </>
    )
}

export default Header;