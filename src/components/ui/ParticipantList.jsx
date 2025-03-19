// components/ParticipantList.jsx
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, User } from 'lucide-react';

function ParticipantList({ participants, currentUser, onSelectParticipant, selectedPeer }) {
  return (
    <div className="border-r border-slate-700 p-4 w-64 bg-slate-800 overflow-y-auto">
      <h3 className="font-semibold mb-4 text-white flex items-center">
        <User size={18} className="mr-2 text-purple-500" /> Participants
      </h3>
      <ul className="space-y-2">
        {Object.entries(participants).map(([id, participant]) => (
          <li 
            key={id}
            className={`p-2 rounded-md cursor-pointer hover:bg-slate-700 flex justify-between items-center ${
              selectedPeer === id ? 'bg-slate-700 border-l-2 border-purple-500' : ''
            }`}
            onClick={() => participant.username !== currentUser && onSelectParticipant(id)}
          >
            <div className="truncate text-slate-300">
              {participant.username}
              {participant.username === currentUser && ' (You)'}
            </div>
            {participant.username !== currentUser && (
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 text-xs text-slate-300 hover:bg-slate-600 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectParticipant(id);
                }}
              >
                <MessageSquare size={14} className="mr-1" /> Chat
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;