// pages/documentation.js
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Documentation() {
  return (
    <Layout>
      <Head>
        <title>Documentation - Shadow Talk</title>
        <meta
          name="description"
          content="Documentation and guides for Shadow Talk's secure messaging platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-purple-500">Documentation</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Everything you need to know about using Shadow Talk securely.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-6 sticky top-24">
                <h3 className="text-white font-bold text-xl mb-4">Contents</h3>
                <nav className="space-y-1">
                  <a
                    href="#getting-started"
                    className="block py-2 px-3 text-purple-400 bg-slate-700/50 rounded"
                  >
                    Getting Started
                  </a>
                  <a
                    href="#installation"
                    className="block py-2 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-purple-400 rounded transition-colors"
                  >
                    Installation
                  </a>
                  <a
                    href="#features"
                    className="block py-2 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-purple-400 rounded transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#security"
                    className="block py-2 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-purple-400 rounded transition-colors"
                  >
                    Security
                  </a>
                  <a
                    href="#api"
                    className="block py-2 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-purple-400 rounded transition-colors"
                  >
                    API Reference
                  </a>
                  <a
                    href="#faq"
                    className="block py-2 px-3 text-slate-300 hover:bg-slate-700/50 hover:text-purple-400 rounded transition-colors"
                  >
                    FAQ
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-8">
                <section id="getting-started" className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Getting Started
                  </h2>
                  <p className="text-slate-300 mb-4">
                    Shadow Talk is a secure messaging platform designed for
                    those who value their privacy. This guide will help you get
                    up and running quickly.
                  </p>
                  <p className="text-slate-300 mb-6">
                    Our platform uses end-to-end encryption and leaves no
                    digital footprint, ensuring your conversations remain
                    private.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 mb-6">
                    <h3 className="text-white font-semibold mb-2">
                      Quick Setup
                    </h3>
                    <ol className="list-decimal pl-6 text-slate-300 space-y-2">
                      <li>
                        Create an account using our{" "}
                        <Link
                          href="/signup"
                          className="text-purple-400 hover:underline"
                        >
                          signup page
                        </Link>
                      </li>
                      <li>Download the app for your preferred platform</li>
                      <li>Set up your encryption keys</li>
                      <li>Start communicating securely</li>
                    </ol>
                  </div>
                </section>

                <section id="installation" className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Installation
                  </h2>
                  <p className="text-slate-300 mb-4">
                    Shadow Talk is available on multiple platforms to ensure you
                    can communicate securely from any device.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">Desktop</h3>
                      <p className="text-slate-300 mb-3">
                        Available for Windows, macOS, and Linux
                      </p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors w-full">
                        Download
                      </button>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">iOS</h3>
                      <p className="text-slate-300 mb-3">
                        Available on the App Store
                      </p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors w-full">
                        Download
                      </button>
                    </div>

                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">Android</h3>
                      <p className="text-slate-300 mb-3">
                        Available on Google Play
                      </p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors w-full">
                        Download
                      </button>
                    </div>
                  </div>
                </section>

                <section id="features" className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Features
                  </h2>

                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        End-to-End Encryption
                      </h3>
                      <p className="text-slate-300">
                        All messages are encrypted on your device and can only
                        be decrypted by the intended recipient.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Self-Destructing Messages
                      </h3>
                      <p className="text-slate-300">
                        Set messages to automatically delete after they've been
                        read or after a specific time period.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Anonymous Profiles
                      </h3>
                      <p className="text-slate-300">
                        Communicate without revealing your identity. No phone
                        numbers or email addresses required.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No Data Retention
                      </h3>
                      <p className="text-slate-300">
                        We don't store your messages or metadata on our servers.
                        What happens in Shadow Talk stays in Shadow Talk.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="security" className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Security
                  </h2>
                  <p className="text-slate-300 mb-4">
                    Security is at the core of everything we do at Shadow Talk.
                    Our platform has been built from the ground up with privacy
                    and security in mind.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                    <h3 className="text-white font-semibold mb-3">
                      Our Security Measures
                    </h3>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                      <li>Military-grade AES-256 encryption</li>
                      <li>Zero-knowledge architecture</li>
                      <li>Regular security audits by independent experts</li>
                      <li>Open-source encryption protocols</li>
                      <li>No backdoors or master keys</li>
                      <li>Local key generation and storage</li>
                    </ul>
                  </div>
                </section>

                <section id="api" className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    API Reference
                  </h2>
                  <p className="text-slate-300 mb-6">
                    Developers can integrate Shadow Talk's secure messaging
                    capabilities into their own applications using our API.
                  </p>

                  <div className="bg-slate-700 rounded-lg p-4 mb-6">
                    <pre className="text-slate-300 overflow-x-auto">
                      <code>
                        {`// Example API request
const response = await fetch('https://api.shadowtalk.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    recipient: 'user_id',
    content: encryptedMessage,
    ttl: 3600 // Time to live in seconds
  })
});`}
                      </code>
                    </pre>
                  </div>

                  <p className="text-slate-300">
                    For complete API documentation, please visit our{" "}
                    <a href="#" className="text-purple-400 hover:underline">
                      Developer Portal
                    </a>
                    .
                  </p>
                </section>

                <section id="faq">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Is Shadow Talk really anonymous?
                      </h3>
                      <p className="text-slate-300">
                        Yes. We don't require any personal information to create
                        an account, and we don't log IP addresses or other
                        identifying information.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        What happens if I forget my password?
                      </h3>
                      <p className="text-slate-300">
                        Due to our zero-knowledge architecture, we cannot
                        recover your password. However, you can set up recovery
                        keys when creating your account.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Can Shadow Talk be used for illegal activities?
                      </h3>
                      <p className="text-slate-300">
                        Shadow Talk is designed for legitimate privacy needs. We
                        prohibit the use of our platform for illegal activities
                        and cooperate with law enforcement when required by law.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        How do I know my messages aren't being intercepted?
                      </h3>
                      <p className="text-slate-300">
                        Shadow Talk uses verified end-to-end encryption, which
                        means only you and your recipient can read the messages.
                        We provide verification tools to confirm your connection
                        is secure.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
