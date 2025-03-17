// components/HeroSection.jsx
import { MessageSquare, Shield, Zap, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Connect in the <span className="text-purple-500">Shadows</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            A secure and private messaging platform where conversations happen in the dark. 
            Share your thoughts without sharing your identity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-lg shadow-purple-500/20">
              Get Started
            </button>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors shadow-lg">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <FeatureCard 
            icon={<Shield className="w-10 h-10 text-purple-500" />}
            title="End-to-End Encryption"
            description="Your messages are encrypted and can only be read by you and your recipient."
          />
          <FeatureCard 
            icon={<MessageSquare className="w-10 h-10 text-purple-500" />}
            title="Anonymous Messaging"
            description="Share your thoughts without revealing your identity."
          />
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-purple-500" />}
            title="Instant Delivery"
            description="Messages are delivered instantly across the globe."
          />
          <FeatureCard 
            icon={<Clock className="w-10 h-10 text-purple-500" />}
            title="Self-Destructing Messages"
            description="Set messages to disappear after they've been read."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-purple-500/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

export default HeroSection;