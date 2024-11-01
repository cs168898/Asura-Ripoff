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
                    <b>Username: </b>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username here"
                        required
                        />
                    
                    <b>Email: </b>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email here"
                        required
                        />
                    
                    <b>Password: </b>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password here"
                        required
                        />
                    
                    <b>Confirm Password: </b>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Confirm your passsword here"
                        required
                        />
                    
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