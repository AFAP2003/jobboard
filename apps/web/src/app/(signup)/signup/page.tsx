"use client"

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/lib/local-storage/local-storage";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const router = useRouter()

  

   const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign up form submitted!", { email, password });

    setLoading(true)
    setError("")
     // Store email in localStorage
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ name,email, password }),
      })

      const data = await res.json()
      
      console.log("Response status:", res.status)
      console.log("Response data:", data)

      if (res.ok && data.success) {
        // Success - redirect to login or dashboard
        console.log("User created successfully:", data.data)
         // or your sign-in page
        setLocalStorage("email", email)
        setLocalStorage("password", password)
      } else {
        // Handle error response
        setError(data.message || "Failed to create account")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailConfirmation = async (email: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/email-confirmation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
       console.log("Response status:", res.status)
      console.log("Response data:", data)

      if(res.ok && data.success) {
        // Email sent successfully
        console.log("Email confirmation sent successfully")
        router.push("/signupconfirmation")
      }
      else {
        // Handle error response
        console.error("Failed to send email confirmation:", data.message)
      }
    } catch (error) {
      console.error("Network error while sending email confirmation:", error)
    }
  }
  
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   await handleSignUp(e)
   await handleEmailConfirmation(email)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
             
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
