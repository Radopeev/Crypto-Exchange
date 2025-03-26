import React from 'react';

const TransactionHistory = ({ transactions }) => {
    return (
        <div className="transaction-history">
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className={`transaction-item ${transaction.action}`}>
                        <div className="transaction-details">
                            <div className="detail">
                                <span className="label">Symbol:</span> {transaction.crypto}
                            </div>
                            <div className="detail">
                                <span className="label">Quantity:</span> {transaction.quantity}
                            </div>
                            <div className="detail">
                                <span className="label">Price:</span> ${transaction.price}
                            </div>
                            <div className="detail">
                                <span className="label">Action:</span> {transaction.action}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
