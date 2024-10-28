import { useState } from 'react'

import Header from '../components/header'
import Footer from '../components/footer';

function Home(){
 //Insert javascript functionality here

    return(
        <>
        <header>
            <Header/>
        </header>
        
        <body>
            <div className='homepage-wrapper'>

                <div className='carousel-wrapper'>
                    <div className='cover-picture'>
                        <img src="/" alt="Cover Picture" />
                    </div>
                    <div className='title'>
                        Title
                    </div>
                    <div className='description'>
                        Description
                    </div>
                </div>

                <div className='main-content'>
                    <div className='latest-updates'>
                        <p> Latest updates</p>
                    </div>
                    <div className='main-content-inner'>
                        <div class="items-grid">
                            {/* The item class will be created multiple times with a loop and populated with database data */}
                            <div className='item'>
                                <div className="cover-picture">Cover Picture</div>
                                <div className="title">Title</div>
                                <div className="latest-chapters">Latest Chapters</div>
                            </div>   
                        </div>
                    </div>
                </div>

                <div className='sidebar'>
                    <div className='header'>
                        <p> Popular </p>
                    </div>
                    <div className='button-wrapper'>
                        <button>Weekly</button>
                        <button>Monthly</button>
                        <button>All</button>
                    </div>
                    <div class="items-grid">
                            {/* The item class will be created multiple times with a loop and populated with database data */}
                            <div className='item'>
                                <div className="cover-picture">Cover Picture</div>
                                <div className="title">Title</div>
                                <div className="latest-chapters">Genre</div>
                            </div>   
                    </div>
                </div>
            </div> 
        </body>

        <footer>
            <Footer/>
        </footer>
        </>
    )
}

export default Home; // Ensure this is a default export