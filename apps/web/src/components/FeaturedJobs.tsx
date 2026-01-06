'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { Button } from '@/components/shadcn-ui/button'
import { Badge } from '@/components/shadcn-ui/badge'
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'

import { jobs } from '@/data/mockData'

const featuredJobs = jobs.slice(0, 6)

const FeaturedJobs = () => {
  return (
    <section className='bg-secondary/30 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>Featured Jobs</h2>
          <p className='text-muted-foreground text-lg'>
            Discover the latest opportunities from top companies
          </p>
        </div>

        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {featuredJobs.map((job) => (
            <Card
              key={job.id}
              className='group transition-shadow duration-300 hover:shadow-lg'
            >
              <CardHeader>
                <div className='mb-2 flex items-start justify-between'>
                  <div className='bg-gradient-primary rounded-lg p-2'>
                    <Briefcase className='text-primary-foreground h-5 w-5' />
                  </div>
                  <Badge variant='secondary'>{job.type}</Badge>
                </div>
                <CardTitle className='group-hover:text-primary text-xl transition-colors'>
                  {job.title}
                </CardTitle>
                <CardDescription className='text-foreground font-semibold'>
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='mb-4 space-y-3'>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <MapPin className='h-4 w-4' />
                    {job.location}
                  </div>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <DollarSign className='h-4 w-4' />
                    {job.salary}
                  </div>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <Clock className='h-4 w-4' />
                    {job.posted}
                  </div>
                </div>

                <div className='mb-4 flex flex-wrap gap-2'>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant='outline' className='w-full' asChild>
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='text-center'>
          <Button size='lg' variant='default' asChild>
            <Link href='/jobs'>View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
