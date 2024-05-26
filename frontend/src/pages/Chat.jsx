import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');

function Chat() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [cookies, removeCookie] = useCookies([]);
    const [usernames, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:5000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    useEffect(() => {
        axios.get('http://localhost:5000/messages')
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
        const msg = { username: usernames, message };
        socket.emit('chat message', msg);
        setMessage('');
    };

    return (
        <div className='bg-[#071e34] h-screen flex jutify-cemter items-center'>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
                <a className='text-3xl text-red-600' href="/">Home</a>
                
                <h1 className="text-xl font-bold my-4 ">Chat App</h1>
                <div className="chat-box mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <strong>{msg.username}: </strong>{msg.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow mr-2 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
