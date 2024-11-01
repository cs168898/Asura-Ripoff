import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header'
import Footer from '../components/footer'
import SignUp from './signup'
import Home from './Home'

function Login(){
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost/comic_backend/check_session.php');
                if (response.data.loggedIn) {
                    navigate('/Comics');
                }
            } catch (error) {
                console.error("Session check error:", error);
            }
        };

        checkSession();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/login_user.php',
                credentials,
                { headers: { 'Content-Type': 'application/json'}}
            );

            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/Comics');
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occured. Please try again");
        }
    };

    return(
        <>
        <Header/>
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit}>
                <label><b>Username:</b> </label>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter your username here"
                    required
                 /> <br />
                <label><b>Password: </b></label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password here"
                    required
                /> <br /><br />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>OR</p>
            <button onClick={() => navigate('/SignUp')} className="direct-to-signup">Click here to Sign Up</button>
        </div>
        <Footer/>
        </>
    )
}

export default Login