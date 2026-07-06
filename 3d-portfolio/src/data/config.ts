const config = {
  title: "Sashi Pavan | Full-Stack Developer & AIML Specialist",
  description: {
    long: "Explore the portfolio of Tirumalasetty Sashi Pavan, a full-stack developer (MERN stack) and AIML student specializing in computer vision (OpenCV, MediaPipe), full-stack web applications, and technical innovations.",
    short:
      "Discover the portfolio of Sashi Pavan, a full-stack developer and AIML specialist creating interactive web experiences.",
  },
  keywords: [
    "Sashi Pavan",
    "Tirumalasetty Sashi Pavan",
    "portfolio",
    "full-stack developer",
    "AIML specialist",
    "computer vision",
    "OpenCV",
    "MediaPipe",
    "MERN stack",
    "next.js",
    "react",
    "three.js",
    "Framer Motion",
  ],
  author: "Sashi Pavan",
  email: "sashipavantirumalasetty1@gmail.com",
  site: "https://github.com/T-sashi-pavan",

  // for github stars button
  githubUsername: "T-sashi-pavan",
  githubRepo: "T_Sashi_Pavan_Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "https://www.linkedin.com/in/tirumalasetty-sashi-pavan-a76624269/",
    instagram: "",
    facebook: "",
    github: "https://github.com/T-sashi-pavan",
  },
};
export { config };
