"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { name: "About", href: "/#about" },
    { name: "Education", href: "/#education" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Achievements", href: "/#achievements" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative w-full border-t border-border/60 bg-background/50 backdrop-blur-md pt-12 pb-6 px-4 md:px-8 z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-border/40">
        
        {/* Author / Bio */}
        <div className="space-y-4 text-left">
          <h3 className="font-bold text-lg md:text-xl font-display text-foreground">
            {config.author}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Full Stack Developer & AIML Student specializing in computer vision, RAG, and premium web architectures. Building intelligent applications that make an impact.
          </p>
          <div className="pt-2">
            <SocialMediaButtons />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 text-left">
          <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-left">
          <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
            Get in touch
          </h4>
          <ul className="space-y-2.5 text-xs md:text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href={`mailto:${config.email}`}
                className="hover:text-primary transition-colors hover:underline break-all"
              >
                {config.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a
                href="tel:+917330775225"
                className="hover:text-primary transition-colors hover:underline"
              >
                +91 73307 75225
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Scroll to Top */}
      <div className="max-w-5xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] md:text-xs text-muted-foreground">
          © {year} {config.author}. All rights reserved.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/25 border border-primary/20 text-primary rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors shadow-sm"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
