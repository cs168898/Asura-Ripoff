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

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);


   

    // Validation functions
    const validateUsername = (username) => {
        if (username.length < 4) {
            setUsernameError("Username must be at least 4 characters long.");
        } else {
            setUsernameError('');
        }
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else {
            setPasswordError('');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.-]+@(localhost|[a-zA-Z0-9.-]{1,5})(?:\.[a-zA-Z0-9]{2,3}){0,2}$/
;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email with 2-4 extensions (e.g., .com, .net).");
        } else {
            setEmailError('');
        }
    };

    const validateConfirmPassword =  (password, confirmPassword) => {

        if (password != confirmPassword){
            setConfirmPasswordError("Your passwords do not match.");
        } else {
            setConfirmPasswordError('')
        }
    }

    const handleChange = (e) => {   
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'username') validateUsername(value);
        if (name === 'password') validatePassword(value);
        if (name === 'email') validateEmail(value);
        if (name === 'confirmPassword') validateConfirmPassword(formData.password, value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Start loading when submit is clicked


      
        // Validation checks
        if (formData.username.length < 4) {
            setLoading(false); // Stop loading if validation fails
            return;
        }

        // Matches email extensions between 2 to 4 characters
        const emailPattern = /^[a-zA-Z0-9.-]+@(localhost|[a-zA-Z0-9.-]{1,5})(?:\.[a-zA-Z0-9]{2,3}){0,2}$/; 
        if (!emailPattern.test(formData.email)) {
            setLoading(false); 
            return;
        }

        if (formData.password.length < 8) {
            setLoading(false); 
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setLoading(false); 
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
                setLoading(false); // Stop loading after getting a response
                setMessage("Registration successful. Redirecting to login...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Redirect after 2 seconds
            } else{
                setMessage(response.data.message); // Show error message
                setLoading(false); 
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred. Please try again.");
            setLoading(false); 
        }
    };

    return (
        <>
            <Header />
            <div className="signup-wrapper">
            {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
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
                    {usernameError && <p className="error-message">{usernameError}</p>}
                    
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
                    {emailError && <p className="error-message">{emailError}</p>}
                    
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
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    
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
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Sign Up now'}
                    </button>
                </form>
                
                <p><b>OR</b></p>
                <button onClick={() => navigate('/Login')} className="direct-to-login">Click here to Login</button>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
