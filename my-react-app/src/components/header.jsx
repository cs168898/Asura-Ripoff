import { useState } from 'react'
import { Link } from 'react-router-dom';

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
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/bookmark">Bookmarks</Link>
                    </li>
                    <li>
                        <Link to="/comics">Comics</Link>
                    </li>
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