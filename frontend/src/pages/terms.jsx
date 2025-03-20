// pages/terms.jsx
import Head from "next/head";
import Layout from "@/components/Layout";
import { FileText, AlertTriangle, Shield } from "lucide-react";

export default function Terms() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service - Shadow Talk</title>
        <meta
          name="description"
          content="Shadow Talk's terms of service and user agreement."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Terms of <span className="text-purple-500">Service</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Please read these terms carefully before using Shadow Talk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-8 mb-10">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">
                Agreement Overview
              </h2>
            </div>
            <p className="text-slate-300 mb-4">
              These Terms of Service ("Terms") govern your use of Shadow Talk
              (the "Service") operated by Shadow Talk Inc. ("we," "us," or
              "our").
            </p>
            <p className="text-slate-300">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the Terms, you may not
              access the Service.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">1. Accounts</h3>
            <p className="text-slate-300 mb-4">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account.
            </p>
            <p className="text-slate-300 mb-4">
              You are responsible for safeguarding the password you use to
              access the Service and for any activities or actions under your
              password.
            </p>
            <p className="text-slate-300">
              You agree not to disclose your password to any third party. You
              must notify us immediately upon becoming aware of any breach of
              security or unauthorized use of your account.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              2. Acceptable Use
            </h3>
            <p className="text-slate-300 mb-4">
              You agree to use the Service only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else's use and enjoyment of the Service.
            </p>
            <div className="bg-slate-700 border-l-4 border-purple-500 p-4 rounded mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-slate-300">
                  While we respect your privacy and do not monitor the content
                  of your communications, we prohibit using our Service for
                  illegal activities, harassment, distribution of malware, or
                  any content that violates applicable laws.
                </p>
              </div>
            </div>
            <p className="text-slate-300">
              We reserve the right to terminate accounts that are used for
              illegal activities or that violate these Terms.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              3. Intellectual Property
            </h3>
            <p className="text-slate-300 mb-4">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Shadow Talk Inc. and
              its licensors. The Service is protected by copyright, trademark,
              and other laws.
            </p>
            <p className="text-slate-300">
              Our trademarks and trade dress may not be used in connection with
              any product or service without the prior written consent of Shadow
              Talk Inc.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              4. Privacy and Data Protection
            </h3>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-purple-500 mr-2" />
              <p className="text-slate-300">
                Your privacy is important to us. Our Privacy Policy describes
                how we collect, use, and protect your information.
              </p>
            </div>
            <p className="text-slate-300">
              By using our Service, you agree to the collection and use of
              information in accordance with our Privacy Policy.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              5. Service Modifications
            </h3>
            <p className="text-slate-300 mb-4">
              We reserve the right to withdraw or amend our Service, and any
              service or material we provide, in our sole discretion without
              notice.
            </p>
            <p className="text-slate-300">
              We will not be liable if for any reason all or any part of the
              Service is unavailable at any time or for any period.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              6. Termination
            </h3>
            <p className="text-slate-300 mb-4">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </p>
            <p className="text-slate-300">
              Upon termination, your right to use the Service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the Service or delete your account.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">
              7. Limitation of Liability
            </h3>
            <p className="text-slate-300 mb-4">
              In no event shall Shadow Talk Inc., nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">→</span>
                <span>
                  Your access to or use of or inability to access or use the
                  Service
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">→</span>
                <span>Any third party conduct on the Service</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">→</span>
                <span>Any content obtained from the Service</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">→</span>
                <span>
                  Unauthorized access, use or alteration of your transmissions
                  or content
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4">8. Contact Us</h3>
            <p className="text-slate-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-300">
              <strong>Email:</strong> legal@shadowtalk.com
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
