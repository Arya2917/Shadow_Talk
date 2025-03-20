// components/ui/PrivateChat.jsx
import React, { useEffect, useRef } from 'react';

function PrivateChat({ messages, currentUserId, peerUsername }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);

  // Auto-scroll to bottom only on new messages, not on every render
  useEffect(() => {
    // Only scroll if:
    // 1. There are actually messages
    // 2. Either the number of messages increased
    // 3. Or the user is already at the bottom
    if (messages.length > 0 && (
        messages.length > prevMessagesLengthRef.current || 
        isUserAtBottom()
      )) {
      scrollToBottom();
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  // Check if user is already near the bottom
  const isUserAtBottom = () => {
    if (!containerRef.current) return true;
    
    const container = containerRef.current;
    const threshold = 150; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  };

  // Scroll to bottom of message list
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900"
    >
      {messages.length === 0 ? (
        <div className="text-center text-slate-500 py-8">No messages yet with {peerUsername}</div>
      ) : (
        messages.map((msg, index) => {
          const isCurrentUser = msg.from === currentUserId;
          
          return (
            <div 
              key={index}
              className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                isCurrentUser ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}>
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="font-medium">{isCurrentUser ? 'You' : peerUsername}</span>
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

export default PrivateChat;