
import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { Impact } from "@/components/Impact";
import { GlobalImpact } from "@/components/GlobalImpact";
import { PitchDeck } from "@/components/PitchDeck";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Values />
      <GlobalImpact />
      <Impact />
      <PitchDeck />
    </main>
  );
};

export default Index;
