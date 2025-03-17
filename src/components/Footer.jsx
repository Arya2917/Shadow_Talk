// components/Footer.jsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-purple-500">Shadow</span>Talk
            </div>
            <p className="text-slate-400 mb-4">
              Secure, private messaging for those who value their digital privacy.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                <a key={social} href="#" className="text-slate-400 hover:text-purple-500 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Security', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-purple-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-purple-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-purple-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Shadow Talk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;