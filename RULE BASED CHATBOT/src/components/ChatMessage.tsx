import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${isBot ? 'bg-blue-100' : 'bg-green-100'}`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-blue-600" />
        ) : (
          <User className="w-5 h-5 text-green-600" />
        )}
      </div>
      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`px-4 py-2 rounded-lg max-w-md break-words
          ${isBot ? 'bg-gray-100 rounded-tl-none' : 'bg-blue-500 text-white rounded-tr-none'}`}>
          {message}
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}