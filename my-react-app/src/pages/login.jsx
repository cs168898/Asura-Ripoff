import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

axios.defaults.withCredentials = true;

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // State to store error messages

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost/comic_backend/check_session.php');
                if (response.data.loggedIn) {
                    navigate('/');
                }
            } catch (error) {
                console.error("Session check error:", error);
            }
        };

        checkSession();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setError(''); // Clear error message when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost/comic_backend/login_user.php',
                JSON.stringify(credentials),
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                setMessage(response.data.message);
                navigate('/');
            } else {
                setError(response.data.message || "Invalid username or password"); // Set error message
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
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
                    {/* Display error message if there’s an error */}
                {error && <p className='error-message' style={{ color: 'red', fontWeight: 'bold'}}> {error}</p>} 
                    <button type="submit" className="login-button">Login</button>
                </form>

                

                <p>OR</p>
                <button onClick={() => navigate('/SignUp')} className="direct-to-signup">Click here to Sign Up</button>
            </div>
            <Footer />
        </>
    );
}

export default Login;
