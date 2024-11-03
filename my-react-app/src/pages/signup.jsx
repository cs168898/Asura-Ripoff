import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (formData.username.length < 4) {
            setMessage("Username must be at least 4 characters long.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/; // Matches email extensions between 2 to 4 characters
        if (!emailPattern.test(formData.email)) {
            setMessage("Please enter a valid email with a 2-4 character extension (e.g., .com, .net).");
            return;
        }

        if (formData.password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost/comic_backend/register_user.php',
                formData,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
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
                        placeholder="Confirm your password here"
                        required
                    />
                    
                        {/* Display the validation message */}
                        {message && <p className="error-message" style={{color:'red', fontWeight:'bold', textAlign: 'center', fontSize:'medium'}}>{message}</p>}
                    
                    
                    
                    <button type="submit" className="signup-button">Sign Up now</button>
                </form>

                

                <p><b>OR</b></p>
                <button onClick={() => navigate('/Login')} className="direct-to-login">Click here to Login</button>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
