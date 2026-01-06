"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedJobs from "@/components/FeaturedJobs";
import CompanyShowcase from "@/components/CompanyShowcase";
import Footer from "@/components/Footer";


const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedJobs />
      <CompanyShowcase />
      <Footer />
    </div>
  );
};

export default Page;
