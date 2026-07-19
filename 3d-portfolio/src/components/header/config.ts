import { Link } from "@/types";

// Map link titles to images placed in public/HUMBURGER_IMAGES
const imageMap: Record<string, string> = {
  home: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480939/home_hqusiw.png',
  about: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480939/aboutme_wsbbfb.png',
  education: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480940/education_afwvqx.png',
  skills: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480942/skills_waxvts.png',
  experience: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480938/experience_xdnayp.png',
  projects: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480941/projects_cwtih0.png',
  certifications: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480938/certfications_wuzgjw.png',
  certificates: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480938/certfications_wuzgjw.png',
  achievements: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480939/archievements_rsoigq.png',
  contact: 'https://res.cloudinary.com/dlujb9uqv/image/upload/v1784480938/contactme_ci3ofe.png',
  "live chat": '/HUMBURGER_IMAGES/livechat.png',
  livechat: '/HUMBURGER_IMAGES/livechat.png',
};

const mapTitleToThumbnail = (title: string) => {
  const key = title.trim().toLowerCase();
  // Exact mapping if available
  if (imageMap[key]) return imageMap[key];
  // Fallback: remove non-alphanumeric and try
  const fallback = key.replace(/[^a-z0-9]/g, "");
  if (imageMap[fallback]) return imageMap[fallback];
  // Final fallback: try lowercased with .png
  return `/HUMBURGER_IMAGES/${fallback || 'home'}.png`;
};

const links: Link[] = [
  { title: 'Home', href: '/', thumbnail: mapTitleToThumbnail('Home') },
  { title: 'About', href: '/#about', thumbnail: mapTitleToThumbnail('About') },
  { title: 'Education', href: '/#education', thumbnail: mapTitleToThumbnail('Education') },
  { title: 'Skills', href: '/#skills', thumbnail: mapTitleToThumbnail('Skills') },
  { title: 'Experience', href: '/#experience', thumbnail: mapTitleToThumbnail('Experience') },
  { title: 'Projects', href: '/#projects', thumbnail: mapTitleToThumbnail('Projects') },
  { title: 'Certificates', href: '/#certifications', thumbnail: mapTitleToThumbnail('Certificates') },
  { title: 'Achievements', href: '/#achievements', thumbnail: mapTitleToThumbnail('Achievements') },
  { title: 'Contact', href: '/#contact', thumbnail: mapTitleToThumbnail('Contact') },
  { title: 'Live Chat', href: '/#livechat', thumbnail: mapTitleToThumbnail('Live Chat') },
];

export { links };
