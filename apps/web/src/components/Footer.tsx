"use client";

import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">JobBoard</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Connecting talent with opportunity. Find your dream job or hire the best candidates.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-muted-foreground hover:text-foreground transition-colors">
                  Premium Features
                </Link>
              </li>
              <li>
                <Link href="/cv-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                  CV Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
