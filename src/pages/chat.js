// pages/chat.js
import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import JoinRoom from '../components/JoinRoom';
import ChatRoom from '../components/ChatRoom';
import { WebRTCProvider } from '../contexts/WebRTCContext';

export default function Chat() {
  const [roomState, setRoomState] = useState({
    isInRoom: false,
    roomId: null,
    username: null
  });

  const handleJoinRoom = (roomId, username) => {
    setRoomState({
      isInRoom: true,
      roomId,
      username
    });
  };

  const handleLeaveRoom = () => {
    setRoomState({
      isInRoom: false,
      roomId: null,
      username: null
    });
  };

  return (
    <Layout>
      <Head>
        <title>Chat - Shadow Talk</title>
        <meta name="description" content="Start a secure, private conversation on Shadow Talk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-24 pb-16 bg-slate-900 min-h-screen">
        {!roomState.isInRoom ? (
          <JoinRoom onJoinRoom={handleJoinRoom} />
        ) : (
          <WebRTCProvider roomId={roomState.roomId} username={roomState.username}>
            <ChatRoom 
              roomId={roomState.roomId} 
              username={roomState.username} 
              onLeaveRoom={handleLeaveRoom} 
            />
          </WebRTCProvider>
        )}
      </div>
    </Layout>
  );
}