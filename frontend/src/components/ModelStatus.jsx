import React from 'react';
import { Bot } from 'lucide-react';

const ModelStatus = ({ modelInfo }) => {
  return (
    <div className="bg-white shadow p-4">
      <div className="flex items-center space-x-2">
        <Bot className="w-6 h-6 text-blue-500" />
        <div>
          <h1 className="text-lg font-semibold">Model: {modelInfo.name}</h1>
          <p className="text-sm text-gray-500">
            Status: {modelInfo.status === 'ready' ? 'Ready' : 'Connecting...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelStatus;
