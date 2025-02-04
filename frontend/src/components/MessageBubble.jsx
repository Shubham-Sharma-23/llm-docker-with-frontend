import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
        } shadow`}
      >
        <div className="flex items-center space-x-2 mb-1">
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          <span className="font-medium">
            {isUser ? 'You' : 'Assistant'}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;