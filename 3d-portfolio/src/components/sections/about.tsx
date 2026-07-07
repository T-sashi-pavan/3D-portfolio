"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

const AboutSection = () => {
  const focusAreas = [
    {
      title: "Artificial Intelligence & ML",
      description: "Computer Vision (OpenCV, MediaPipe), RAG pipelines, FastAPI, and model optimization.",
    },
    {
      title: "Full-Stack Development",
      description: "MERN Stack, Next.js, and interactive WebGL experiences using Three.js.",
    },
    {
      title: "Cloud & DevOps",
      description: "Docker containers, AWS deployment, Cloudflare integration, and CI/CD pipelines.",
    },
    {
      title: "Leadership & Strategy",
      description: "Led college hackathon teams (Winner in BTL and AVISHKAAR), project manager & startup lead.",
    },
  ];

  return (
    <SectionWrapper id="about" className="flex flex-col items-center justify-center py-12 z-10">
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="about"
          title="About Me"
          desc="Who I am and what I do"
          className="static mb-8 md:mb-12 mt-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sashi/Profile Photo.png"
                alt="Tirumalasetty Sashi Pavan"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // fallback if image has issues
                  (e.target as HTMLImageElement).src = "/assets/sashi/Profile Photo.png";
                }}
              />
            </div>
          </motion.div>

          {/* Description & Objective */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-7 space-y-6 bg-card/95 dark:bg-card/98 backdrop-blur-md border border-border shadow-md rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              Tirumalasetty Sashi Pavan
            </h3>
            <p className="text-foreground/80 dark:text-foreground/90 leading-relaxed text-sm md:text-base font-medium">
              I am a passionate <strong className="font-bold text-foreground">AIML student</strong> and <strong className="font-bold text-foreground">Full-Stack Developer</strong> specializing in creating premium web experiences and building computer vision solutions. With expertise in the <strong className="font-bold text-foreground">MERN Stack</strong>, <strong className="font-bold text-foreground">FastAPI</strong>, <strong className="font-bold text-foreground">OpenCV</strong>, and <strong className="font-bold text-foreground">MediaPipe</strong>, I bridge the gap between intelligent algorithms and production-grade software applications.
            </p>
            <p className="text-foreground/80 dark:text-foreground/90 leading-relaxed text-sm md:text-base font-medium">
              My hands-on experience includes real-time AI-powered Automatic Poll Generation at <strong className="font-bold text-foreground">IIT Ropar</strong>, creating e-commerce platforms, and developing touchless human-computer interfaces. I love taking on complex engineering challenges and leading collaborative projects that deliver tangible real-world value.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs py-1 px-3">
                AIML Specialist
              </Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs py-1 px-3">
                MERN Stack
              </Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs py-1 px-3">
                Computer Vision
              </Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs py-1 px-3">
                Startup Leader
              </Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs py-1 px-3">
                Cloud & DevOps
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-10">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="border border-border/80 bg-card/95 dark:bg-card/98 backdrop-blur-md shadow-sm hover:border-primary/20 transition-all duration-300 h-full">
                <CardContent className="p-6 space-y-2">
                  <h4 className="font-semibold text-lg text-foreground font-display">
                    {area.title}
                  </h4>
                  <p className="text-sm text-foreground/75 dark:text-foreground/85 leading-relaxed font-medium">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
