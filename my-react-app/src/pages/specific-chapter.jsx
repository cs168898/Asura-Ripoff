import { useState } from 'react'

import Header from '../components/header'
import Footer from '../components/footer';

function Specific_Chapter(){
    //insert js here

    return(
        <>
        <Header/>

        <div className="specific-chapter-wrapper">
            <div className="header">
                <span className='chapter-number'>Chapter Number</span>
                <span className='chapter-title'>Chapter Title</span>
                <div className='prev-next'>
                    <button>Prev</button>
                    <button>Next</button>
                </div>
                
            </div>
            <div className="content">
                <img src="/" alt="Image 1" />
            </div>
            <div className='prev-next-footer'>
                    <button>Prev</button>
                    <button>Next</button>
                </div>

        </div>

        <Footer/>
        
        </>
    )

}
export default Specific_Chapter;