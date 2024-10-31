import Header from '../components/header'
import Footer from '../components/footer';

function Account(){
    //insert js here

    return(
        <>
        <Header />

        <div className="account-page-wrapper">
            <div className="account-page-inner">
                <div className="profile-picture">
                    <img src="/" alt="profile-picture" />
                </div>
                <div className="subscription-status">
                    <div className="subscription-message">
                        Your account is NOT premium
                    </div>
                    <button>Subscribe</button>
                </div>
                

            </div>
            <div className="change-credentials-form">
                    <form action="">
                        <label htmlFor="username" >Change Username: </label>
                        <input type="text" />
                        <button>Change</button>

                        <label htmlFor="username">Change Password: </label>
                        <input type="text" />
                        <button>Change</button>

                        <label htmlFor="username">Change Email: </label>
                        <input type="text" />
                        <button>Change</button>
                    </form>
                </div>
        </div>


        <Footer />

        </>
    )

}

export default Account;