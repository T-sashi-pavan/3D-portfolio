export type Project = {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: string;
  image: string;
  video?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  caseStudyUrl?: string;
  features?: string[];
  responsibilities?: string[];
  achievements?: string[];
  screenshots?: string[];
};

const projects: Project[] = [
  {
    id: "gunturmadampickles",
    title: "Guntur Madam Pickles — E-Commerce Platform",
    shortDescription: "Live freelance e-commerce site for a real pickle brand",
    category: "E-Commerce Platform",
    description:
      "Developed a complete real-time e-commerce website as a freelance project for a client selling authentic homemade pickles. The platform includes product listings, customer ordering flow, and live deployment for real users.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767264317/WhatsApp_Video_2026-01-01_at_3.56.41_PM_mhvlm9.mp4",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
    demoUrl: "https://gunturmadampickles.live/",
    githubUrl:
      "https://github.com/T-sashi-pavan/Guntur-madam-pickles-client-project",
    features: [
      "Product catalog with categories and filtering",
      "Customer ordering flow with form validation",
      "Mobile-first responsive layout",
      "SEO-optimized pages for local business discovery",
      "Live deployment with custom domain",
    ],
    responsibilities: [
      "Gathered client requirements and designed the full UX",
      "Built the product catalog and ordering flow in React",
      "Deployed the site with custom domain configuration",
      "Handled all client communication and revisions",
    ],
    achievements: [
      "Successfully delivered a production website for a real client",
      "Platform has been live and serving real customers",
      "First freelance project — completed end-to-end solo",
    ],
  },
  {
    id: "musicplayer",
    title: "Music Website",
    shortDescription: "Full-featured web music player with playlists and search",
    category: "Full Stack Web App",
    description:
      "Developed a web-based music player with playlist functionality, search, categorization, playback controls, volume adjustment, and dynamic track listing, ensuring cross-browser compatibility and responsive design.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767110069/MUSIC_VIDEO_ezukxo.mp4",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
    demoUrl: "https://mymusicplayercodealpha.netlify.app/",
    githubUrl:
      "https://github.com/T-sashi-pavan/CODE_ALPHA_MUSIC_PLAYER_WEBSITE",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_react-musicplayer-webdevelopment-activity-7303165890294910976-jlQJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHEGvoBDc7IO3QVqAaJUfYdspY2f1PToAg",
    features: [
      "Playlist creation, editing, and management",
      "Search and categorization by genre and artist",
      "Smooth playback controls: play, pause, skip, volume",
      "Dynamic track listing with metadata display",
      "Responsive design across all screen sizes",
      "Cross-browser audio compatibility",
    ],
    responsibilities: [
      "Designed and built the full UI from scratch",
      "Implemented the audio playback engine using the Web Audio API",
      "Built the search and filter system",
      "Ensured cross-browser compatibility for audio codecs",
    ],
    achievements: [
      "Fully functional music player deployed on Netlify",
      "Responsive design works seamlessly on mobile and desktop",
    ],
  },
  {
    id: "jewels3d",
    title: "3D Jewels Website",
    shortDescription: "Interactive 3D jewelry showcase with Three.js and WebGi",
    category: "3D Showcase & WebGL",
    description:
      "Built a responsive 3D jewelry showcase using Three.js and WebGi for realistic, interactive visualization, enhanced with GSAP animations, scroll effects, and modern tools like Parcel and TypeScript.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767110063/jewelley-website_afrsgm.mp4",
    technologies: [
      "JavaScript",
      "Three.js",
      "WebGi",
      "GSAP",
      "TypeScript",
      "Parcel",
    ],
    demoUrl: "https://sahasra-3-d-jewels-website.vercel.app/",
    githubUrl:
      "https://github.com/T-sashi-pavan/Sahasra-3D-Jewels-Website",
    features: [
      "Photorealistic 3D jewelry rendering with WebGi",
      "Scroll-driven GSAP animations for cinematic UX",
      "Interactive 360° product rotation",
      "Responsive design across all viewports",
      "Optimized asset loading with Parcel bundler",
    ],
    responsibilities: [
      "Set up the Three.js / WebGi rendering pipeline",
      "Choreographed GSAP scroll animations",
      "Optimized 3D asset sizes for web delivery",
      "Ensured cross-browser WebGL compatibility",
    ],
    achievements: [
      "Achieved near-photorealistic jewelry rendering in a browser",
      "Smooth 60fps scroll animations on modern hardware",
    ],
  },
  {
    id: "pollautomation",
    title: "Poll Automation Application",
    shortDescription: "Real-time polling platform for lectures and webinars",
    category: "Full Stack Web App",
    description:
      "Developed an open-source web app for real-time poll creation, updates, and audience tracking, independent of any conferencing platform—enhancing flexibility and accessibility for lectures, webinars, and meetings.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767111795/pollGenVideo_avjz49.mp4",
    technologies: ["MERN", "JavaScript", "Socket.IO", "REST API"],
    demoUrl: "https://automatic-poll-generation-frontend.vercel.app/",
    githubUrl: "https://github.com/T-sashi-pavan/PollGen",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_iitropar-nptelinternship-backenddevelopment-activity-7358750465133568000-3VoX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHEGvoBDc7IO3QVqAaJUfYdspY2f1PToAg",
    features: [
      "Real-time poll creation and live result updates via Socket.IO",
      "Platform-agnostic — works independently of any video tool",
      "Audience join via shareable link — no signup required",
      "Live vote tracking with animated bar chart results",
      "Poll history and session management",
    ],
    responsibilities: [
      "Built the MERN stack application end-to-end",
      "Implemented real-time Socket.IO event system",
      "Designed REST API for poll CRUD operations",
      "Deployed frontend on Vercel and backend on cloud",
    ],
    achievements: [
      "Built during IIT Ropar NPTEL Internship",
      "Real-time sync working with <100ms latency",
      "Open-sourced and shared with the developer community",
    ],
  },
  {
    id: "algorag",
    title: "ALGONOX RAG — Enterprise Multimodal RAG Platform",
    shortDescription: "Multimodal Retrieval-Augmented Generation & Intelligent Scraping Engine",
    category: "AI & RAG Platform",
    description:
      "Algonox RAG (codename: RAGINI) is an enterprise-grade document intelligence system offering mathematically calibrated multi-portal search scraping, variable-length semantic chunking, dense vector indexes, and integrated AI-assisted mail routing triage. It connects a fluid, dark-mode glassmorphic Next.js frontend with a high-performance Python FastAPI backend, utilizing MongoDB Atlas Vector Store and LangChain.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1783342223/Screen_Recording_2026-07-06_180758_q6tl9k.mp4",
    technologies: [
      "Next.js",
      "FastAPI",
      "Python",
      "MongoDB Atlas",
      "LangChain",
      "Groq",
      "Redis",
      "Framer Motion",
    ],
    demoUrl: "https://algonox-rag-frontend.onrender.com/",
    githubUrl: "https://github.com/T-sashi-pavan/ALGORAG",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_rag-generativeai-artificialintelligence-activity-7409484854863683586-0x3n",
    features: [
      "Mathematically calibrated multi-portal web search scraping",
      "Variable-length semantic chunking & dense vector index mapping",
      "Integrated AI-assisted mail routing triage & automated alerts",
      "Modern dark-mode glassmorphic workspace dashboard",
      "Contextual multimodal chat feeds and side-by-side session pinning",
      "High-performance concurrent ingestion pipelines on Render",
    ],
    responsibilities: [
      "Architected Blueprint spec orchestration for zero-touch dual-service deployment",
      "Configured MongoDB Atlas Vector Search index bindings and pipeline routing",
      "Optimized PyTorch-free embedding flows to run within Render's free tier RAM limits",
      "Designed concurrent asynchronous web scrapers using FastAPI and LangChain",
      "Crafted the fluid, glassmorphic workspace UI with Next.js and Framer Motion",
    ],
    achievements: [
      "Deployed Next.js frontend and Python FastAPI backend in under 5 minutes using Blueprint YAML",
      "Saved 2.5GB disk footprint and 90% RAM usage by optimizing backend package dependencies",
      "Achieved seamless, low-latency cross-service API communication and real-time streaming answers",
    ],
  },
  {
    id: "careertrekker",
    title: "Career Trekker",
    shortDescription: "Resume and portfolio builder with MNC shortlisting tools",
    category: "Career Management Tool",
    description:
      "Developed a career-building platform with features like Quick Resume Maker and Portfolio Maker. Integrated MNC's shortlisted resumes section with an edit feature for better customization.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767114496/CAREER_TREKKER_VIDEO_g9ajdn.mp4",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
    demoUrl: "https://career-trekker-resumes.netlify.app/",
    githubUrl: "https://github.com/T-sashi-pavan/CAREERTREKKER",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_careerdevelopment-resumebuilder-portfoliocreator-activity-7285980791719763969-ZHnr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHEGvoBDc7IO3QVqAaJUfYdspY2f1PToAg",
    features: [
      "Quick Resume Maker with live preview",
      "Portfolio Maker with customizable templates",
      "MNC shortlisted resume examples section",
      "Edit and export resume functionality",
      "Responsive interface for all devices",
    ],
    responsibilities: [
      "Designed and built the full platform UI and functionality",
      "Curated MNC resume examples for reference section",
      "Implemented live resume preview and export",
    ],
    achievements: [
      "Helped peers build and improve their resumes",
      "Received positive feedback from college community",
    ],
  },
  {
    id: "motiondetection",
    title: "Motion Detection System",
    shortDescription: "Real-time AI motion tracking in the browser — no backend",
    category: "Computer Vision",
    description:
      "An advanced AI-powered motion detection system that uses computer vision and machine learning to detect, track, and analyze human movement in real time — directly in the browser with a privacy-first approach.",
    image: "/assets/sashi/motsys1.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767110037/MOTION_DETECTION_SYSTEM_VIDEO_oxs2ep.mp4",
    technologies: ["HTML", "CSS", "JavaScript", "OpenCV", "MediaPipe"],
    demoUrl: "https://motion-detection-system-e7vf.onrender.com/",
    githubUrl: "https://github.com/T-sashi-pavan/MOTION_DETECTION_SYSTEM",
    features: [
      "Real-time human motion detection using MediaPipe Pose",
      "Privacy-first: all processing happens client-side",
      "Frame-by-frame skeleton overlay visualization",
      "Configurable motion sensitivity thresholds",
      "Works across browsers — Chrome, Firefox, Safari",
    ],
    responsibilities: [
      "Integrated MediaPipe Pose into a vanilla JS frontend",
      "Built the motion delta algorithm for sensitivity control",
      "Designed the real-time canvas overlay rendering system",
      "Optimized frame processing to maintain 30fps on low-end devices",
    ],
    achievements: [
      "Zero latency backend requirement — runs fully client-side",
      "Accurate skeleton tracking at 30fps on most consumer hardware",
    ],
  },
  {
    id: "gesturecomm",
    title: "Hand Gesture Communication",
    shortDescription: "Sign language to text — real-time, for online meetings",
    category: "AI / Computer Vision",
    description:
      "A real-time hand-gesture communication system leveraging OpenCV and MediaPipe to translate sign language into text and commands during online meetings. It empowers deaf and non-verbal users with seamless, low-latency interaction—bridging accessibility gaps in video conferencing and virtual collaboration.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767110040/HAND_GESTURE_COMMUNICATION_VIDEO_cxfztz.mp4",
    technologies: ["Python", "MediaPipe", "OpenCV", "Flask"],
    githubUrl:
      "https://github.com/T-sashi-pavan/gesture_recognition_project",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_computervision-gesturecontrol-ai-activity-7294313027217018881-cK6s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHEGvoBDc7IO3QVqAaJUfYdspY2f1PToAg",
    features: [
      "Real-time sign language recognition with MediaPipe Hands",
      "Translates hand gestures to text output instantly",
      "Accessibility-first design for deaf and non-verbal users",
      "Low-latency processing pipeline under 150ms",
      "Flask API for integration with external platforms",
    ],
    responsibilities: [
      "Designed the gesture recognition architecture",
      "Trained and validated gesture classification logic",
      "Built Flask API for cross-platform integration",
      "Conducted accessibility testing with target users",
    ],
    achievements: [
      "Bridges accessibility gap in video conferencing for non-verbal users",
      "Sub-150ms response time for gesture recognition",
    ],
  },
  {
    id: "gesturecontrol",
    title: "Hand Gesture System Control",
    shortDescription: "Control your desktop with gestures — touchless interaction",
    category: "AI / Human-Computer Interface",
    description:
      "Implemented real-time facial recognition and hand gesture recognition using OpenCV and MediaPipe to enable touchless, gesture-based interactions with desktop interface controls and system configurations.",
    image: "/assets/sashi/landsacpe.png",
    video:
      "https://res.cloudinary.com/dlujb9uqv/video/upload/v1767112449/HAND_GESTURE_SYSTEM_CONTROL_VIDEO_1_i35yu5.mp4",
    technologies: ["Python", "MediaPipe", "OpenCV", "Flask"],
    githubUrl:
      "https://github.com/T-sashi-pavan/HAND-GESTURE-SYSTEM-CONTROL",
    linkedinUrl:
      "https://www.linkedin.com/posts/tirumalasetty-sashi-pavan-a76624269_computervision-gesturecontrol-ai-activity-7294313027217018881-cK6s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHEGvoBDc7IO3QVqAaJUfYdspY2f1PToAg",
    features: [
      "Touchless desktop control via hand gestures",
      "Facial recognition for user authentication",
      "Volume, brightness, and scroll control via gestures",
      "Real-time MediaPipe landmark tracking",
      "System integration via Python automation libraries",
    ],
    responsibilities: [
      "Mapped 21 hand landmarks to desktop control actions",
      "Integrated facial recognition for session authentication",
      "Built the real-time control dispatch system",
      "Optimized pipeline for low CPU usage on standard webcams",
    ],
    achievements: [
      "Full desktop control achieved with only a standard webcam",
      "Hands-free interaction demonstrated to 100+ peers",
    ],
  },
];

export default projects;
