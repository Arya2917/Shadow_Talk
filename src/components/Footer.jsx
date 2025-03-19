// components/Footer.jsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              <span className="text-purple-500">Shadow</span>Talk
            </h3>
            <p className="text-slate-400 mb-4">
              Secure, anonymous messaging for those who value their privacy.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shadow Talk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;