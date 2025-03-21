// pages/about.js
import Head from 'next/head';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { Shield, Eye, Lock, Users } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Shadow Talk</title>
        <meta name="description" content="Learn about Shadow Talk's mission, team, and commitment to privacy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      
      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-purple-500">Shadow Talk</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Our mission is to create a digital world where privacy is not just a feature, but a fundamental right.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-slate-300 mb-4">
                Shadow Talk was founded in 2023 by a group of privacy advocates and security experts who were concerned about the increasing erosion of digital privacy.
              </p>
              <p className="text-slate-300 mb-4">
                We saw a world where personal conversations were being monitored, data was being harvested, and privacy was becoming a luxury rather than a right. We decided to create a solution that would put control back in the hands of users.
              </p>
              <p className="text-slate-300">
                Today, Shadow Talk is used by thousands of people around the world who value their privacy and want to communicate freely without fear of surveillance or data collection.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
              <div className="w-full h-64 bg-slate-700 rounded-md overflow-hidden">
                <Image
                  src="/shadow_chat.jpg"
                  alt="Company Timeline"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard 
                icon={<Shield className="w-10 h-10 text-purple-500" />}
                title="Privacy First"
                description="We believe privacy is a fundamental human right and design all our products with this principle in mind."
              />
              <ValueCard 
                icon={<Eye className="w-10 h-10 text-purple-500" />}
                title="Transparency"
                description="We're open about how our technology works and never hide important information from our users."
              />
              <ValueCard 
                icon={<Lock className="w-10 h-10 text-purple-500" />}
                title="Security"
                description="We implement the highest standards of security to protect our users' communications and data."
              />
              <ValueCard 
                icon={<Users className="w-10 h-10 text-purple-500" />}
                title="Community"
                description="We build for and with our community, valuing their input and incorporating their feedback."
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMember 
                name="Arya Thanekar"
                role="Founder & CEO"
                bio="Former security researcher with a passion for digital rights and privacy."
                image="/Arya.jpg"
              />
              <TeamMember 
                name="Ankit Bugade"
                role="Co-Founder & CTO"
                bio="Cryptography expert with 15 years of experience in secure communications."
                image="/ankit.jpg"
              />
              <TeamMember 
                name="Pritam Jatkar"
                role="Co-Founder & Senior UX Designer"
                bio="User experience specialist focused on making privacy-first products accessible to everyone."
                image="/pritam.png"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-purple-500/50 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, bio, image }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-purple-500/50 transition-all">
      <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
        <Image
          src={image}
          alt={`Photo of ${name}`}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-1 text-center">{name}</h3>
      <p className="text-purple-500 mb-4 text-center">{role}</p>
      <p className="text-slate-300 text-center">{bio}</p>
    </div>
  );
};