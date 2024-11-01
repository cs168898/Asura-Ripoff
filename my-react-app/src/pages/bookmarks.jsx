import React, { useState, useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Bookmarks() {
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
        <div className="comic-wrapper">
            {comics.map((comic) => (
                <div key={comic.id} className="comic-card">   
                     <div className="comic-title">{comic.title}</div>
                    <img src={`http://localhost/uploads/${comic.cover_page_url}`} alt={`${comic.title} Cover`} className="comic-cover" />
                </div> 
            )
        )} 

        </div>
        <Footer />
        </>
    );
}

export default Bookmarks