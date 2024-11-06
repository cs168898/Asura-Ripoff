import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the comic ID from the URL
import axios from 'axios';
import { Link } from 'react-router-dom';
import Subscription_Modal from '../components/subscription-modal';

import Header from '../components/header'
import Footer from '../components/footer';
import useUserSession from '../components/check_session';

function Specific_Comic(){
    const { comicId } = useParams(); // Extract the comicId from the URL parameters
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [user, setUser] = useState({ is_premium: false }); // Placeholder for user data

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const session = useUserSession(); // Assume useUserSession returns an object with login status
    
    useEffect(() => {
        
        if (session.loggedIn) {
            axios.get(`http://localhost/comic_backend/is_premium.php`, { withCredentials: true })
            .then(response => setUser({ is_premium: response.data.is_premium === 1 }))
            
            .catch(error => console.error("Error checking bookmark status:", error));
            
        } else {
            setUser({ is_premium: false });
        }
    }, [session.loggedIn, comicId]);
    
    console.log(`is acc premium? ${user.is_premium}`)

    console.log("Comic ID:", comicId); // Check if this is defined

    // BookMark and like part

    const [bookmarked, setBookmarked] = useState(false);
    const [liked, setLiked] = useState(false); // Track whether the comic is liked
    const [actionType, setActionType] = useState(''); // Stores either 'bookmarks' or 'likes'

    //End of Bookmark and like part

    useEffect(() => {
        
        // Check if the comic is bookmarked on page load
        axios.get(`http://localhost/comic_backend/bookmark.php?comic_id=${comicId}&action=bookmarks`, { withCredentials: true })
            .then(response => setBookmarked(response.data.bookmarked))
            .catch(error => console.error("Error checking bookmark status:", error));

        // Check if the comic is liked on page load
        axios.get(`http://localhost/comic_backend/bookmark.php?comic_id=${comicId}&action=likes`, { withCredentials: true })
            .then(response => setLiked(response.data.liked))
            .catch(error => console.error("Error checking like status:", error));
    }, [comicId]);

    const handleActionToggle = (type) => {
        setActionType(type); // Set the actionType to either 'bookmarks' or 'likes'
        console.log("Comic ID test:", comicId); // Check if comicId is defined here
        console.log("Action Type:", type); // Log the action to ensure it’s set
        
        axios.post(
            'http://localhost/comic_backend/bookmark.php',
            { comic_id: comicId, action: type }, // Send action as part of the data
            { withCredentials: true }
        )
        .then(response => {
            if (response.data.success) {
                if (type === 'bookmarks') {
                    console.log(`the bookmark is ${response.data.bookmarks}`)
                    setBookmarked(response.data.bookmarks);
                } else if (type === 'likes') {
                    console.log(`the liked is ${response.data.likes}`)
                    setLiked(response.data.likes);
                }
            }
        })
        .catch(error => {
            // Check if the error is due to unauthorized access (401 status)
            if (error.response && error.response.status === 401) {
                console.error("Error:", error.response.data.message);
                alert(error.response.data.message); // Show alert to the user
            } else {
                console.error(`Error toggling ${type}:`, error);
            }
        });
    };

    useEffect(() => {
        if (comicId) {
            // Make the API request only if comicId is available
            axios.get(`http://localhost/comic_backend/get_comic_details.php?comic_id=${comicId}`)
                .then(response => {
                    setComic(response.data.data); // Assuming the data is nested in `data`
                    console.log(response.data);
                    setLoading(false); // Set loading to false after data is loaded
                })
                .catch(error => {
                    console.error("Error fetching comic details:", error);
                    setLoading(false); // Set loading to false even if there’s an error
                });
        } else{
            console.log("No comic ID detected")
        }
    }, [comicId]);

    // If still loading, display a spinner or loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!comic) {
        return <p>Loading...</p>;
    }

    const latestChapter = comic ? comic[comic.length - 1] : null;

    return(
        <>
        <Header/>

        <div className='specific-comic-page-wrapper'>
            <div className="comic-info">
                <div className="upper-content">
                    <div className='cover-picture'>
                        <img src={`http://localhost/${comic[0].cover_page}`} alt="Cover Picture" />
                        
                    </div>

                    <div className="container">
                        <div className="title">
                            
                            {comic[0].comic_title ? (
                                <p>{comic[0].comic_title}</p>
                            ):
                            <p> no comic title</p>
                            }
                            
                        </div>
                        <div className="description">
                            <p className='header'>Synposis: </p>
                            <p>{comic[0].synopsis}</p>
                        </div>
                        <div className="author">
                            <p className='header'>Author:  </p>
                            <p>{comic[0].author}</p>
                        </div>
                        <div className="author">
                            <p className='header'>Artist:  </p>
                            <p>{comic[0].artist}</p>
                        </div>

                        <div className="button-wrapper">
                            <button onClick={() => handleActionToggle('bookmarks')} className={bookmarked ? 'active' : ''}>
                                {bookmarked ? 'Bookmarked' : 'Bookmark'}
                            </button>
                            <button onClick={() => handleActionToggle('likes')} className={liked ? 'active' : ''}>
                                {liked ? 'Liked' : 'Like'}
                            </button>
                        </div>
                    </div>
                    
                    

                </div>
            </div>
                
            <div className="comic-chapters">
                <div className="header">
                    List of chapters
                </div>
                <div className="chapters">

                    {comic.map((comic, index) => {
                            // Apply restricted styling and remove link for the latest chapter if the user is not subscribed
                            const isLatestChapter = comic.chapter_id === latestChapter.chapter_id;
                            const restricted = !user.is_premium && isLatestChapter;

                            return (
                                <div key={comic.id} className={`chapter-item ${restricted ? 'restricted' : ''}`}>
                                    {restricted ? (
                                            
                                            
                                            <span className="restricted-text" onClick={openModal}>Chapter {index + 1} - Subscribe to access</span>
                                            
                                            
                                            
                                    ) : (
                                        <Link to={`/specific-comic/${comic.comic_id}/specific-chapter/${comic.chapter_id}`}>
                                            Chapter {index + 1}
                                        </Link>
                                    )}
                                </div>
                                
                            );
                        })}
                    <Subscription_Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    
                    </Subscription_Modal>
                </div>
            </div>
        </div>


        <Footer/>
        
        </>
    )

}
export default Specific_Comic;