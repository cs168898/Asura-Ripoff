import {useState} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

function Login(){
    //insert js function

    return(
        <>
        <Header/>
        <div className='login-wrapper'>
            <form onSubmit="handdleSubmit">
                <label><b>Username:</b> </label>
                <input 
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="Enter your username here"
                    required
                 /> <br />
                <label><b>Password: </b></label>
                <input 
                    type="text"
                    name="Password"
                    id="Password"
                    placeholder="Enter your password here"
                    required
                /> <br /><br />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>OR</p>
            <button className="direct-to-signup">Click here to Sign Up</button>
        </div>
        <Footer/>
        </>
    )
}

export default Login