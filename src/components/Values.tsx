
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
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 text-primary">{value.icon}</div>
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
