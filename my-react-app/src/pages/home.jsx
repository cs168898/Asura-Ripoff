import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

import CarouselWrapper from '../components/carousel';


function Home() {
    const [comics, setComics] = useState([]); // State to store the comics data
    const [activeButton, setActiveButton] = useState('all'); //Track the sidebar buttons
    const [sortedComics, setSortedComics] = useState([])
    const [featuredComics, setFeaturedComics] = useState([]); // State to store featured comics data

    // Fetch featured comics data for the carousel
    useEffect(() => {
        axios.get('http://localhost/comic_backend/get_featured_comics.php')
            .then(response => {
                console.log(response.data);  // Log to verify structure
                setFeaturedComics(response.data); // Update the featured comics state
            })
            .catch(error => {
                console.error("Error fetching featured comics:", error);
            });
    }, []);

    // Function to handle button click
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId); // Set the clicked button as active
        
        if (buttonId === 'most-liked') {
            // Sort by likes_count in descending order and take top 5
            setSortedComics([...comics]
                .sort((a, b) => parseInt(b.likes_count) - parseInt(a.likes_count))
                .slice(0, 5)
            );
        } else if (buttonId === 'most-chapters') {
            // Sort by chapters in descending order and take top 5
            setSortedComics([...comics]
                .sort((a, b) => parseInt(b.chapters) - parseInt(a.chapters))
                .slice(0, 5)
            );
        } else if (buttonId ==='all'){
            setSortedComics([...comics].slice(0, 10));
        }
        
    };

    

    useEffect(() => {
        // Fetch data from the PHP script
        axios.get('http://localhost/comic_backend/get_comics.php')
            .then(response => {
                console.log(response.data);  // Log the data to check if it’s structured as expected
                setComics(response.data); // Update the comics state with fetched data
                setSortedComics(response.data); // Initialize sortedComics with the original data
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    

    return (
        <>
            <Header />

            <div className="homepage-wrapper">

            <CarouselWrapper comics={featuredComics} />

                <div className="main-content">
                    <div className="latest-updates">
                        <p>All Comics</p>
                    </div>
                    <div className="main-content-inner">
                        <div className="items-grid">
                            {comics && comics.length > 0 ? (
                                comics.map((comic, index) => (
                                    
                                    <div className="item" key={index}>
                                        <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">
                                        <div className="border-wrapper">
                                            
                                            {comic.cover_page_url ? (
                                                <div className="cover-picture">
                                                    <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} cover`} />
                                                </div>
                                                
                                            ) : (
                                                <p>No cover available</p>
                                            )}
                                            <div className="title-wrapper">
                                                <h2 className='title'>{comic.title || "No title available"}</h2>
                                            </div>
                                            <div className="latest-chapters">
                                                        <p>{comic.chapters} chapters</p>
                                            </div>
                                        </div>
                                       
                                        </Link>
                                    </div>
                                    
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    <div className="header">
                        <p>Recommended</p>
                    </div>
                    <div className="button-wrapper">
                        <button className={activeButton === 'all'? 'active': '' } onClick={() => handleButtonClick('all')}>All</button>
                        <button className={activeButton === 'most-liked'? 'active': '' } onClick={() => handleButtonClick('most-liked')}>Most Liked</button>
                        <button className={activeButton === 'most-chapters'? 'active': '' } onClick={() => handleButtonClick('most-chapters')}>Most Chapters</button>
                        
                    </div>
                    <div className="items-grid">
                    {sortedComics.slice(0, 10).map((comic, index) => (
                    <div key={comic.comic_id} className="comic-item">
                        <div className="item">
                            <div className="ranking">
                                <p> {index + 1} </p>
                            </div>
                            <Link to={`/specific-comic/${comic.comic_id}`} key={comic.id} className="item-link">
                            <div className='comic-detail-wrapper'>
                                
                            <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} cover`}  />

                            <div className="title">{comic.title}</div>
                            <div className="chapters">{comic.chapters} Chapters</div>
                            </div>
                            
                            
                            </Link>
                            <div className="synopsis">
                                {comic.synopsis}
                            </div>
                        </div>
                    </div>
                    ))}
                    
                        
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;
