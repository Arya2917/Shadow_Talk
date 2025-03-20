// components/Navbar.jsx
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">
              <span className="text-purple-500">Shadow</span>Talk
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          <Link href="/" className="text-white hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-white hover:text-purple-400 transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-white hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link href="/support" className="text-white hover:text-purple-400 transition-colors">
            Support
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <div className="hidden md:block flex-1"></div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-3">
              <Link 
                href="/" 
                className="text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/support" 
                className="text-white hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;