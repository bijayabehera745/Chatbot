import React, { useState } from 'react';
import ChatInputHandle from './ChatInputHandle';

const MainChatBox = ({ toggleSidebar, onNewChat, currentChatId, messages, setMessages }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (formData, text, files) => {
        const newMessage = { role: 'user', text: text, files: files };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        try {
            formData.append('chatId', currentChatId);

            const response = await fetch('http://localhost:8000/api/chat/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
            } else {
                console.error("Backend Error:", data.message);
                setMessages(prev => [...prev, { role: 'bot', text: 'Error: Could not get a response.' }]);
            }
        } catch (error) {
            console.error("Network Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: 'Error: Could not connect to the server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetChat = async () => {
        onNewChat();

        try {
            await fetch('http://localhost:8000/api/reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId: currentChatId }),
            });
        } catch (error) {
            console.error("Failed to reset backend context:", error);
        }
    };

    return (
        <main className="chat-area">
            <header className="chat-header">
                <div className="header-left">
                    <button className="icon-btn toggle-btn" onClick={toggleSidebar}>☰</button>
                </div>
                <div className="header-right">
                    <button className="new-chat-btn" onClick={handleResetChat}>
                        New Chat
                    </button>
                </div>
            </header>

            <div className="message-list">
                {messages.length === 0 ? (
                    <p className="empty-state">Start a conversation...</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role}`}>
                            <strong>{msg.role === 'user' ? 'You' : 'Bot'}: </strong>
                            <span>{msg.text}</span>
                            {msg.files && msg.files.map((f, i) => <span key={i} className="msg-file-tag"> [{f.name}] </span>)}
                        </div>
                    ))
                )}
            </div>

            <div className="input-wrapper">
                <ChatInputHandle onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </main>
    );
};

export default MainChatBox;