import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (symbols) => {
    const [cryptoData, setCryptoData] = useState({});

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/crypto-websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('✅ Connected to WebSocket');

                symbols.forEach((crypto) => {
                    stompClient.subscribe(`/topic/crypto/${crypto.symbol}`, (msg) => {
                        try {
                            const data = JSON.parse(msg.body);
                            setCryptoData((prev) => ({
                                ...prev,
                                [crypto.symbol]: data,
                            }));
                        } catch (err) {
                            console.error('Error parsing WebSocket message:', err);
                        }
                    });
                });
            },
            onStompError: (err) => {
                console.error('❌ STOMP error', err);
            },
        });

        stompClient.activate();

        return () => {
            if (stompClient.active) stompClient.deactivate();
        };
    }, [symbols]);

    return cryptoData;
};

export default useWebSocket;
