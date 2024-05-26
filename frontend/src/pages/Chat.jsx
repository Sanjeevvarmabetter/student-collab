import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/messages')
            .then(response => {
                setMessages(response.data);
            });

        socket.on('chat message', msg => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        return () => socket.off('chat message');
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        const msg = { username: 'User', message };
        socket.emit('chat message', msg);
        setMessage('');
    };

    return (
        <div className="ChatApp">
            <h1>Chat App</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
