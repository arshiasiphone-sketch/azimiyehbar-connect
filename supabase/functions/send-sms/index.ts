import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SmsRequest {
  name: string;
  phone: string;
  requestType: string;
  details?: string;
  formType: "booking" | "contact";
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SMSIR_API_KEY = Deno.env.get("SMSIR_API_KEY");
    const ADMIN_PHONE = Deno.env.get("ADMIN_PHONE_NUMBER");
    const TEMPLATE_ID = Deno.env.get("SMSIR_TEMPLATE_ID");
    const LINE_NUMBER = Deno.env.get("SMSIR_LINE_NUMBER");

    if (!SMSIR_API_KEY || !ADMIN_PHONE) {
      console.error("Missing SMS configuration");
      return new Response(
        JSON.stringify({ error: "پیکربندی پیامک انجام نشده است" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, phone, requestType, details, formType }: SmsRequest = await req.json();

    console.log(`Sending SMS notification for ${formType} from ${name} (${phone})`);

    // Use verify API with template
    const smsResponse = await fetch("https://api.sms.ir/v1/send/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": SMSIR_API_KEY,
      },
      body: JSON.stringify({
        mobile: ADMIN_PHONE,
        templateId: parseInt(TEMPLATE_ID || "0"),
        parameters: [
          { name: "NAME", value: name },
          { name: "PHONE", value: phone },
          { name: "REQUEST", value: requestType },
        ],
      }),
    });

    const smsResult = await smsResponse.json();
    console.log("SMS.ir response:", JSON.stringify(smsResult));

    if (!smsResponse.ok) {
      console.error("SMS.ir error:", smsResult);
      
      // Handle specific error codes
      if (smsResponse.status === 401) {
        return new Response(
          JSON.stringify({ error: "خطای احراز هویت سرویس پیامک", details: smsResult }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (smsResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "محدودیت ارسال پیامک. لطفاً بعداً تلاش کنید", details: smsResult }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "خطا در ارسال پیامک", details: smsResult }),
        { status: smsResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("SMS sent successfully");
    return new Response(
      JSON.stringify({ success: true, message: "پیامک با موفقیت ارسال شد", data: smsResult }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in send-sms function:", error);
    return new Response(
      JSON.stringify({ error: "خطای سرور در ارسال پیامک", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
