import React, { useState } from 'react';


function ChatBot({ onSend }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! How can I help you with your expenses today?' }
    ]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        onSend(input, (response) => {
            setMessages([...newMessages, { sender: 'bot', text: response }]);
        });

        setInput('');
    };

    return (
        <div className="chatbot-container p-4 border rounded-lg shadow-md w-full max-w-md mx-auto bg-white">
            <div className="chatbox h-64 overflow-y-auto mb-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-grow border rounded-l px-3 py-2"
                    placeholder="Ask me anything..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBot;
