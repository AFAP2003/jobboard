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
import { Building2, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

import { companies } from '@/data/mockData'

const displayCompanies = companies.slice(0, 4)

const CompanyShowcase = () => {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>
            Top Companies Hiring
          </h2>
          <p className='text-muted-foreground text-lg'>
            Join leading companies and take your career to the next level
          </p>
        </div>

        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {displayCompanies.map((company) => (
            <Card
              key={company.id}
              className='group transition-shadow duration-300 hover:shadow-lg'
            >
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-gradient-accent rounded-lg p-3'>
                      <Building2 className='text-accent-foreground h-6 w-6' />
                    </div>
                    <div>
                      <CardTitle className='group-hover:text-primary text-xl transition-colors'>
                        {company.name}
                      </CardTitle>
                      <CardDescription>{company.industry}</CardDescription>
                    </div>
                  </div>
                  <Badge variant='secondary' className='ml-2'>
                    {company.openPositions} positions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>
                  {company.description}
                </p>

                <div className='mb-4 space-y-2'>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <MapPin className='h-4 w-4' />
                    {company.location}
                  </div>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <Users className='h-4 w-4' />
                    {company.employees} employees
                  </div>
                </div>

                <Button variant='outline' className='w-full' asChild>
                  <Link href={`/companies/${company.id}`}>View Company</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='text-center'>
          <Button size='lg' variant='default' asChild>
            <Link href='/companies'>View All Companies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CompanyShowcase
