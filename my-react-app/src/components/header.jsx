import { useState } from 'react'


function Header(){
 //Insert javascript functionality here
 
    return(
        <>
        <div className='header-wrapper'>
            <div className='logo'>
                <img src="../assets/asurascans.png" alt="Website Logo" />
            </div>
            <div className='nav-bar'>
                <nav>
                <ul>
                    <li><a href="default.asp">Home</a></li>
                    <li><a href="news.asp">Bookmark</a></li>
                    <li><a href="contact.asp">Comics</a></li>
                </ul>
                </nav>
            </div>
            <div className='searchbar-and-avatar'>
                Searchbar and avatar
            </div>
        </div> 
        </>
    )
}

export default Header;