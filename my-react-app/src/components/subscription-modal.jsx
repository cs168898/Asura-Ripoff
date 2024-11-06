import React, { useState } from 'react';
import Modal from "react-modal";


Modal.setAppElement('#root'); // Ensures accessibility

function Subscription_Modal({ isOpen, onRequestClose }){
    // State to track the selected radio button's value
    const [selectedOption, setSelectedOption] = useState(null);

    const merchantData = {
        option1: { url: "", img: "http://localhost/uploads/merchants/paypal.png" },
        option2: { url: "", img: "http://localhost/uploads/merchants/visa.png" },
        option3: { url: "", img: "http://localhost/uploads/merchants/mastercard.png" },
        option4: { url: "", img: "http://localhost/uploads/merchants/stripe.png" },
        option5: { url: "", img: "http://localhost/uploads/merchants/shopify.png" },
        option6: { url: "", img: "http://localhost/uploads/merchants/bankofamerica.png" },
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleGoClick = () => {
        if (selectedOption && merchantData[selectedOption]) {
            window.location.href = merchantData[selectedOption].url;
        } else {
            alert("Please select a merchant");
        }
    };

    return(
        <Modal isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', color: 'black' }
          }}
        >

            <div className="merchant-wrapper">
                <div className="header">
                    Choose a Merchant
                    <button onClick={onRequestClose}>X</button>
                </div>
                <div className="merchants">
                    {Object.keys(merchantData).map((option, index) => (
                                            <label key={index}>
                                                <div className="merchant" key={index}> 
                                                    <img src={merchantData[option].img} alt={`Merchant ${index +1}`} />
                                                    <input
                                                    type="radio"
                                                    name="options"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={handleRadioChange}
                                                    />
                                                </div>
                                            </label>                    
                    ))}
                </div>
                <div className="button-wrapper">
                        <button onClick={handleGoClick}>Go</button>       
                </div>
            </div>
        </Modal>
    );
}

export default Subscription_Modal