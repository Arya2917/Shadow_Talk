import Head from "next/head";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Shadow Talk - Secure Private Messaging</title>
        <meta
          name="description"
          content="Secure, private messaging platform where conversations happen in the shadows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="bg-slate-900 min-h-screen">
        <HeroSection />
        <FeaturesSection />

        <TestimonialsSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
