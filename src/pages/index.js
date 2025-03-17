// pages/index.js
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RoomSection from '@/components/RoomSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shadow Talk - Secure Private Messaging</title>
        <meta name="description" content="Secure, private messaging platform where conversations happen in the shadows." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="bg-slate-900 min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <RoomSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </>
  );
}