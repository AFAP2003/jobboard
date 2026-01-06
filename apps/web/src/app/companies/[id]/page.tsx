'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { companies } from '@/data/mockData'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn-ui/card'
import { Button } from '@/components/shadcn-ui/button'
import { Badge } from '@/components/shadcn-ui/badge'
import { Input } from '@/components/shadcn-ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn-ui/select'
import { Building2, MapPin, Users, Search } from 'lucide-react'
import Link from 'next/link'

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('all')

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesLocation =
      locationFilter === 'all' || company.location === locationFilter
    const matchesIndustry =
      industryFilter === 'all' || company.industry === industryFilter
    return matchesSearch && matchesLocation && matchesIndustry
  })

  const locations = Array.from(new Set(companies.map((c) => c.location)))
  const industries = Array.from(new Set(companies.map((c) => c.industry)))

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <div className='bg-gradient-primary py-12'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='mb-4 text-4xl font-bold text-white'>
              Discover Companies
            </h1>
            <p className='mb-8 text-lg text-white/90'>
              Explore {companies.length} companies hiring now
            </p>

            <div className='bg-background rounded-lg p-6 shadow-lg'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='relative'>
                  <Search className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
                  <Input
                    placeholder='Search companies...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                </div>
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Location' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={industryFilter}
                  onValueChange={setIndustryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Industry' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mb-6'>
            <p className='text-muted-foreground'>
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className='group transition-shadow duration-300 hover:shadow-lg'
              >
                <CardHeader>
                  <div className='mb-3 flex items-start justify-between'>
                    <div className='bg-gradient-accent rounded-lg p-3'>
                      <Building2 className='text-accent-foreground h-6 w-6' />
                    </div>
                    <Badge variant='secondary'>
                      {company.openPositions} positions
                    </Badge>
                  </div>
                  <CardTitle className='group-hover:text-primary text-xl transition-colors'>
                    {company.name}
                  </CardTitle>
                  <CardDescription>{company.industry}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-muted-foreground line-clamp-2'>
                    {company.description}
                  </p>

                  <div className='space-y-2'>
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

          {filteredCompanies.length === 0 && (
            <div className='py-12 text-center'>
              <p className='text-muted-foreground text-lg'>
                No companies found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CompaniesPage
