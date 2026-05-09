import React, { useState } from 'react';
import ChatList from './components/ChatList';
import MainChatBox from './components/MainChatBox';
import './App.css'; 

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const initialChatId = Date.now().toString();
  const [currentChatId, setCurrentChatId] = useState(initialChatId);
  
  const [chatHistory, setChatHistory] = useState([
      { id: initialChatId, title: 'Current Session' }
  ]); 

  const [allMessages, setAllMessages] = useState({
      [initialChatId]: []
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatHistory(prev => [
      { id: newId, title: `Chat at ${timeString}` },
      ...prev 
    ]);
    
    //Empty meessage array
    setAllMessages(prev => ({
        ...prev,
        [newId]: []
    }));

    setCurrentChatId(newId);
  };

  const setMessagesForCurrentChat = (updater) => {
    setAllMessages(prev => {
        const currentMessages = prev[currentChatId] || [];

        const newMessages = typeof updater === 'function' ? updater(currentMessages) : updater;
        return {
            ...prev,
            [currentChatId]: newMessages
        };
    });
  };

  return (
    <div className="app-container">
      <ChatList 
        isOpen={isSidebarOpen} 
        chats={chatHistory} 
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId} 
      />
      <MainChatBox 
        toggleSidebar={toggleSidebar} 
        onNewChat={handleNewChat} 
        currentChatId={currentChatId}
        messages={allMessages[currentChatId] || []}
        setMessages={setMessagesForCurrentChat}
      />
    </div>
  );
};

export default App;