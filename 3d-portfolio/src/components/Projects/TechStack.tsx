"use client";
import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiDocker,
  SiAmazon,
  SiGooglecloud,
  SiSocketdotio,
  SiTailwindcss,
  SiCloudflare,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGreensock,
  SiOpencv,
  SiFlask,
} from "react-icons/si";

export const TECH_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }> | undefined
> = {
  React: SiReact,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  FastAPI: undefined,
  OpenCV: SiOpencv,
  MediaPipe: undefined,
  Docker: SiDocker,
  AWS: SiAmazon,
  GCP: SiGooglecloud,
  "Google Cloud": SiGooglecloud,
  "Socket.IO": SiSocketdotio,
  "Three.js": undefined,
  GSAP: SiGreensock,
  "Tailwind CSS": SiTailwindcss,
  Cloudflare: SiCloudflare,
  "Cloudflare Pages": SiCloudflare,
  HTML: SiHtml5,
  HTML5: SiHtml5,
  CSS: SiCss3,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  Flask: SiFlask,
  Groq: undefined,
  "LLaMA 3.1": undefined,
  pgvector: undefined,
  MERN: SiReact,
  WebGi: undefined,
  Parcel: undefined,
  "REST API": undefined,
};

interface TechStackProps {
  technologies: string[];
  size?: "sm" | "md";
}

const TechStack = ({ technologies, size = "sm" }: TechStackProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => {
        const IconComponent = TECH_ICONS[tech];
        return (
          <span
            key={tech}
            className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 font-medium backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white ${
              size === "sm"
                ? "px-3 py-1 text-xs"
                : "px-4 py-1.5 text-sm"
            }`}
          >
            {IconComponent && (
              <IconComponent
                className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"}
              />
            )}
            {tech}
          </span>
        );
      })}
    </div>
  );
};

export default TechStack;
