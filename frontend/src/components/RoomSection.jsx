// components/RoomSection.jsx
{/*import { useState } from 'react';
import { Clock, Copy } from 'lucide-react';

const RoomSection = () => {
  const [roomId, setRoomId] = useState('');
  const [otherRoomId, setOtherRoomId] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate a random room ID
  const generateRandomRoom = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRoomId(result);
  };

  // Copy room ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle join room
  const handleJoinRoom = (e) => {
    e.preventDefault();
    // Implementation for joining a room would go here
    console.log(`Joining room: ${otherRoomId}`);
  };

  return (
    <section className="py-16 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Start a Private Conversation</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Generate a secure room number or join an existing conversation by entering a room ID.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">Create a Room</h3>
              <p className="text-slate-300 mb-6">
                Generate a unique room ID and share it with someone you want to chat with.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={generateRandomRoom}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-lg shadow-purple-500/20"
                >
                  Generate Room
                </button>
                
                {roomId && (
                  <div className="flex-1 flex items-center justify-between bg-slate-800 p-3 rounded-md border border-slate-700">
                    <span className="text-white font-mono">{roomId}</span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-slate-300 hover:text-purple-500 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Clock className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                )}
              </div>

              {roomId && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>This room ID expires in 24 hours</span>
                </div>
              )}
            </div>

            <div className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">Join a Room</h3>
              <p className="text-slate-300 mb-6">
                Enter a room ID you've received to join a secure conversation.
              </p>
              
              <form onSubmit={handleJoinRoom}>
                <div className="mb-6">
                  <label htmlFor="roomId" className="block text-sm font-medium text-slate-300 mb-2">
                    Room ID
                  </label>
                  <input
                    type="text"
                    id="roomId"
                    value={otherRoomId}
                    onChange={(e) => setOtherRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter room ID here"
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    maxLength={8}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!otherRoomId}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-md transition-colors shadow-lg shadow-purple-500/20"
                >
                  Join Conversation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSection;*/}