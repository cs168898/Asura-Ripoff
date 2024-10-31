import { useState } from 'react'
import { Link } from 'react-router-dom';
import personImg from '../assets/person.png';
import asurascan from '../assets/Site-logo.webp';

function Header(){
 //Insert javascript functionality here
 
    return(
        <>
        <div className='header-wrapper'>
            <div className='logo'>
                <a href="/">
                <img src={asurascan} alt="Website Logo" />
                </a>
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

                <input type="text" placeholder='Search' />
                <a href="/account">
                <img src={personImg} alt="avatar" />
                </a>
            </div>
        </div> 
        </>
    )
}

export default Header;