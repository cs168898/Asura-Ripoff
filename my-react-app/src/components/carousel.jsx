import { useState, useEffect, useRef } from 'react';
import './CarouselWrapper.css';

function CarouselWrapper({ comics }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const slideInterval = useRef(null);

    // Function to start the auto-slide
    const startAutoSlide = () => {
        slideInterval.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === comics.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Adjust slide interval as needed
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
    };

    const handleWrapperMouseLeave = () => {
        setIsHovered(false); // Stop the video when leaving the carousel wrapper
        startAutoSlide();    // Resume auto-slide when the mouse leaves
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        stopAutoSlide(); // Optionally stop auto-slide when clicking a dot
        startAutoSlide(); // Restart the auto-slide after clicking
    };

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
                    <video
                        src="http://localhost/uploads/Solo Leveling _ OFFICIAL TRAILER.mp4"
                        autoPlay
                        muted
                        loop
                    />
                )}
                {currentIndex === 1 && (
                    <video
                        src="http://localhost/uploads/「The World After the Fall」 webtoon trailer (EN).mp4"
                        autoPlay
                        muted
                        loop
                    />
                )}
                {currentIndex !== 0 && currentIndex !== 1 && (
                    <video
                        src="http://localhost/uploads/Omniscient Reader (Official Trailer) _ WEBTOON.mp4"
                        autoPlay
                        muted
                        loop
                    />
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
                            <div className="title-description">
                                <div className="title">{comic.title}</div>
                                <div className="description">{comic.synopsis}</div>
                                <div className="genre">{comic.genre}</div>
                                <div className="chapters">{comic.chapters} Chapters</div>
                                <div className="likes">{comic.likes_count} Likes</div>
                            </div>
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
