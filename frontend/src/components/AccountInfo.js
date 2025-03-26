import React from 'react';

const AccountInfo = ({ balance, holdings, onReset }) => {
    return (
        <div className="account-info">
            <h2>Account Info</h2>
            <p>Balance: ${balance.toFixed(2)}</p>
            <h3>Holdings</h3>
            <table className="crypto-table">
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(holdings).map((symbol) => (
                    <tr key={symbol}>
                        <td>{symbol}</td>
                        <td>{holdings[symbol]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={onReset} className="reset-button">Reset Account</button>
        </div>
    );
};

export default AccountInfo;
