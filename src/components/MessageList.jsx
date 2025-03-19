// components/MessageList.jsx
"use client";

import React, { useEffect, useRef } from 'react';

function MessageList({ messages, currentUserId }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
      {messages.length === 0 ? (
        <div className="text-center text-slate-500 py-8">No messages yet</div>
      ) : (
        messages.map((msg, index) => {
          const isCurrentUser = msg.username === currentUserId || msg.from === currentUserId;
          
          return (
            <div 
              key={index}
              className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                isCurrentUser ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="font-medium">{isCurrentUser ? 'You' : msg.username || msg.from}</span>
                  <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                </div>
                <div>{msg.message}</div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;