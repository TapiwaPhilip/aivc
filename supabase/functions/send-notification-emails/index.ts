
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL") || "your-email@example.com";

// Your notification email (replace this with your actual email)
const TO_EMAIL = notificationEmail;
// The email address that will appear in the From field
const FROM_EMAIL = "AI Afrika Fund <notifications@aifrikafund.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const formatInvestorEmail = (data: any) => {
  return `
    <h1>New Investor Application</h1>
    <p>You have received a new investor application from ${data.first_name} ${data.last_name}.</p>
    
    <h2>Investor Details</h2>
    <ul>
      <li><strong>Name:</strong> ${data.first_name} ${data.last_name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Organization:</strong> ${data.organization}</li>
      <li><strong>Investment Range:</strong> ${data.investment_range}</li>
    </ul>
    
    <h2>Message</h2>
    <p>${data.message || "No message provided."}</p>
    
    <p>You can view all investor applications in the <a href="https://supabase.com/dashboard/project/geidzcdxveylhizpogjy/editor/table/investors">Supabase dashboard</a>.</p>
  `;
};

const formatPitchDeckEmail = async (data: any) => {
  // Generate a signed URL for the pitch deck file that expires in 24 hours
  const { data: fileData } = await supabase.storage
    .from('pitch-decks')
    .createSignedUrl(data.file_path, 60 * 60 * 24);
  
  const fileUrl = fileData?.signedUrl || "#";
  
  return `
    <h1>New Pitch Deck Submission</h1>
    <p>You have received a new pitch deck submission from ${data.company_name}.</p>
    
    <h2>Company Details</h2>
    <ul>
      <li><strong>Company Name:</strong> ${data.company_name}</li>
      <li><strong>Description:</strong> ${data.description}</li>
    </ul>
    
    <h2>File Details</h2>
    <ul>
      <li><strong>File Name:</strong> ${data.file_name}</li>
      <li><strong>File Type:</strong> ${data.file_type}</li>
      <li><strong>File Size:</strong> ${(data.file_size / (1024 * 1024)).toFixed(2)} MB</li>
    </ul>
    
    <p><a href="${fileUrl}" target="_blank">Download Pitch Deck</a> (link expires in 24 hours)</p>
    
    <p>You can view all pitch deck submissions in the <a href="https://supabase.com/dashboard/project/geidzcdxveylhizpogjy/editor/table/pitch_decks">Supabase dashboard</a>.</p>
  `;
};

// Create our webhook handler
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Listen for the test event
  if (req.method === "GET") {
    console.log("Test endpoint accessed");
    return new Response(JSON.stringify({ status: "OK", message: "Email notification service is running" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  // Only process POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const body = await req.json();
    const { type, record } = body;
    
    // Determine email content based on the notification type
    let subject, htmlContent;
    
    if (type === "investor") {
      subject = `New Investor Application: ${record.first_name} ${record.last_name}`;
      htmlContent = formatInvestorEmail(record);
    } else if (type === "pitch_deck") {
      subject = `New Pitch Deck Submission: ${record.company_name}`;
      htmlContent = await formatPitchDeckEmail(record);
    } else {
      return new Response(JSON.stringify({ error: "Invalid notification type" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Send the email
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent:", result);

    return new Response(
      JSON.stringify({ status: "success", message: "Email notification sent", data: result }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending notification email:", error);
    
    return new Response(
      JSON.stringify({ status: "error", message: "Failed to send email notification", error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
