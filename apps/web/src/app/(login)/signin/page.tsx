'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/shadcn-ui/button'
import { Input } from '@/components/shadcn-ui/input'
import { Label } from '@/components/shadcn-ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { useRouter } from 'next/navigation'
import {  useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in form submitted!", { email, password });

    setLoading(true)
    setError("")

    try {
     const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/"
      })

    
      if (res?.error) {
        setError("Invalid credentials. Please try again.")

      } else {
        // Handle error response
        router.push("/")
        console.log("Sign in successful:", res);
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

   const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("Google sign in failed");
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='container mx-auto flex flex-1 items-center justify-center px-4 py-16'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='john@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
               <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link href="forgotpassword" className="text-primary hover:underline">
                  Forgot password?
                </Link> 
              </div>
               <div className="flex items-center justify-center text-sm">
               <button onClick={handleGoogleLogin}>
                <FcGoogle className="w-10 h-10" />
              </button>
              </div>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <p className='text-muted-foreground text-center text-sm'>
                Don't have an account?{' '}
                <Link href='/signup' className='text-primary hover:underline'>
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default LoginPage
