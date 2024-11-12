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

    const [comment, setComment] = useState('');
    const [allComments, setallComments] = useState([]);

    

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
                    console.log(response.data);
                    setComic(response.data.data); // Set comic details correctly
                    setLoading(false); // Set loading to false after data is loaded
                })
                .catch(error => {
                    console.error("Error fetching comments:", error);
                    setLoading(false); // Set loading to false even if there’s an error
                });
        } else{
            console.log("No comments detected")
        }
    }, [comicId]);

      /*************************************** COMMENTS SECTION  *********************************/

    useEffect(() => {

            
        axios.get(`http://localhost/comic_backend/get_comments.php?comic_id=${comicId}`)
            .then(response => {
                const comments = response.data.comments || [];
                setallComments(comments);
                console.log(`the comments is${comments}`);
                console.log(`${response.message}`)
            })
            .catch(error => {
                console.error("Error fetching comic details:", error);
                
            });
    
    }, [comicId]);

    /************************ END OF COMMENTS SECTION  ************************/

    // If still loading, display loading message
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (!comic || comic.length === 0) {
        return <p>No comic found.</p>;
    }

    const latestChapter = comic ? comic[comic.length - 1] : null;


    /*************************************** COMMENTS SECTION  *********************************/

   

    const handleComment = () => {


        console.log("Comic ID test:", comicId); // Check if comicId is defined here
        if (comment.trim() === ''){
            alert("comments cannot be empty");
            return;
        }

        // check if user is logged in
        if (!session.loggedIn){
            alert("Please log in before commenting");
            return;
        }

        axios.post(
            'http://localhost/comic_backend/insert_comments.php',
            { comic_id: comicId, comment: comment}, // Send the data to back end and Set the comment back end variable with the value of front end comment variable
            { withCredentials: true }
        )
        .then(response => {
            if (response.data.success) {
                console.log(`the comment is ${response.data.comment}`)
                const newComment = {
                   
                    username: session.username, // Assuming you have this info
                    profile_picture: session.profile_picture, // Assuming you have this info
                    date_posted: new Date().toISOString(), // Or use response.data.date_posted if available
                    comment: comment,
                };
                // Update the allComments state
                setallComments([...allComments, newComment]);

                // Clear the input field
                setComment('');
            } else {
                alert("Failed to post comment.");
            }
        })
        .catch(error => {
            // Check if the error is due to unauthorized access (401 status)
            if (error.response && error.response.status === 401) {
                console.error("Error:", error.response.data.message);
                alert(error.response.data.message); // Show alert to the user
            } else {
                console.error(`Error posting comment`, error);
            }
        });
    
    };

    /************************ END OF COMMENTS SECTION  ************************/

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
            <div className="comments-wrapper">
                
                <div className="comment-section">
                    {/* Insert specific comments based on comicID */}
                    <h2>Comments:</h2>
                    <div className="comment-input">
                        <input type="text" placeholder='Comment something' value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <button onClick={handleComment}>Comment</button>
                    </div>
                        {allComments.map((cmt) => (
                            <div className="comment-card" key={cmt.comment_id}>
                                <div className="profile-picture">
                                    <img src={`http://localhost/${cmt.profile_picture}`} alt={`${cmt.username}'s profile picture`} />
                                </div>
                                <div className="username-comment-wrapper">
                                    <div className="username">
                                        <p>@{cmt.username}</p>
                                        <p className='date-posted'>{cmt.date_posted}</p>
                                    </div>
                                    <div className="comment">
                                        <p>{cmt.comment}</p>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                        
                </div>
            </div>
        </div>


        <Footer/>
        
        </>
    )

}
export default Specific_Comic;