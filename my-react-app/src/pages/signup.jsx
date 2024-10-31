import {useState} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

function SignUp() {
    //insert js func

    return(
        <>
            <Header/>
            <div className="signup-wrapper">
                <form onSubmit="handleSuhmit">
                    <label><b>Username: </b></label>
                    <input 
                        type="text"
                        name="username"
                        /> <br />
                    <label><b>Email: </b></label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        /> <br />
                    <label><b>Password: </b></label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        /> <br />
                    <label><b>Confirm Password: </b></label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        /> <br /> <br />
                    <button type="submit">Sign Up now</button>
                </form>
                <p><b>OR</b></p>
                <button>Click here to Login</button>
            </div>
            <Footer/>
        </>
    )
} 

export default SignUp