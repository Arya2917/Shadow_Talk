// components/CtaSection.jsx
import Link from 'next/link';

const CtaSection = () => {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Step into the Shadows?</h2>
                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                  Join thousands of users who value their privacy. Sign up today and experience truly secure communication.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/chat">
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors shadow-lg shadow-purple-500/20">
                      Start a Chat Now
                    </button>
                  </Link>
                  <Link href="/learn-more">
                    <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors shadow-lg">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CtaSection;