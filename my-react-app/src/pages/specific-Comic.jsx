import { useState } from 'react'

import Header from '../components/header'
import Footer from '../components/footer';

function Specific_Comic(){
    //insert js here

    return(
        <>
        <Header/>

        <div className='specific-comic-page-wrapper'>
            <div className="comic-info">

                <div className='cover-picture'>
                    <img src="/" alt="Cover Picture" />
                    
                </div>
                <div className="title">
                    Title
                </div>
                <div className="description">
                    Description
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
                    <div className="chapter-item">
                        Chapter1
                    </div>
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