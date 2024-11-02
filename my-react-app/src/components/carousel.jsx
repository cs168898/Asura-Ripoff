import { useState } from 'react';
import './CarouselWrapper.css';

function CarouselWrapper({ comics }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={`carousel-wrapper ${isHovered ? 'hovered' : ''}`}
             onMouseEnter={handleMouseEnter} 
             onMouseLeave={handleMouseLeave}
        >
            {isHovered && (
                <div className="video-popup">
                    <video 
                        src="http://localhost/uploads/Solo Leveling _ OFFICIAL TRAILER.mp4" 
                        autoPlay 
                        muted 
                        loop 
                    />
                </div>
            )}

            <div className="cover-picture">
                {/* Cover picture or loading state */}
                {comics && comics.length > 0 ? (
                    comics[0]['cover_page_url'] ? (
                        <img 
                            src={`http://localhost/${comics[0].cover_page_url}`} 
                            alt={`${comics[0].title} cover`}  
                        />
                    ) : (
                        <p>No cover available</p>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
                    
            {/* Title and description */}
            {comics && comics.length > 0 ? (
                comics[0]['title'] || comics[0]['description'] || comics[0]['genre'] ? (
                    <div className="title-description">
                        <div className="title">{comics[0]['title']}</div>
                        <div className="description">{comics[0]['synopsis']}</div>
                        <div className="genre">{comics[0]['genre']}</div>
                        <div className="chapters">{comics[0]['chapters']} Chapters</div>
                        <div className="likes">{comics[0]['likes_count']} Likes</div>
                            
                        
                        
                    </div>
                ) : (
                    <p>No comic available</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CarouselWrapper;
