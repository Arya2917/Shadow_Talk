// pages/blog.js
import Head from "next/head";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Blog() {
  return (
    <Layout>
      <Head>
        <title>Blog - Shadow Talk</title>
        <meta
          name="description"
          content="Latest news, updates, and insights from Shadow Talk."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-purple-500">Shadow</span> Blog
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Stay updated with the latest news, security insights, and privacy
              tips.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogPost
              title="End-to-End Encryption: What It Really Means"
              date="March 15, 2025"
              excerpt="Dive into the technical details of our encryption protocols and why they matter for your privacy."
              category="Security"
              image="/encryption.jpg"
            />
            <BlogPost
              title="The Future of Private Communication"
              date="March 10, 2025"
              excerpt="Our vision for creating a digital world where privacy is the default, not just an option."
              category="Privacy"
              image="/communication.jpg"
            />
            <BlogPost
              title="5 Ways to Enhance Your Digital Privacy Today"
              date="March 5, 2025"
              excerpt="Simple steps you can take right now to improve your privacy online, even beyond using Shadow Talk."
              category="Tips"
              image="/digital.jpg"
            />
            <BlogPost
              title="Why We Don't Store Your Messages"
              date="February 28, 2025"
              excerpt="A deep dive into our no-storage policy and how it protects you from data breaches and surveillance."
              category="Security"
              image="/message.jpg"
            />
            <BlogPost
              title="The Psychology of Anonymous Communication"
              date="February 22, 2025"
              excerpt="Research shows that anonymity can lead to more honest and meaningful conversations. Here's why."
              category="Research"
              image="/hiding.jpg"
            />
            <BlogPost
              title="Introducing Self-Destructing Voice Messages"
              date="February 15, 2025"
              excerpt="Our newest feature allows you to send encrypted voice messages that disappear after being played."
              category="Product Update"
              image="/voice.jpg"
            />
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors shadow-lg border border-slate-700">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const BlogPost = ({ title, date, excerpt, category, image }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all">
      <div className="h-48 bg-slate-700 relative overflow-hidden">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-purple-500 font-semibold uppercase tracking-wider">
            {category}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 mb-4">{excerpt}</p>
        <button className="text-purple-500 hover:text-purple-400 transition-colors font-medium">
          Read More →
        </button>
      </div>
    </div>
  );
};
