
import { Building2, Rocket, Brain, Stars } from "lucide-react";

const Portfolio = () => {
  const startups = [
    {
      name: "AI Health Africa",
      description: "Leveraging AI for improved healthcare diagnostics across rural Africa",
      category: "Healthcare",
      location: "Kenya",
      icon: Brain,
    },
    {
      name: "SmartFarm AI",
      description: "AI-powered precision agriculture solutions for African farmers",
      category: "Agriculture",
      location: "Nigeria",
      icon: Stars,
    },
    {
      name: "EduTech AI",
      description: "Personalized learning platforms powered by artificial intelligence",
      category: "Education",
      location: "South Africa",
      icon: Building2,
    },
    {
      name: "FinAI Solutions",
      description: "AI-driven financial inclusion and banking solutions",
      category: "Fintech",
      location: "Ghana",
      icon: Rocket,
    }
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
            Our Portfolio
          </h1>
          <p className="text-lg text-muted">
            Discover our carefully selected portfolio of innovative AI startups across Africa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {startups.map((startup, index) => {
            const IconComponent = startup.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-background rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary">{startup.name}</h3>
                      <p className="text-sm text-muted">{startup.location}</p>
                    </div>
                  </div>
                  <p className="text-muted mb-4">{startup.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-background rounded-full text-sm text-primary">
                      {startup.category}
                    </span>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
