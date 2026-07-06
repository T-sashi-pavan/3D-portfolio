"use client";

import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

type EducationItem = {
  id: number;
  institution: string;
  degree: string;
  period: string;
  grade: string;
  details: string;
};

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Chalapathi Institute of Engineering and Technology (CIET)",
    degree: "B.Tech in Computer Science and Engineering (AI & ML)",
    period: "2022 - 2026",
    grade: "9.1 CGPA",
    details: "Specializing in Machine Learning, Deep Learning, Computer Vision, and Full Stack Web architectures. Actively participating in national hackathons and technical bootcamps.",
  },
  {
    id: 2,
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate Education (MPC)",
    period: "2020 - 2022",
    grade: "95.6%",
    details: "Completed Higher Secondary Board with focus on Mathematics, Physics, and Chemistry.",
  },
  {
    id: 3,
    institution: "Seven Hills High School",
    degree: "Secondary School Certificate (SSC)",
    period: "2019 - 2020",
    grade: "97.16% (9.8 GPA)",
    details: "Completed General Board of Secondary Education with top honors in science and math.",
  },
];

const EducationSection = () => {
  return (
    <SectionWrapper id="education" className="flex flex-col items-center justify-center py-12 z-10">
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="education"
          title="Education"
          desc="My academic background."
          className="static mb-8 md:mb-12 mt-0"
        />

        <div className="relative border-l border-border md:border-l-0 md:flex md:flex-col md:items-center">
          {/* Connector line for large screens */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2 hidden md:block" />

          {educationData.map((edu, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={edu.id}
                className="relative pl-8 md:pl-0 mb-10 md:grid md:grid-cols-2 md:gap-8 md:w-full items-center"
              >
                {/* Node Dot */}
                <span className="absolute left-[-5px] md:left-1/2 top-5 w-2.5 h-2.5 rounded-full bg-primary border-4 border-background ring-4 ring-primary/20 -translate-x-1/2 z-20" />

                {/* Card Container */}
                <div className={`${isEven ? "md:col-start-1" : "md:col-start-2"} md:text-left`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <Card className="border border-border/80 bg-card/95 dark:bg-card/98 backdrop-blur-md shadow-md hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <Badge variant="secondary" className="w-fit text-xs font-semibold py-0.5 bg-secondary/80 text-foreground border border-border/30">
                            {edu.period}
                          </Badge>
                          <span className="text-primary font-bold text-sm bg-primary/10 rounded-lg px-2 py-0.5 w-fit">
                            {edu.grade}
                          </span>
                        </div>

                        <h4 className="text-lg md:text-xl font-bold font-display text-foreground leading-snug">
                          {edu.institution}
                        </h4>

                        <p className="text-sm font-semibold text-foreground/75 dark:text-foreground/85 italic font-sans">
                          {edu.degree}
                        </p>

                        <p className="text-sm text-foreground/80 dark:text-foreground/90 leading-relaxed pt-1 font-medium">
                          {edu.details}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default EducationSection;
