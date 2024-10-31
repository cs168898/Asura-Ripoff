import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import Login from './login'

function SignUp() {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        //js func
        console.log('Form submitted');
    };

    return(
        <>
            <Header/>
            <div className="signup-wrapper">
                <form onSubmit={handleSubmit}>
                    <label><b>Username: </b>
                    <input 
                        type="text"
                        name="username"
                        />
                    </label>
                    <label><b>Email: </b>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        />
                    </label>
                    <label><b>Password: </b>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        />
                    </label>
                    <label><b>Confirm Password: </b>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        />
                    </label>
                    <button type="submit" className="signup-button">Sign Up now</button>
                </form>
                <p><b>OR</b></p>
                <button onClick={() => navigate('/Login')} className="direct-to-login">Click here to Login</button>
            </div>
            <Footer/>
        </>
    )
} 

export default SignUp