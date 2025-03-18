// components/ConnectionRequestDialog.jsx
import { Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConnectionRequestDialog = ({ fromUserId, onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full border border-slate-700">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-white">Connection Request</h3>
          
          <div className="text-slate-300 text-center mb-2">
            <p>User <span className="font-semibold text-purple-400">{fromUserId}</span> wants to start a secure chat with you.</p>
          </div>
          
          <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
            <Shield className="h-4 w-4" />
            <span>End-to-end encrypted connection</span>
          </div>
          
          <div className="flex gap-3 w-full">
            <Button onClick={onDecline} variant="outline" className="flex-1 border-slate-600 hover:bg-slate-700 text-slate-300">
              Decline
            </Button>
            <Button onClick={onAccept} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequestDialog;