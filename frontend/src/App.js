import React, { useEffect, useState } from 'react';
import { fetchApiData } from './api';
import useWebSocket from './useWebSocket';
import AccountInfo from './components/AccountInfo';
import TransactionHistory from './components/TransactionHistory';
import BuySellForm from './components/BuySellForm';
import CryptoPriceTable from './components/CryptoPriceTable';
import './App.css';


const symbols = [
    { symbol: "BTC" },
    { symbol: "ETH" },
    {  symbol: "USDT" },
    {  symbol: "XRP" },
    {  symbol: "BNB" },
    {  symbol: "SOL" },
    {  symbol: "USDC" },
    {  symbol: "DOGE" },
    {  symbol: "ADA" },
    {  symbol: "TRX" },
    {  symbol: "WBTC" },
    { symbol: "LINK" },
    { symbol: "TON" },
    {  symbol: "LEO" },
    {  symbol: "XLM" },
    { symbol: "AVAX" },
    {  symbol: "HBAR" },
    {  symbol: "SHIB" },
    {  symbol: "SUI" },
    {  symbol: "DOT" },
];

const App = () => {
    const [balance, setBalance] = useState(10000); // Initial balance
    const [holdings, setHoldings] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const cryptoData = useWebSocket(symbols);

    // Fetch account data
    const fetchData = async () => {
        try {
            const balanceData = await fetchApiData('http://localhost:8080/api/account/balance');
            setBalance(balanceData);
            const holdingsData = await fetchApiData('http://localhost:8080/api/account/holdings');
            setHoldings(holdingsData);
            const transactionsData = await fetchApiData('http://localhost:8080/api/account/transactions');
            setTransactions(transactionsData);
        } catch (error) {
            setErrorMessage(error.message || 'An unknown error occurred');
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initial data
    }, []);

    const handleTransaction = async (action, symbol, amountOrQuantity) => {
        try {
            const params = { symbol, [action === 'buy' ? 'usdAmount' : 'quantity']: amountOrQuantity };
            const response = await fetchApiData(`http://localhost:8080/api/account/${action}`, 'POST', params);
            fetchData(); // Re-fetch data after transaction
        } catch (error) {
            setErrorMessage(error.message || 'Transaction failed');
        }
    };

    const handleReset = async () => {
        try {
            const response = await fetchApiData('http://localhost:8080/api/account/reset','POST',null);
            fetchData();
        } catch (error) {
            console.error('Error resetting account:', error);
            alert('Failed to reset account');
        }
    };

    const toggleHistoryVisibility = () => {
        setIsHistoryVisible((prevState) => !prevState); // Toggle the visibility state
    };

    return (
        <div className="app">
            <h1 className="title">Radoslav's Crypto Exchange</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="layout">
                {/* Left Sidebar (Account Info, Transaction History, Buy/Sell Form) */}
                <div className="left-sidebar">
                    <BuySellForm handleTransaction={handleTransaction} />
                    <AccountInfo balance={balance} holdings={holdings} onReset={handleReset} />
                    <button onClick={toggleHistoryVisibility}>
                        {isHistoryVisible ? 'Hide Transaction History' : 'Show Transaction History'}
                    </button>


                    {isHistoryVisible && <TransactionHistory transactions={transactions} />}
                </div>


                {/* Right Sidebar (Live Crypto Prices Table) */}
                <div className="right-sidebar">
                    <CryptoPriceTable cryptoData={cryptoData} symbols={symbols} />
                </div>
            </div>
        </div>
    );
};

export default App;
