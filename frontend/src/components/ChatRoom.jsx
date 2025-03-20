// components/ChatRoom.jsx
"use client";

import React, { useState } from "react";
import { useWebRTC } from "../contexts/WebRTCContext";
import ParticipantList from "./ui/ParticipantList";
import MessageList from "./MessageList";
import MessageInput from "./ui/MessageInput";
import PrivateChat from "./ui/PrivateChat";
import { Button } from "@/components/ui/button";

function ChatRoom({ roomId, username, onLeaveRoom }) {
  const {
    connected,
    
    participants,
    groupMessages,
    privateMessages,
    selectedPeer,
    setSelectedPeer,
    sendGroupMessage,
    sendPrivateMessage,
  } = useWebRTC();

  const [view, setView] = useState("group"); // 'group' or 'private'

  const handleSendMessage = (message) => {
    if (view === "group") {
      sendGroupMessage(message);
    } else if (selectedPeer) {
      sendPrivateMessage(selectedPeer, message);
    }
  };

  const handleSelectParticipant = (participantId) => {
    setSelectedPeer(participantId);
    setView("private");
  };

  const handleBackToGroup = () => {
    setView("group");
  };

  if (!connected) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Connecting to room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 h-[calc(100vh-150px)]">
        <div className="border-b border-slate-700 p-4 flex justify-between items-center bg-slate-800">
          <h2 className="text-xl font-semibold text-white">
            {view === "group"
              ? `Room: ${roomId}`
              : `Private chat with ${participants[selectedPeer]?.username}`}
          </h2>
          <div className="flex gap-2">
            {view === "private" && (
              <Button
                variant="outline"
                onClick={handleBackToGroup}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Back to Group
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={onLeaveRoom}
              className="bg-red-600 hover:bg-red-700"
            >
              Leave Room
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden h-[calc(100%-64px)]">
          <ParticipantList
            participants={participants}
            currentUser={username}
            onSelectParticipant={handleSelectParticipant}
            selectedPeer={selectedPeer}
          />

          <div className="flex-1 flex flex-col bg-slate-900">
            {view === "group" ? (
              <MessageList
                messages={groupMessages}
                currentUserId={username} // Use username for comparison
              />
            ) : (
              <PrivateChat
                messages={privateMessages[selectedPeer] || []}
                currentUserId={username}
                peerUsername={participants[selectedPeer]?.username}
              />
            )}
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
