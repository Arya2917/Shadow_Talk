import Image from "next/image";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose <span className="text-purple-500">Shadow Talk</span>?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Our platform offers unique features designed to protect your privacy
            and enhance your messaging experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Complete Privacy
            </h3>
            <p className="text-slate-300 mb-4">
              Your identity remains hidden, allowing you to express yourself
              freely without fear of judgment or repercussions.
            </p>
            <ul className="space-y-2">
              {[
                "No personal information required",
                "No tracking or data collection",
                "Anonymous profile options",
                "Encrypted messaging",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
            <div className="flex justify-center items-center w-full h-64">
              <div className="relative w-full h-64">
                <Image
                  src="/privacy_visual.jpg"
                  alt="Privacy Visualization"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>  

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
            <div className="flex justify-center items-center w-full h-64">
              <div className="relative w-full h-64">
                <Image
                  src="/security_visual.jpg"
                  alt="Security Visualization"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Uncompromising Security
            </h3>
            <p className="text-slate-300 mb-4">
              We've implemented the latest security measures to ensure your
              conversations remain private and protected.
            </p>
            <ul className="space-y-2">
              {[
                "End-to-end encryption",
                "No message storage on servers",
                "Self-destructing messages",
                "Breach detection systems",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;