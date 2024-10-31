import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // To access the comic ID and chapter ID from the URL
import axios from 'axios';

import Header from '../components/header';
import Footer from '../components/footer';

function Specific_Chapter() {
    const { comicId, chapterId } = useParams();
    console.log("Comic ID:", comicId, "Chapter ID:", chapterId);

    const [comicImages, setComicImages] = useState([]); // Use a more descriptive state name
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        if (comicId && chapterId) {
            // Make the API request only if both comicId and chapterId are available
            axios.get(`http://localhost/comic_backend/get_chapter_images.php?comic_id=${comicId}&chapter_id=${chapterId}`)
                .then(response => {
                    setComicImages(response.data.data || []); // Assuming data is nested in `data`
                    console.log(response.data);
                    setLoading(false); // Set loading to false after data is loaded
                })
                .catch(error => {
                    console.error("Error fetching comic details:", error);
                    setLoading(false); // Set loading to false even if there’s an error
                });
        } else {
            console.log("Comic ID or Chapter ID is missing");
        }
    }, [comicId, chapterId]);

    // If still loading, display a spinner or loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!comicImages || comicImages.length === 0) {
        return <p>No images found for this chapter.</p>;
    }

    return (
        <>
            <Header/>

            <div className="specific-chapter-wrapper">
                <div className="header">
                    <span className='chapter-number'>Chapter {chapterId}</span>
                    <span className='chapter-title'>Chapter Title</span>
                    <div className='prev-next'>
                        <button>Prev</button>
                        <button>Next</button>
                    </div>
                </div>

                <div className="content">
                    {/* Loop through each image in the chapter */}
                    {comicImages.map((image, index) => {
                        const srcUrl = `http://localhost/uploads/${encodeURIComponent(image.comic_title?.trim().toLowerCase())}/chapter${image.chapter_id}/${encodeURIComponent(image.image_url?.trim().toLowerCase())}`;
                        
                        // Log the src URL inside the return statement
                        console.log("Image src URL:", srcUrl);

                        return (
                            <img 
                                key={index}
                                src={srcUrl}
                                alt={`Comic Page ${index + 1}`} 
                            />
                        );
                    })}
                </div>

                <div className='prev-next-footer'>
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default Specific_Chapter;
