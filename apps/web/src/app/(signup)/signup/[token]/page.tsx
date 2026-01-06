"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shadcn-ui/card";
import { Button } from "@/components/shadcn-ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const { token } = useParams<{ token: string }>()

  useEffect(() => {
    const verifyToken = async () => {
      // 1. Get token from URL params
      const token = params.token as string;

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        // 2. Call Backend API
        // Note: Adjust URL if your backend port is different (e.g. 8000)
        const res = await fetch(`http://localhost:8000/api/verify-email/${token}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // If your backend expects it in body instead, uncomment below:
          // body: JSON.stringify({ token }) 
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been successfully verified. You can now access all features.");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. The link might be expired or invalid.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Network error. Please try again later.");
      }
    };

    verifyToken();
  }, [params.token]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-border text-center">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex justify-center">
              {status === "loading" && (
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              )}
              {status === "success" && (
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              )}
              {status === "error" && (
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {status === "loading" && "Verifying Email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>
            
            <CardDescription className="text-base">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {status === "loading" ? (
              <p className="text-sm text-muted-foreground">Please wait a moment...</p>
            ) : (
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => router.push("/signin")}
              >
                {status === "success" ? "Continue to Login" : "Back to Login"}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyEmailPage;