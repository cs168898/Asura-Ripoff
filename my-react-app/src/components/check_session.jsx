import { useState, useEffect } from 'react';
import axios from 'axios';

function useUserSession() {
    const [session, setSession] = useState({ loggedIn: null, userId: null, loading: true });

    useEffect(() => {
        axios.get('http://localhost/comic_backend/is_loggedIn.php', { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    setSession({ loggedIn: true, userId: response.data.user_id, username: response.data.username, loading: false });
                    
                } else {
                    setSession({ loggedIn: false, userId: null, username:null, loading: false });
                }
            })
            .catch(error => {
                console.error("Error fetching session data:", error);
                setSession({ loggedIn: false, userId: null, username:null, loading: false }); // Set as not logged in on error

            });
    }, []);

     // Log whenever session state updates
     useEffect(() => {
        console.log("Session state updated:", session);
    }, [session]);

    return session;
}

export default useUserSession;
