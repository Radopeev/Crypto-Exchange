import React from 'react';

const CryptoPriceTable = ({ cryptoData, symbols }) => {
    return (
        <div className="crypto-price-table">
            <h3>Live Crypto Prices</h3>
            <div className="table-container">
                <table className="crypto-table">
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Bid</th>
                        <th>Ask</th>
                        <th>Last</th>
                        <th>Change</th>
                    </tr>
                    </thead>
                    <tbody>
                    {symbols.map((crypto) => {
                        const c = cryptoData[crypto.symbol];
                        return (
                            <tr key={crypto.symbol}>
                                <td>{crypto.symbol}</td>
                                <td>{c ? `$${c.bid.toFixed(2)}` : 'Loading...'}</td>
                                <td>{c ? `$${c.ask.toFixed(2)}` : 'Loading...'}</td>
                                <td>{c ? `$${c.last.toFixed(2)}` : 'Loading...'}</td>
                                <td>
                                    {c ? (
                                        <span className={c.change_pct >= 0 ? 'change-up' : 'change-down'}>
                                          {c.change_pct.toFixed(2)}%
                                        </span>
                                    ) : (
                                        'Loading...'
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CryptoPriceTable;
