// pages/learn-more.js
import Head from "next/head";
import Layout from "@/components/Layout";
import { Shield, Lock, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LearnMore() {
  return (
    <Layout>
      <Head>
        <title>Learn More - Shadow Talk</title>
        <meta
          name="description"
          content="Learn more about Shadow Talk's secure messaging platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Learn More About{" "}
              <span className="text-purple-500">Shadow Talk</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Discover how our platform protects your privacy and enhances your
              communication experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                The Shadow Talk Difference
              </h2>
              <p className="text-slate-300 mb-4">
                In a world where digital privacy is increasingly compromised,
                Shadow Talk stands as a beacon of security and anonymity.
              </p>
              <p className="text-slate-300 mb-4">
                Our platform was built from the ground up with privacy as the
                core principle. We don't just add encryption as an
                afterthought—we designed our entire system around protecting
                your conversations.
              </p>
              <p className="text-slate-300">
                With Shadow Talk, you can communicate freely without fear of
                surveillance, data mining, or identity exposure.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
              <div className="w-full h-64 bg-slate-700 rounded-md relative overflow-hidden">
                <Image
                  src="/design.png"
                  alt="Shadow Talk Interface"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-purple-500" />}
                title="End-to-End Encryption"
                description="All messages are encrypted on your device and can only be decrypted by the intended recipient. Even we can't read your messages."
              />
              <FeatureCard
                icon={<MessageSquare className="w-10 h-10 text-purple-500" />}
                title="Anonymous Profiles"
                description="Create a profile without linking any personal information. Your identity remains completely hidden."
              />
              <FeatureCard
                icon={<Lock className="w-10 h-10 text-purple-500" />}
                title="No Data Storage"
                description="Messages are never stored on our servers. Once delivered, they exist only on the devices of the sender and recipient."
              />
              <FeatureCard
                icon={<Clock className="w-10 h-10 text-purple-500" />}
                title="Self-Destructing Messages"
                description="Set a timer for your messages to be automatically deleted after they've been read, leaving no trace."
              />
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              How It Works
            </h2>
            <div className="max-w-3xl mx-auto">
              <ol className="space-y-8">
                <li className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-2">
                    1. Create an Anonymous Profile
                  </h3>
                  <p className="text-slate-300">
                    Sign up without providing any personal information. Choose a
                    username and set a secure password—that's all we need.
                  </p>
                </li>
                <li className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-2">
                    2. Start a Conversation
                  </h3>
                  <p className="text-slate-300">
                    Connect with others using their Shadow Talk username. All
                    connections are encrypted and anonymous.
                  </p>
                </li>
                <li className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-2">
                    3. Send Secure Messages
                  </h3>
                  <p className="text-slate-300">
                    Exchange messages that are encrypted end-to-end. Choose
                    whether they should self-destruct after being read.
                  </p>
                </li>
                <li className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-2">
                    4. Communicate with Confidence
                  </h3>
                  <p className="text-slate-300">
                    Enjoy conversations free from surveillance, data mining, or
                    tracking. Your privacy is guaranteed.
                  </p>
                </li>
              </ol>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Experience True Privacy?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Join thousands of users who have reclaimed their right to private
              communication.
            </p>
            <Link href="/chat">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-lg shadow-purple-500/20 text-lg">
                Start a Secure Chat Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-purple-500/50 transition-all h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};
