import { CtaBanner } from "@/components/site/cta-banner";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Reviews } from "@/components/site/reviews";
import { Stats } from "@/components/site/stats";
import { WhyUs } from "@/components/site/why-us";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <WhyUs />
      <Reviews />
      <CtaBanner />
      <Footer />
    </main>
  );
}
