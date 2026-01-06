"use client"

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Lock, ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react"; // Changed Mail to Lock
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  // State
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<"loading" | "valid" | "invalid">("loading");

  const token = params.token as string;

  // 1. Verify Token on Mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenStatus("invalid");
        return;
      }

      try {
        // Call your backend to verify the token validity
        // Adjust URL to match your backend route
        const res = await fetch(`http://localhost:8000/api/verify-password-reset-token/${token}`, {
          method: "POST", // Or POST depending on your API
        });

        if (res.ok) {
          setTokenStatus("valid");
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        setTokenStatus("invalid");
        toast({
          variant: "destructive",
          title: "Invalid Link",
          description: "This password reset link is invalid or has expired.",
        });
      }
    };

    verifyToken();
  }, [token, toast]);

  // 2. Handle Password Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send new password AND token to backend
      const res = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          password, 
          token // Send token in body
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setIsSubmitted(true);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to reset password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDER LOGIC ---

  // Loading State (Verifying Token)
  if (tokenStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Invalid Token State
  if (tokenStatus === "invalid") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md text-center border-destructive/50">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle>Invalid Link</CardTitle>
              <CardDescription>This link has expired or is invalid.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forgotpassword">
                <Button className="w-full">Request New Link</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Valid Token State (Show Form)
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isSubmitted ? "Password Reset!" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSubmitted
                ? "Your password has been successfully updated."
                : "Enter your new password below."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  You can now log in with your new password.
                </p>
                <Link href="/login">
                  <Button className="w-full mt-4">
                    Go to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full" disabled={isLoading}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign In
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;