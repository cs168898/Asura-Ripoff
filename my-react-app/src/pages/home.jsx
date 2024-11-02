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

    // Function to handle button click
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId); // Set the clicked button as active
        
        if (buttonId === 'most-liked') {
            // Sort by likes_count in descending order
            setSortedComics([...comics].sort((a, b) => parseInt(b.likes_count) - parseInt(a.likes_count)));
        } else if (buttonId ==='most-chapters') {
            // Set back to the original comics list if another button is clicked
            setSortedComics([...comics].sort((a, b) => parseInt(b.chapters) - parseInt(a.chapters)));
        } else{
            setSortedComics(comics);
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

            <CarouselWrapper comics={comics} />

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
                                        <div className="title-wrapper">
                                            <h2 className='title'>{comic.title || "No title available"}</h2>
                                        </div>
                                        
                                        {comic.cover_page_url ? (
                                            <div className="cover-picture">
                                                <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} cover`} />
                                            </div>
                                            
                                        ) : (
                                            <p>No cover available</p>
                                        )}
                                        <div className="latest-chapters">
                                                    <p>{comic.chapters} chapters</p>
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
                    {sortedComics.map((comic, index) => (
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
                            <div className="latest-chapters">{comic.genre}</div>
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
