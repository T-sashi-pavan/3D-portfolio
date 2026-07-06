"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";
import SlideShow from "../slide-show";
import { Award, Trophy, Star, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

type Achievement = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  images: string[];
};

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Gold Badge & Top 1% in Cloud Computing",
    subtitle: "NPTEL - IIT Kharagpur",
    description: "Achieved the prestigious Gold Badge in Cloud Computing course evaluated by NPTEL & IIT Kharagpur, scoring 95% overall and securing a position in the Top 1% candidates across India.",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    images: [
      "/assets/sashi/NPTEL1.jpeg",
      "/assets/sashi/NPTEL2.jpeg",
      "/assets/sashi/NPTEL3.jpeg",
    ],
  },
  {
    id: 2,
    title: "Winner – Bharat Tech League Hackathon 2024",
    subtitle: "National Level Hackathon (Team Anveshna)",
    description: "Secured first place in the national hackathon. Represented the college under Team Anveshna, delivering an innovative project combining software automation and systems engineering under tight competition.",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    images: [
      "/assets/sashi/BHARATECH1.jpeg",
      "/assets/sashi/BHARATTECH2.jpeg",
      "/assets/sashi/BHARATTECH3.jpeg",
    ],
  },
  {
    id: 3,
    title: "Winner – AVISHKAAR National-level Hackathon",
    subtitle: "Akela (Individual Participant)",
    description: "Won first prize in the national-level technical competition 'AVISHKAAR' under the tag team Akela, demonstrating rapid prototyping, architectural execution, and robust technical logic.",
    icon: <Award className="w-5 h-5 text-yellow-500" />,
    images: [
      "/assets/sashi/AVISHKAAR1.jpeg",
      "/assets/sashi/AVISHKAAR2.jpeg",
      "/assets/sashi/AVISHKAAR3.jpeg",
    ],
  },
  {
    id: 4,
    title: "IDE Bootcamp 2025 at PSNA College",
    subtitle: "Tamil Nadu Innovation Initiative",
    description: "Selected to represent CIET in the prestigious Innovation Design and Entrepreneurship (IDE) Bootcamp 2025 organized by AICTE, held at PSNA College, Tamil Nadu.",
    icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
    images: [
      "/assets/sashi/PSNA1.jpeg",
      "/assets/sashi/PSNA2.jpeg",
      "/assets/sashi/PSNA3.jpeg",
      "/assets/sashi/PSNA4.jpeg",
      "/assets/sashi/PSNA5.jpeg",
      "/assets/sashi/PSNA6.jpeg",
      "/assets/sashi/PSNA7.jpeg",
    ],
  },
];

const AchievementsSection = () => {
  return (
    <SectionWrapper id="achievements" className="flex flex-col items-center justify-center py-12 z-10">
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="achievements"
          title="Achievements"
          desc="Milestones and recognitions."
          className="static mb-12 md:mb-16 mt-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {achievementsData.map((ach, index) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex h-full"
            >
              <Card className="border border-border bg-card/95 dark:bg-card/98 backdrop-blur-md shadow-md hover:border-primary/20 transition-colors duration-300 overflow-hidden flex flex-col justify-between h-full w-full">
                <CardContent className="p-6 flex flex-col h-full justify-between space-y-6">
                  {/* Slideshow (Top) */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-lg shrink-0 relative bg-black/5 flex items-center justify-center border border-border/40">
                    <SlideShow images={ach.images} objectFit="contain" />
                  </div>

                  {/* Achievement Details (Bottom) */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5 text-primary">
                          {ach.icon}
                        </span>
                        <div>
                          <h4 className="font-bold text-base md:text-lg text-foreground font-display leading-snug group-hover:text-primary transition-colors">
                            {ach.title}
                          </h4>
                          <p className="text-xs text-primary font-bold font-sans tracking-wide pt-0.5">
                            {ach.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 dark:text-foreground/90 leading-relaxed font-sans font-medium">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AchievementsSection;
