// components/MessageList.jsx
"use client";

import React, { useEffect, useRef } from 'react';

function MessageList({ messages, currentUserId }) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);

  // Auto-scroll to bottom only when new messages arrive (not on every render)
  useEffect(() => {
    // Only scroll if new messages have been added
    if (messages.length > prevMessagesLength.current) {
      if (messagesEndRef.current) {
        // Check if user was already at the bottom before scrolling
        const container = messagesContainerRef.current;
        const isAtBottom = container && 
          container.scrollHeight - container.clientHeight <= container.scrollTop + 50;
        
        // Only auto-scroll if user was already at the bottom or this is the first load
        if (isAtBottom || prevMessagesLength.current === 0) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }
    
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900"
      onClick={(e) => e.stopPropagation()} // Prevent click propagation
    >
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