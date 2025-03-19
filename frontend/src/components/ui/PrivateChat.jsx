// app/components/PrivateChat.js
"use client";

import React from "react";
import MessageList from "../MessageList";

function PrivateChat({ messages, currentUserId, peerUsername }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4">
        <h3 className="font-semibold">Private Chat with {peerUsername}</h3>
      </div>
      <MessageList messages={messages} currentUserId={currentUserId} />
    </div>
  );
}

export default PrivateChat;
