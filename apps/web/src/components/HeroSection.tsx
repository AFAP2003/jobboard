"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search:", searchQuery, location);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Professional workspace"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-12">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-background rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-border"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-border"
                />
              </div>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full h-12">
              <Search className="mr-2 h-5 w-5" />
              Search Jobs
            </Button>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">10K+</div>
              <div className="text-sm text-primary-foreground/80">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">5K+</div>
              <div className="text-sm text-primary-foreground/80">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">50K+</div>
              <div className="text-sm text-primary-foreground/80">Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
