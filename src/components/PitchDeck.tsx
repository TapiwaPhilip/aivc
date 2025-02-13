
import { CloudUpload, FileText } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export const PitchDeck = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle the file upload to your backend
    console.log("File selected:", selectedFile);
  };

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Submit Your Pitch
            </h2>
            <p className="text-muted text-lg mb-8">
              Are you building an AI-powered solution with global impact? We want to hear from you.
            </p>
          </div>

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
            >
              Submit Pitch Deck
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
