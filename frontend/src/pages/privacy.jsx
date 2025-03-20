// pages/privacy.jsx
import Head from "next/head";
import Layout from "@/components/Layout";
import { Shield, Lock, Eye } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Shadow Talk</title>
        <meta
          name="description"
          content="Shadow Talk's privacy policy and data practices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Privacy <span className="text-purple-500">Policy</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Your privacy is our top priority. Learn about our data practices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-8 mb-10">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">
                Our Privacy Commitment
              </h2>
            </div>
            <p className="text-slate-300 mb-4">
              At Shadow Talk, we believe that privacy is a fundamental right.
              This privacy policy outlines the limited information we collect,
              how we use it, and the steps we take to protect it.
            </p>
            <p className="text-slate-300">
              Our guiding principle is simple: we collect the minimum amount of
              data necessary to provide our service, we never sell your data,
              and we implement strong security measures to protect any
              information we do have.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              Information We Collect
            </h3>
            <p className="text-slate-300 mb-4">
              We are committed to collecting as little personal information as
              possible:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  <strong>Account Information:</strong> We collect a username
                  and password. Your email address is optional but recommended
                  for account recovery.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  <strong>Technical Information:</strong> We collect basic
                  device information required to provide our service, such as IP
                  address and browser type.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  <strong>Usage Information:</strong> Anonymous usage statistics
                  that help us improve our service.
                </span>
              </li>
            </ul>
            <p className="text-slate-300">
              <strong>What we don't collect:</strong> We do not store the
              content of your messages, your contacts, your real name, or your
              location unless you explicitly share this information.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              How We Use Your Information
            </h3>
            <p className="text-slate-300 mb-4">
              We use the limited information we collect only for the following
              purposes:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  To provide and maintain our service
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  To notify you about changes to our service
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  To provide customer support
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  To detect, prevent, and address technical issues
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-purple-500 mr-2" />
              <p className="text-slate-300">
                We use industry-standard encryption and security practices to
                protect your data.
              </p>
            </div>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-purple-500 mr-2" />
              <p className="text-slate-300">
                Messages are end-to-end encrypted and are not stored on our
                servers after delivery.
              </p>
            </div>
            <p className="text-slate-300">
              We regularly review our systems and data to ensure the best
              possible security.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">Your Rights</h3>
            <p className="text-slate-300 mb-4">You have the right to:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  Access your personal data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  Request correction of inaccurate data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  Request deletion of your data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  Object to processing of your data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span className="text-slate-300">
                  Request restriction of processing
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-slate-300 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-slate-300">
              <strong>Email:</strong> privacy@shadowtalk.com
            </p>
          </div>

          <div className="text-center text-slate-400 text-sm">
            <p>Last updated: March 1, 2025</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
