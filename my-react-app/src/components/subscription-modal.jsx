import React, { useState } from 'react';
import Modal from "react-modal";


Modal.setAppElement('#root'); // Ensures accessibility

function Subscription_Modal({ isOpen, onRequestClose }){
    // State to track the selected radio button's value
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
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

                <label>
                <div className="merchant">
                    <img src="/" alt="Merchant 1" />
                    <input
                    type="radio"
                    name="options"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>
                
                <label>
                <div className="merchant">
                <img src="/" alt="Merchant 2" />
                <input
                    type="radio"
                    name="options"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>

                <label>
                <div className="merchant">
                <img src="/" alt="Merchant 3" />
                <input
                    type="radio"
                    name="options"
                    value="option3"
                    checked={selectedOption === 'option3'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>

                <label>
                <div className="merchant">
                <img src="/" alt="Merchant 4" />
                <input
                    type="radio"
                    name="options"
                    value="option4"
                    checked={selectedOption === 'option4'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>

                <label>
                <div className="merchant">
                <img src="/" alt="Merchant 5" />
                <input
                    type="radio"
                    name="options"
                    value="option5"
                    checked={selectedOption === 'option5'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>

                <label>
                <div className="merchant">
                <img src="/" alt="Merchant 6" />
                <input
                    type="radio"
                    name="options"
                    value="option6"
                    checked={selectedOption === 'option6'}
                    onChange={handleRadioChange}
                    />
                </div>
                </label>

                <div className="button-wrapper">
                <button>Go</button>
                </div>
                
                
            </div>
        </div>

        </Modal>
    );
}

export default Subscription_Modal