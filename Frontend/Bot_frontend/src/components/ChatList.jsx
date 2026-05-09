import React from 'react';

const ChatList = ({ isOpen, chats, currentChatId, onSelectChat }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <h2>Chats</h2>
            </div>

            <div className="chat-list">
                {chats.length === 0 ? (
                    <p className="empty-state">No recent chats</p>
                ) : (
                    chats.map(chat => (
                        <button
                            key={chat.id}
                            className={`chat-list-item ${currentChatId === chat.id ? 'active' : ''}`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            {chat.title || `Chat ${chat.id.substring(0, 5)}...`}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
};

export default ChatList;