
import { ChartLine, Network, Users, Building } from "lucide-react";

export const Values = () => {
  const values = [
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: "Innovation First",
      description: "Pushing the boundaries of what's possible with AI in Africa",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "African Excellence",
      description: "Celebrating and elevating African talent and innovation",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Building a strong network of African AI innovators",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Sustainable Growth",
      description: "Creating lasting impact through responsible investment",
    },
  ];

  return (
    <div className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(109.6deg,rgba(223,234,247,0.2)_11.2%,rgba(244,248,252,0.2)_91.1%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block p-2 px-4 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
            Our Guiding Principles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Our Values
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Guided by principles that empower African innovation and excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                {value.title}
              </h3>
              <p className="text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
