"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";
import { X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type Certification = {
  id: number;
  title: string;
  issuer: string;
  details: string;
  image: string;
  images?: string[];
  badge?: string;
};

const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Cloud Computing",
    issuer: "NPTEL - IIT Kharagpur",
    details: "Elite Gold Badge with a score of 95%, placing in the Top 1% of candidates nationally.",
    image: "/assets/sashi/NPTELCLOUD.jpeg",
    badge: "Top 1% / Gold",
  },
  {
    id: 2,
    title: "MongoDB Associate Developer",
    issuer: "MongoDB Inc.",
    details: "Java Specialist validation for designing and optimizing applications on MongoDB.",
    image: "/assets/sashi/mongodb-associate-developer.6 (1).png",
    images: [
      "/assets/sashi/mongodb-associate-developer.6 (1).png",
      "/assets/sashi/MONGODBASSOCIATEJAVA.jpeg"
    ],
    badge: "Associate Java",
  },
  {
    id: 3,
    title: "MongoDB Associate Data Modeler",
    issuer: "MongoDB Inc.",
    details: "Expert certification for designing and configuring database schemas and relationships.",
    image: "/assets/sashi/MONGODBDATA.jpeg",
    badge: "Data Modeler",
  },
  {
    id: 4,
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    details: "Certified validation of standard JavaScript scripting, loops, closures, and arrays.",
    image: "/assets/sashi/d33be9f2-f234-496b-8e87-a924486c4cc8.jpeg",
    badge: "HackerRank",
  },
  {
    id: 5,
    title: "AI-ML Virtual Internship",
    issuer: "AICTE - Eduskills",
    details: "Practical implementation of machine learning models and data preprocessing pipelines.",
    image: "/assets/sashi/TIRUMALASETTY SASHI  PAVAN_certificate (6)_page-0001.jpg",
    badge: "AICTE",
  },
  {
    id: 6,
    title: "Java Full Stack Internship",
    issuer: "AICTE - Eduskills",
    details: "Full stack Java architectures, Spring Boot API frameworks, and front-end bindings.",
    image: "/assets/sashi/certificate (3) (1)_page-0001.jpg",
    badge: "Java Full Stack",
  },
  {
    id: 7,
    title: "C Programming",
    issuer: "SS Computer Technology",
    details: "Scored 98% in evaluation of core programming concepts, pointers, and memory control.",
    image: "/assets/sashi/C_LANGUAGE.jpeg",
    badge: "98% Score",
  },
  {
    id: 8,
    title: "Advanced HTML & CSS",
    issuer: "Infosys Springboard",
    details: "Comprehensive web layout training covering flexbox, grids, responsive structures, and advanced styles.",
    image: "/assets/sashi/Screenshot 2025-04-07 211606.png",
    badge: "Infosys",
  },
  {
    id: 9,
    title: "React Developer Internship",
    issuer: "CodeBegun",
    details: "Built clean, performant React user interfaces, full-stack MERN integrations, and custom styling systems.",
    image: "/assets/sashi/codebegun certificate.jpeg",
    badge: "Internship",
  },
  {
    id: 10,
    title: "Web Developer Internship",
    issuer: "CodeAlpha",
    details: "Designed and developed responsive web applications including Age Calculator, To-Do list, and Music player.",
    image: "/assets/sashi/codealpha certificate.jpeg",
    badge: "Internship",
  },
];

const CertificationsSection = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<Record<number, string>>({});

  return (
    <SectionWrapper id="certifications" className="flex flex-col items-center justify-center py-12 z-10">
      <div className="w-full max-w-6xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="certifications"
          title="Certifications"
          desc="Professional validations of my technical expertise."
          className="static mb-12 md:mb-16 mt-0"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, index) => {
            const displayedImg = cert.images && cert.images.length > 0
              ? (activeImages[cert.id] || cert.images[0])
              : cert.image;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="group relative border border-border bg-card/95 dark:bg-card/98 backdrop-blur-md shadow-md hover:border-primary/20 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden">
                  <CardContent className="p-0 flex flex-col h-full justify-between">
                    {/* Image Preview Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/25 border-b border-border/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayedImg}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                        <button
                          onClick={() => setSelectedImg(displayedImg)}
                          className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-full text-sm shadow-lg hover:bg-primary/80 transition-colors pointer-events-auto cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          View Certificate
                        </button>
                      </div>
                      {cert.badge && (
                        <span className="absolute top-3 left-3 bg-primary/95 text-primary-foreground text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-md z-10">
                          {cert.badge}
                        </span>
                      )}

                      {/* Image switcher tabs for multi-image certs */}
                      {cert.images && cert.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 z-20 flex gap-1 bg-black/50 backdrop-blur-md p-1 rounded-lg pointer-events-auto">
                          {cert.images.map((img) => {
                            const isBadge = img.includes("badge") || img.includes("developer.6");
                            const label = isBadge ? "Badge" : "Cert";
                            const isActive = displayedImg === img;
                            return (
                              <button
                                key={img}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImages((prev) => ({ ...prev, [cert.id]: img }));
                                }}
                                className={cn(
                                  "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer",
                                  isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <h4 className="font-bold text-base md:text-lg text-foreground font-display group-hover:text-primary transition-colors leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-primary font-bold font-sans">
                          {cert.issuer}
                        </p>
                      </div>
                      <p className="text-sm text-foreground/80 dark:text-foreground/90 leading-relaxed font-sans pt-1 font-medium">
                        {cert.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImg}
                alt="Certificate Zoomed"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default CertificationsSection;
