// components/ui/ParticipantList.jsx
import React from 'react';

function ParticipantList({ participants, currentUser, onSelectParticipant, selectedPeer }) {
  const participantArray = Object.entries(participants).map(([id, data]) => ({
    id,
    username: data.username,
  }));

  return (
    <div className="h-full overflow-y-auto bg-slate-800">
      <div className="p-3 border-b border-slate-700">
        <h3 className="text-sm font-semibold text-slate-300">Participants ({participantArray.length})</h3>
      </div>
      <div className="p-2">
        {participantArray.length === 0 ? (
          <div className="text-center text-slate-500 py-4">No participants</div>
        ) : (
          <ul className="space-y-1">
            {participantArray.map((participant) => (
              <li key={participant.id}>
                <button
                  onClick={() => participant.username !== currentUser && onSelectParticipant(participant.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    participant.username === currentUser
                      ? 'text-purple-400 bg-slate-700/50 cursor-default'
                      : selectedPeer === participant.id
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                  }`}
                  disabled={participant.username === currentUser}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="truncate">
                      {participant.username} {participant.username === currentUser && '(You)'}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ParticipantList;