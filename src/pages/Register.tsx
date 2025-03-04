
import { Rocket, DollarSign, Users, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    investmentRange: '',
    message: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    
    try {
      // Insert investor data into Supabase
      const { data, error } = await supabase
        .from('investors')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          organization: formData.organization,
          investment_range: formData.investmentRange,
          message: formData.message || null
        })
        .select();
      
      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-notification-emails", {
          body: {
            type: "investor",
            record: {
              id: data[0].id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              organization: formData.organization,
              investment_range: formData.investmentRange,
              message: formData.message || null
            }
          }
        });
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Continue with the form submission flow even if email fails
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your interest in joining AI Afrika Fund. Our team will contact you shortly.",
        variant: "default",
        duration: 5000,
      });

      // Reset form and redirect to home
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        investmentRange: '',
        message: ''
      });
      setSubmitted(false);
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error("Error submitting investor form:", error);
      toast({
        title: "Submission Error",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="absolute top-0 right-0 p-6">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
          <Home className="w-4 h-4" />
          Back to Home Page
        </Link>
      </div>
      
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
                  value={formData.firstName}
                  onChange={handleChange}
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
                  value={formData.lastName}
                  onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.organization}
                onChange={handleChange}
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
                value={formData.investmentRange}
                onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              disabled={submitted}
            >
              {submitted ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
