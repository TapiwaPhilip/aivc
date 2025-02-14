
import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { Impact } from "@/components/Impact";
import { GlobalImpact } from "@/components/GlobalImpact";
import { PitchDeck } from "@/components/PitchDeck";
import { JoinFund } from "@/components/JoinFund";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Values />
      <GlobalImpact />
      <Impact />
      <JoinFund />
      <PitchDeck />
      <Footer />
    </main>
  );
};

export default Index;
