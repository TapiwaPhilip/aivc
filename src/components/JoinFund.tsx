
import { Rocket, DollarSign, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export const JoinFund = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Join fund form submitted");
  };

  return (
    <div id="join-fund-section" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-4 mb-6">
              <Rocket className="w-8 h-8 text-primary animate-float" />
              <DollarSign className="w-8 h-8 text-accent animate-float [animation-delay:200ms]" />
              <Users className="w-8 h-8 text-primary animate-float [animation-delay:400ms]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Join the Fund
            </h2>
            <p className="text-muted text-lg mb-8">
              Partner with us in building Africa's AI future. Join a community of visionary investors committed to empowering the next generation of African AI innovators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <DollarSign className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-secondary mb-2">Strategic Investment</h3>
              <p className="text-muted text-sm">Access carefully vetted AI opportunities across Africa</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-secondary mb-2">Network Access</h3>
              <p className="text-muted text-sm">Connect with leading African AI entrepreneurs and innovators</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Rocket className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-secondary mb-2">Impact & Returns</h3>
              <p className="text-muted text-sm">Generate returns while driving AI innovation in Africa</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-secondary mb-2">
                  First Name
                </label>
                <Input 
                  id="firstName"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-secondary mb-2">
                  Last Name
                </label>
                <Input 
                  id="lastName"
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                Email Address
              </label>
              <Input 
                id="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-secondary mb-2">
                Organization / Company
              </label>
              <Input 
                id="organization"
                placeholder="Your organization name"
                required
              />
            </div>

            <div>
              <label htmlFor="investmentRange" className="block text-sm font-medium text-secondary mb-2">
                Investment Range
              </label>
              <select 
                id="investmentRange"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select investment range</option>
                <option value="50k-250k">$50,000 - $250,000</option>
                <option value="250k-1m">$250,000 - $1,000,000</option>
                <option value="1m-5m">$1,000,000 - $5,000,000</option>
                <option value="5m+">$5,000,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                Message (Optional)
              </label>
              <Textarea 
                id="message"
                placeholder="Tell us about your investment interests and experience"
                className="min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Join the Fund
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
