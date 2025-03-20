// components/MessageInput.jsx
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="flex items-center gap-2 p-4 border-t border-slate-700 bg-slate-800" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-slate-700 border-slate-600 text-white"
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
        <div className='flex justify-center align-middle'><Send size={18} className=" mt-0.5 mr-1" /> Send</div>
      </Button>
    </form>
  );
}

export default MessageInput;