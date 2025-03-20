// components/ChatRoom.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWebRTC } from "../contexts/WebRTCContext";
import ParticipantList from "./ui/ParticipantList";
import MessageList from "./MessageList";
import MessageInput from "./ui/MessageInput";
import PrivateChat from "./ui/PrivateChat";
import { Button } from "@/components/ui/button";
import { Users, X } from "lucide-react";

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
  const [showParticipants, setShowParticipants] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chatContainerRef = useRef(null);

  // Check if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowParticipants(true);
      }
    };

    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent page scrolling when inside chat container
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    
    if (!chatContainer) return;
    
    const handleWheel = (e) => {
      const { deltaY, currentTarget } = e;
      const { scrollTop, scrollHeight, clientHeight } = currentTarget;
      
      // Check if we're at the top or bottom
      if (
        (scrollTop === 0 && deltaY < 0) || 
        (scrollTop + clientHeight >= scrollHeight && deltaY > 0)
      ) {
        // We're at the top and scrolling up, or at the bottom and scrolling down
        // Allow normal page scroll
        return;
      }
      
      // Prevent page scroll
      e.stopPropagation();
    };
    
    chatContainer.addEventListener('wheel', handleWheel);
    
    return () => {
      chatContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Maintain focus in the chat room when entering/switching
  useEffect(() => {
    const handleFocus = () => {
      // Prevent auto-scrolling by focusing without scrolling
      window.scrollTo({
        top: window.scrollY,
        behavior: 'auto'  // Use 'auto' to prevent smooth scrolling
      });
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

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
    // On mobile, hide participant list after selection
    if (isMobile) {
      setShowParticipants(false);
    }
  };

  const handleBackToGroup = () => {
    setView("group");
  };

  const toggleParticipantsList = () => {
    setShowParticipants(!showParticipants);
  };

  if (!connected) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-150px)]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Connecting to room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 h-[calc(100vh-150px)]">
      <div 
        ref={chatContainerRef}
        className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700 h-full flex flex-col"
      >
        <div className="border-b border-slate-700 p-4 flex justify-between items-center bg-slate-800 flex-shrink-0">
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                onClick={toggleParticipantsList}
                className="text-slate-300 hover:bg-slate-700 mr-2 md:hidden p-2"
                size="sm"
              >
                <Users size={20} />
              </Button>
            )}
            <h2 className="text-xl font-semibold text-white truncate">
              {view === "group"
                ? `Room: ${roomId}`
                : `Chat with ${participants[selectedPeer]?.username}`}
            </h2>
          </div>
          <div className="flex gap-2">
            {view === "private" && (
              <Button
                variant="outline"
                onClick={handleBackToGroup}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hidden sm:inline-flex"
              >
                Back to Group
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={onLeaveRoom}
              className="bg-red-600 hover:bg-red-700"
              size={isMobile ? "sm" : "default"}
            >
              {isMobile ? "Leave" : "Leave Room"}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Mobile Participants List (Overlay) */}
          {isMobile && showParticipants && (
            <div className="absolute inset-0 z-20 bg-slate-900/95 flex flex-col">
              <div className="p-3 flex justify-between items-center border-b border-slate-700">
                <h3 className="text-white font-semibold">Participants</h3>
                <Button 
                  variant="ghost" 
                  onClick={toggleParticipantsList}
                  className="text-slate-300 hover:bg-slate-700 p-1"
                  size="sm"
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ParticipantList
                  participants={participants}
                  currentUser={username}
                  onSelectParticipant={handleSelectParticipant}
                  selectedPeer={selectedPeer}
                />
              </div>
            </div>
          )}

          {/* Desktop Participants List */}
          {(!isMobile || (isMobile && showParticipants)) && (
            <div className={`w-1/4 min-w-[200px] border-r border-slate-700 overflow-hidden ${isMobile ? 'hidden' : 'block'}`}>
              <ParticipantList
                participants={participants}
                currentUser={username}
                onSelectParticipant={handleSelectParticipant}
                selectedPeer={selectedPeer}
              />
            </div>
          )}

          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            {view === "private" && (
              <div className="block sm:hidden p-2 bg-slate-800 border-b border-slate-700 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={handleBackToGroup}
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-sm py-1"
                  size="sm"
                >
                  Back to Group
                </Button>
              </div>
            )}
            
            {view === "group" ? (
              <MessageList
                messages={groupMessages}
                currentUserId={username}
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