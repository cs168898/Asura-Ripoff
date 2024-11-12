import { useState, useEffect, useRef } from 'react';
import './CarouselWrapper.css';
import { Link } from 'react-router-dom';

function CarouselWrapper({ comics }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const slideInterval = useRef(null);
    const videoRef = useRef(null); // Reference for the video element
    const [muted, setMuted] = useState(true)
    const [volume, setVolume] = useState(0.2); // Initial volume set to 50%
    


    // Function to start the auto-slide
    const startAutoSlide = () => {

        // Clear any existing interval before starting a new one
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }

        slideInterval.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === comics.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5000 stands for 5 seconds
    };

    // Function to stop the auto-slide
    const stopAutoSlide = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
            slideInterval.current = null;
        }
    };

    // Start auto-slide when component mounts
    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [comics.length]);

    // Mouse events for starting and stopping the video
    const handleCoverMouseEnter = () => {
        setIsHovered(true); // Start the video when hovering over cover picture
        stopAutoSlide();    // Stop auto-slide while the video is playing

        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Reset video to start
            videoRef.current.play(); // Ensure video starts playing
        }
    };

    const handleWrapperMouseLeave = () => {
        setIsHovered(false); // Stop the video when leaving the carousel wrapper
        setMuted(true);
        startAutoSlide();    // Resume auto-slide when the mouse leaves
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        stopAutoSlide(); //  stop auto-slide when clicking a dot
        startAutoSlide(); // Restart the auto-slide after clicking
    };

    if (videoRef.current) {
        videoRef.current.volume = volume; // Apply the state value to video volume
    }
    

    return (
        <div
            className="carousel-wrapper"
            onMouseLeave={handleWrapperMouseLeave} // Stop video on wrapper mouse leave
        >
            {/* Video popup fills the entire carousel-wrapper */}
            <div className="video-popup" style={{
                visibility: isHovered ? 'visible' : 'hidden' // Show video when isHovered is true
            }}>
                {/* Different video sources for each index */}
                {currentIndex === 0 && (
                    <>
                    <button
                        onClick={() => {
                            setMuted((prevMuted) => {
                                const newMuted = !prevMuted;
                                if (videoRef.current) {
                                    videoRef.current.muted = newMuted; // Directly set muted on video element
                                }
                                return newMuted;
                            });
                        }}
                        className="mute-button"
                    >
                        <img
                            src={muted ? 'http://localhost/uploads/component_images/no-sound.png' : 'http://localhost/uploads/component_images/volume.png'}
                            alt={muted ? 'Unmute' : 'Mute'}
                        />
                    </button>
                    <video
                        ref={videoRef} // Attach the ref to the video element
                        src="http://localhost/uploads/Omniscient Reader (Official Trailer) _ WEBTOON.mp4"
                        autoPlay
                        muted = {muted}
                        loop
                        volume = {volume}
                    />
                    </>
                )}
                {currentIndex === 1 && (
                    <>
                    <button
                        onClick={() => {
                            setMuted((prevMuted) => {
                                const newMuted = !prevMuted;
                                if (videoRef.current) {
                                    videoRef.current.muted = newMuted; // Directly set muted on video element
                                }
                                return newMuted;
                            });
                        }}
                        className="mute-button"
                    >
                        <img
                            src={muted ? 'http://localhost/uploads/component_images/no-sound.png' : 'http://localhost/uploads/component_images/volume.png'}
                            alt={muted ? 'Unmute' : 'Mute'}
                        />
                    </button>
                    <video
                        ref={videoRef} // Attach the ref to the video element
                        
                        src="http://localhost/uploads/Solo Leveling _ OFFICIAL TRAILER.mp4"
                        autoPlay
                        muted={muted}
                        loop
                        volume = {volume}
                    />
                    </>
                )}
                {currentIndex !== 0 && currentIndex !== 1 && (
                    <>
                    <button
                        onClick={() => {
                            setMuted((prevMuted) => {
                                const newMuted = !prevMuted;
                                if (videoRef.current) {
                                    videoRef.current.muted = newMuted; // Directly set muted on video element
                                }
                                return newMuted;
                            });
                        }}
                        className="mute-button"
                    >
                        <img
                            src={muted ? 'http://localhost/uploads/component_images/no-sound.png' : 'http://localhost/uploads/component_images/volume.png'}
                            alt={muted ? 'Unmute' : 'Mute'}
                        />
                    </button>
                    <video
                        ref={videoRef} // Attach the ref to the video element
                        src="http://localhost/uploads/「The World After the Fall」 webtoon trailer (EN).mp4"
                        autoPlay
                        muted={muted}
                        loop
                        volume = {volume}
                    />
                    </>
                )}
            </div>

            {/* Carousel content */}
            <div className="content-wrapper">
                <div
                    className="carousel-content"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {comics.map((comic, index) => (
                        <div key={index} className="carousel-slide">
                            <div
                                className="cover-picture"
                                onMouseEnter={handleCoverMouseEnter} // Start video on cover picture hover
                            >
                                {/* Comic cover image */}
                                {comic.cover_page_url ? (
                                    <img
                                        src={`http://localhost/${comic.cover_page_url}`}
                                        alt={`${comic.title} cover`}
                                    />
                                ) : (
                                    <p>No cover available</p>
                                )}
                                    
                            </div>

                            {/* Comic details */}
                            <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">

                            <div className="title-description">
                                <div className="title">{comic.title}</div>
                                <div className="description">{comic.synopsis}</div>
                                <div className="genre">{comic.genre}</div>
                                <div className="chapters">{comic.chapters} Chapters</div>
                                <div className="likes">{comic.likes_count} Likes</div>
                                
                                
                            </div>
                            <div className="notice">*Hover over the image to watch the trailer</div>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination dots */}
            <div className="pagination-dots">
                {comics.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default CarouselWrapper;
