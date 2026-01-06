'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { Briefcase, Users, Target, Heart } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <div className='bg-gradient-primary py-12'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='mb-4 text-4xl font-bold text-white'>About Us</h1>
            <p className='text-lg text-white/90'>
              Connecting talent with opportunity since 2020
            </p>
          </div>
        </div>

        <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl space-y-12'>
            <div className='text-center'>
              <h2 className='mb-4 text-3xl font-bold'>Our Mission</h2>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                We believe that everyone deserves to find their dream job. Our
                platform connects talented job seekers with top companies,
                making the hiring process seamless and efficient for both
                parties.
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <Briefcase className='text-primary mb-4 h-10 w-10' />
                  <CardTitle>For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    Find your perfect job match with our advanced search and
                    filtering tools. Get personalized job recommendations and
                    apply with ease.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className='text-primary mb-4 h-10 w-10' />
                  <CardTitle>For Employers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    Post job openings and reach qualified candidates. Our
                    platform helps you find the right talent quickly and
                    efficiently.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className='text-primary mb-4 h-10 w-10' />
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    We are committed to transparency, fairness, and creating
                    opportunities for everyone in the job market.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className='text-primary mb-4 h-10 w-10' />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    Join thousands of job seekers and employers who trust our
                    platform to connect and grow their careers.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage
