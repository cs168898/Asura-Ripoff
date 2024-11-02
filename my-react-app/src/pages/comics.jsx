import React, { useState, useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from 'react-router-dom';

function Comics() {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        fetch('http://localhost/comic_backend/get_comics.php')
            .then(response => response.json())
            .then(data => setComics(data))
            .catch(error => console.error('Error fetching data', error));
    }, []);

    return(
        <>
        <Header />
            <div className="comics-page-wrapper">
                <div className="container">
                    <div className="header">
                        Header:
                    </div>
                    <div className="comic-wrapper">
                        {comics.map((comic, index) => (
                            <Link to={`/specific-comic/${comic.comic_id}`} key={index} className="item">
                            <div key={comic.id} className="comic-card">   
                                <div className="comic-title">{comic.title}</div>
                                <img src={`http://localhost/${comic.cover_page_url}`} alt={`${comic.title} Cover`} className="comic-cover" />
                            </div> 
                            </Link>
                        )
                    )} 
                    </div>
                </div>
            </div>
        
        <Footer />
        </>
    );
}

export default Comics