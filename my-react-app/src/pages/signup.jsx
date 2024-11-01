import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import Login from './login';

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost/comic_backend/register_user.php', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            });
            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occured. Please try again.");
        }
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
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username here"
                        required
                        />
                    
                    <b>Email: </b>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email here"
                        required
                        />
                    
                    <b>Password: </b>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={formData.password}
                        onChange={handleChange} 
                        placeholder="Enter your password here"
                        required
                        />
                    
                    <b>Confirm Password: </b>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange} 
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