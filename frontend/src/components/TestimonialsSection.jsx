// components/TestimonialsSection.jsx

const TestimonialsSection = () => {
    return (
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our community thinks about Shadow Talk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="Shadow Talk has completely changed how I communicate online. I feel free to express my thoughts without fear."
              author="Anonymous User"
              role="Journalist"
            />
            <TestimonialCard 
              quote="The security features are top-notch. I've never felt more confident that my conversations are truly private."
              author="Shadow123"
              role="Privacy Advocate"
            />
            <TestimonialCard 
              quote="As someone who values privacy, this platform is a breath of fresh air in today's surveillance-heavy digital landscape."
              author="PrivacyFirst"
              role="Tech Enthusiast"
            />
          </div>
        </div>
      </section>
    );
  };
  
  const TestimonialCard = ({ quote, author, role }) => {
    return (
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
        <div className="text-purple-500 text-4xl mb-2">"</div>
        <p className="text-slate-300 mb-4">{quote}</p>
        <div className="mt-4">
          <p className="text-white font-medium">{author}</p>
          <p className="text-slate-400 text-sm">{role}</p>
        </div>
      </div>
    );
  };
  
  export default TestimonialsSection;