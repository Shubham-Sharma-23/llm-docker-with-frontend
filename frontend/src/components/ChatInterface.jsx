import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useOllama } from '../hooks/useOllama';
import MessageBubble from './MessageBubble';
import ModelStatus from './ModelStatus';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { modelInfo, isLoading, generateChat } = useOllama();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    let fullResponse = '';
    const handleResponse = (chunk) => {
      fullResponse += chunk;
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = fullResponse;
          return [...newMessages];
        } else {
          return [...prev, { role: 'assistant', content: fullResponse }];
        }
      });
    };

    await generateChat(userMessage, handleResponse);
  };

  return (
    <div className="flex flex-col h-screen">
      <ModelStatus modelInfo={modelInfo} />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;