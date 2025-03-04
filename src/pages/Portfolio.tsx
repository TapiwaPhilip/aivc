
import { Building2, Rocket, Brain, Stars, Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  
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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Portfolio Header */}
      <div className="relative bg-gradient-to-br from-secondary to-background py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:15px_15px] pointer-events-none opacity-30" />
        <div className="container mx-auto px-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <Globe className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Portfolio
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover our carefully selected portfolio of innovative AI startups across Africa
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="container mx-auto px-4 py-16 -mt-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {startups.map((startup, index) => {
            const IconComponent = startup.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary">{startup.name}</h3>
                      <p className="text-sm text-muted">{startup.location}</p>
                    </div>
                  </div>
                  <p className="text-muted mb-4">{startup.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-accent/10 rounded-full text-sm text-primary font-medium">
                      {startup.category}
                    </span>
                    <button className="flex items-center text-primary hover:text-primary/80 text-sm font-medium group transition-colors">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
