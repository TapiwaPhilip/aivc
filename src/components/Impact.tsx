
export const Impact = () => {
  const testimonials = [
    {
      quote: "This fund transformed our AI startup from a local player to a continental force.",
      author: "Sarah Mensah",
      role: "CEO, TechAI Solutions",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    },
    {
      quote: "The support and guidance we received went far beyond just funding.",
      author: "David Okonjo",
      role: "Founder, AIfrica",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
  ];

  return (
    <div className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Impact Stories
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Real stories from African innovators who are transforming the continent
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white/90 text-lg mb-4">{testimonial.quote}</p>
                  <p className="text-accent font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
