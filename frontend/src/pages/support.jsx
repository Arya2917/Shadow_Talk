// pages/support.js
import Head from "next/head";
import Layout from "@/components/Layout";
import { ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function Support() {
  return (
    <Layout>
      <Head>
        <title>Support - Shadow Talk</title>
        <meta
          name="description"
          content="Get help and support for Shadow Talk. Find answers to common questions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-purple-500">Support</span> Center
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Find answers to common questions or get in touch with our support
              team.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full py-3 px-4 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="absolute right-3 top-3 text-purple-500 hover:text-purple-400 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4 mb-8">
                <FaqItem
                  question="How does Shadow Talk protect my privacy?"
                  answer="Shadow Talk uses end-to-end encryption, which means that only you and your intended recipient can read your messages. We don't store messages on our servers, and we don't collect any personal information beyond what's necessary for the service to function."
                />
                <FaqItem
                  question="Can I use Shadow Talk on multiple devices?"
                  answer="Yes, you can use Shadow Talk on multiple devices. Your encrypted conversations will be synced across all your devices securely. You can use Shadow Talk on smartphones, tablets, and computers."
                />
                <FaqItem
                  question="What happens to my messages after they're read?"
                  answer="By default, messages remain in your conversation history until you delete them. However, you can also enable self-destructing messages which will automatically delete after they've been read by the recipient, leaving no trace."
                />
                <FaqItem
                  question="Is Shadow Talk free to use?"
                  answer="Shadow Talk offers a free tier with basic features. We also offer a premium subscription that includes additional features like longer message retention, larger file transfers, and priority support."
                />
                <FaqItem
                  question="How can I report abuse or inappropriate content?"
                  answer="While we respect privacy, we don't tolerate abuse. You can report inappropriate content through the app by long-pressing on a message and selecting 'Report'. Our team will investigate while maintaining your privacy."
                />
                <FaqItem
                  question="Can I delete my account and all my data?"
                  answer="Yes, you can delete your account at any time in the settings. When you delete your account, all your data is permanently removed from our systems, including your profile, settings, and any messages that haven't been delivered yet."
                />
              </div>

              <h2 className="text-3xl font-bold text-white mb-6 mt-12">
                Popular Support Topics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SupportTopic
                  title="Getting Started"
                  items={[
                    "Creating an account",
                    "Setting up your profile",
                    "Adding contacts",
                    "Sending your first message",
                  ]}
                />
                <SupportTopic
                  title="Privacy & Security"
                  items={[
                    "How encryption works",
                    "Privacy settings",
                    "Self-destructing messages",
                    "Verifying contacts",
                  ]}
                />
                <SupportTopic
                  title="Account Management"
                  items={[
                    "Changing your alias",
                    "Managing devices",
                    "Subscription options",
                    "Deleting your account",
                  ]}
                />
                <SupportTopic
                  title="Troubleshooting"
                  items={[
                    "Connection issues",
                    "Message delivery problems",
                    "App crashes",
                    "Notification settings",
                  ]}
                />
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 h-fit">
              <h3 className="text-2xl font-bold text-white mb-4">
                Contact Support
              </h3>
              <p className="text-slate-300 mb-6">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>

              <div className="space-y-4">
                <ContactMethod
                  icon={<MessageCircle className="w-5 h-5 text-purple-500" />}
                  title="Live Chat"
                  description="Chat with our support team in real-time"
                  actionText="Start Chat"
                />
                <ContactMethod
                  icon={<Mail className="w-5 h-5 text-purple-500" />}
                  title="Email Support"
                  description="support@shadowtalk.com"
                  actionText="Send Email"
                />
                <ContactMethod
                  icon={<Phone className="w-5 h-5 text-purple-500" />}
                  title="Phone Support"
                  description="Available for premium users"
                  actionText="Call Now"
                  isPremium={true}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <h4 className="text-white font-semibold mb-2">Support Hours</h4>
                <p className="text-slate-300">Monday - Friday: 9AM - 8PM EST</p>
                <p className="text-slate-300">
                  Saturday - Sunday: 10AM - 6PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-white">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-purple-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-700">
          <p className="text-slate-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

const SupportTopic = ({ title, items }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-slate-300 hover:text-purple-400 transition-colors cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactMethod = ({
  icon,
  title,
  description,
  actionText,
  isPremium = false,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-slate-300 text-sm">{description}</p>
      </div>
      <button
        className={`px-3 py-1 rounded text-sm font-medium ${
          isPremium
            ? "bg-slate-600 text-slate-300"
            : "bg-purple-600 text-white hover:bg-purple-700"
        } transition-colors`}
      >
        {actionText}
      </button>
    </div>
  );
};
