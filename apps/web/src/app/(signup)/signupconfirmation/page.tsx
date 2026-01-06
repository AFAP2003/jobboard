"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

const RegisterConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-border text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Check Your Email</CardTitle>
            <CardDescription className="text-muted-foreground">
              We've sent a confirmation link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Please check your inbox and click the verification link to activate your account.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or
              </p>
              <Button variant="outline" className="w-full">
                Resend Confirmation Email
              </Button>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Already confirmed?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterConfirmation;
