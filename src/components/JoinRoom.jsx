// components/JoinRoom.jsx
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function JoinRoom({ onJoinRoom }) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      setError('Room ID is required');
      return;
    }
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    onJoinRoom(roomId.trim(), username.trim());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          <span className="text-purple-500">Shadow</span>Talk
        </h1>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-center text-white">Join a Room</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="room-id" className="text-sm font-medium text-slate-300">
                  Room ID:
                </label>
                <Input
                  id="room-id"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-slate-300">
                  Username:
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Join Room</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default JoinRoom;