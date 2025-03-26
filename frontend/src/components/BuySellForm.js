import React from 'react';

const BuySellForm = ({ handleTransaction }) => {
    return (
        <div className="buy-sell-container">
            {/* Buy Form */}
            <div className="buy-sell-form">
                <h2>Buy Crypto</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const symbol = e.target.symbol.value.toUpperCase();
                        const usdAmount = parseFloat(e.target.usdAmount.value);
                        handleTransaction('buy', symbol, usdAmount);
                    }}
                >
                    <div className="form-group">
                        <label>Symbol:</label>
                        <input type="text" name="symbol" required />
                    </div>
                    <div className="form-group">
                        <label>Amount in USD:</label>
                        <input type="number" name="usdAmount" required />
                    </div>
                    <button type="submit">Buy</button>
                </form>
            </div>

            {/* Sell Form */}
            <div className="buy-sell-form">
                <h2>Sell Crypto</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const symbol = e.target.symbol.value.toUpperCase();
                        const quantity = parseFloat(e.target.quantity.value);
                        handleTransaction('sell', symbol, quantity);
                    }}
                >
                    <div className="form-group">
                        <label>Symbol:</label>
                        <input type="text" name="symbol" required />
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="number" name="quantity" required />
                    </div>
                    <button type="submit">Sell</button>
                </form>
            </div>
        </div>
    );
};

export default BuySellForm;
