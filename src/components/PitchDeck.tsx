
import { CloudUpload, FileText } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const PitchDeck = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    description: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      description: ''
    });
    setSelectedFile(null);
    // Reset file input (we need to access the DOM element directly)
    const fileInput = document.getElementById('pitch-deck') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "File Required",
        description: "Please upload a pitch deck file.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pitch-decks')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 2. Save metadata to pitch_decks table
      const { error: dbError } = await supabase
        .from('pitch_decks')
        .insert({
          company_name: formData.company,
          description: formData.description,
          file_name: selectedFile.name,
          file_path: filePath,
          file_type: selectedFile.type,
          file_size: selectedFile.size
        });

      if (dbError) throw dbError;

      // Show success toast
      toast({
        title: "Pitch Deck Submitted",
        description: "Your pitch deck has been successfully submitted. We'll review it soon!",
        variant: "default",
      });

      // Set success state
      setIsSuccess(true);
      
      // Reset form
      resetForm();
    } catch (error: any) {
      console.error("Error submitting pitch deck:", error);
      toast({
        title: "Submission Error",
        description: error.message || "There was an error submitting your pitch deck. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="pitch-deck-section" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Submit Your Pitch
            </h2>
            <p className="text-muted text-lg mb-4">
              Are you building an AI-powered solution with global impact? We want to hear from you.
            </p>
            <div className="bg-secondary/5 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-3 text-secondary">
                Calling All African AI Innovators
              </h3>
              <p className="text-muted">
                We're particularly interested in connecting with founders who are:
              </p>
              <ul className="text-muted mt-2 space-y-2">
                <li>• Building AI startups in Africa</li>
                <li>• African founders building AI solutions globally</li>
                <li>• Teams with African co-founders</li>
              </ul>
              <p className="text-primary font-medium mt-4">
                If you're an African founder or have African roots, we especially want to hear your story.
              </p>
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center p-8 bg-green-50 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Thank You!</h3>
              <p className="text-lg text-gray-700 mb-6">
                Thanks for submitting your Pitch Deck. Our team will contact you very soon.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Submit Another Pitch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-secondary mb-2">
                    Company Name
                  </label>
                  <Input 
                    id="company"
                    placeholder="Your Company Name"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-secondary mb-2">
                    Brief Description
                  </label>
                  <Textarea 
                    id="description"
                    placeholder="Tell us about your AI solution and its global impact potential (max 500 characters)"
                    className="min-h-[100px]"
                    maxLength={500}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="pitch-deck" className="block text-sm font-medium text-secondary mb-2">
                    Upload Pitch Deck
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="space-y-2 text-center">
                      <CloudUpload className="mx-auto h-12 w-12 text-muted" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="pitch-deck" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                          <span>Upload a file</span>
                          <Input 
                            id="pitch-deck"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.ppt,.pptx"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted">
                        PDF or PowerPoint up to 10MB
                      </p>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                      <FileText className="w-4 h-4" />
                      <span>{selectedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Pitch Deck"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
