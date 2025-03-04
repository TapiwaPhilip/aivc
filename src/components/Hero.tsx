
import { Globe, Rocket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleJoinFund = () => {
    navigate('/register');
  };

  const handleExplorePortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-background">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-10" />
      
      {/* Modern pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 flex justify-center gap-4">
            <Globe className="w-8 h-8 text-accent animate-float" />
            <Rocket className="w-8 h-8 text-primary animate-float [animation-delay:200ms]" />
            <Star className="w-8 h-8 text-accent animate-float [animation-delay:400ms]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
            Investing in Africa's AI Future
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation of African AI innovators through strategic investments 
            and unparalleled support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleJoinFund}
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:translate-y-[-2px] transform duration-300"
            >
              Join the Fund
            </button>
            <button 
              onClick={handleExplorePortfolio}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-accent/70 text-accent rounded-full font-semibold hover:bg-accent/10 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] transform duration-300"
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none" />
    </div>
  );
};
