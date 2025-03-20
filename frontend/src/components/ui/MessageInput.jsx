// components/ui/MessageInput.jsx
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing or scrolling
    
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Focus back on input after sending a message
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    // Prevent Enter key from causing unwanted page movements
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700 p-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <Button 
          type="submit" 
          disabled={!message.trim()} 
          className="bg-purple-600 hover:bg-purple-700 text-white p-2"
          size="icon"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}

export default MessageInput;