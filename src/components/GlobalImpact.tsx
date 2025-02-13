
import { Globe, Lightbulb, Scale, Target } from "lucide-react";

export const GlobalImpact = () => {
  const impacts = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Solutions, African Innovation",
      description: "Our startups create solutions that resonate globally while leveraging unique African perspectives and talent."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Impact-Driven Focus",
      description: "We invest in startups solving real-world problems with scalable AI solutions that transcend geographical boundaries."
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Scaling Beyond Borders",
      description: "While rooted in Africa, our portfolio companies are built to scale globally and compete internationally."
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Universal Value Creation",
      description: "Our investments focus on innovations that create value for users worldwide, not just within Africa."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Global Impact through African Innovation
          </h2>
          <p className="text-muted max-w-3xl mx-auto text-lg">
            While our roots are firmly planted in African soil, our vision extends globally. 
            We back startups that leverage AI to create solutions with worldwide impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {impacts.map((impact, index) => (
            <div key={index} className="flex gap-6">
              <div className="text-primary">{impact.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-secondary">
                  {impact.title}
                </h3>
                <p className="text-muted">{impact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
