// components/Navbar.jsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-white">
            <span className="text-purple-500">Shadow</span>Talk
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
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
        
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Navbar;