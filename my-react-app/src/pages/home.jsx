import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function Home() {
    const [comics, setComics] = useState([]); // State to store the comics data

    useEffect(() => {
        // Fetch data from the PHP script
        axios.get('http://localhost/comic_backend/get_comics.php')
            .then(response => {
                console.log(response.data);  // Log the data to check if it’s structured as expected
                setComics(response.data); // Update the comics state with fetched data
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Header />

            <div className="homepage-wrapper">

                <div className="carousel-wrapper">
                    <div className="cover-picture">
                        {/* Placeholder cover picture */}
                        {/* Check if data is taken from database already, if it is then output the data */}
                        {comics && comics.length > 0 ? (
                            comics[0]['cover_page_url'] ? (
                                <img src={`http://localhost/uploads/${comics[0].cover_page_url}`} alt={`${comics[0].title} cover`} />
                            ) : (
                                <p>No cover available</p>
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                        
                    </div>
                    
                    {comics && comics.length > 0 ? (
                            comics[0]['title'] || comics[0]['description'] || comics[0]['genre']? (
                                <div className="title-description">
                                    <div className="title">{comics[0]['title']}</div>
                                    <div className="description">{comics[0]['synopsis']}</div>
                                    <div className="genre">{comics[0]['genre']}</div>
                                </div>
                            ) : (
                                <p>No comic available</p>
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                        
                    
                    
                </div>

                <div className="main-content">
                    <div className="latest-updates">
                        <p>Latest updates</p>
                    </div>
                    <div className="main-content-inner">
                        <div className="items-grid">
                            {comics && comics.length > 0 ? (
                                comics.map((comic, index) => (
                                    
                                    <div className="item" key={index}>
                                        <Link to={`/comic/${comic.comic_id}`} key={index} className="item">
                                        <h2 className='title'>{comic.title || "No title available"}</h2>
                                        {comic.cover_page_url ? (
                                            <div className="cover-picture">
                                                <img src={`http://localhost/uploads/${comic.cover_page_url}`} alt={`${comic.title} cover`} />
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
                        <p>Popular</p>
                    </div>
                    <div className="button-wrapper">
                        <button>Weekly</button>
                        <button>Monthly</button>
                        <button>All</button>
                    </div>
                    <div className="items-grid">
                        <div className="item">
                            <div className="cover-picture">Cover Picture</div>
                            <div className="title">Title</div>
                            <div className="latest-chapters">Genre</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;
