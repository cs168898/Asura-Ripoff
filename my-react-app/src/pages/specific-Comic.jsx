import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the comic ID from the URL
import axios from 'axios';
import { Link } from 'react-router-dom';


import Header from '../components/header'
import Footer from '../components/footer';

function Specific_Comic(){
    const { comicId } = useParams(); // Extract the comicId from the URL parameters
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status

    console.log("Comic ID:", comicId); // Check if this is defined

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

    return(
        <>
        <Header/>

        <div className='specific-comic-page-wrapper'>
            <div className="comic-info">

                <div className='cover-picture'>
                    <img src={`http://localhost/uploads/${comic[0].cover_page}`} alt="Cover Picture" />
                    
                </div>
                <div className="title">
                    
                    {comic[0].comic_title ? (
                        <p>{comic[0].comic_title}</p>
                    ):
                    <p> no comic title</p>
                    }
                    
                </div>
                <div className="description">
                    <p>Synposis: <br />{comic[0].synopsis}</p>
                </div>
                <div className="author">
                    <p>Author:  <br />{comic[0].author}</p>
                </div>

                <div className="button-wrapper">
                    <button className='like-button'>Like</button>
                    <button className='bookmark-button'>Bookmark</button>
                </div>
                

            </div>
            <div className="comic-chapters">
                <div className="header">
                    List of chapters
                </div>
                <div className="chapters">
                    {/* Use loop to loop through chapters */}
                    
                    {comic.map((comic, index) => (
                        <div className="chapter-item">
                        <Link to={`/specific-comic/${comic.comic_id}/specific-chapter/${comic.chapter_id}`} key={index} >
                            <p>Chapter {index + 1}</p>
                        </Link>
                        </div>
                    )
                    )
                    }
                    
                    
                </div>
                <div className="pagination-wrapper">
                    <div className="pagination-buttons-wrapper">
                        <button>Prev</button>
                        <button>Next</button>
                    </div>
                </div>

            </div>
        </div>


        <Footer/>
        
        </>
    )

}
export default Specific_Comic;