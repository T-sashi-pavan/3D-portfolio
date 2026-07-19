"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const FunnyThemeToggle = dynamic(() => import("../theme/funny-theme-toggle"), {
  ssr: false,
  loading: () => <span className="w-6 h-6 mr-4 hidden md:flex" />,
});
import { Button } from "../ui/button";
import { config } from "@/data/config";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isHome = usePathname() === "/";
  const scrollYRef = useRef<number | null>(null);

  // Scroll lock when the menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isActive) {
      // store scroll position
      scrollYRef.current = window.scrollY || 0;
      // Lock body scroll without causing a layout jump
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // restore
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      // restore scroll
      if (scrollYRef.current !== null) {
        window.scrollTo(0, scrollYRef.current);
        scrollYRef.current = null;
      }
    }

    return () => {
      // cleanup in case of unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isActive]);

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in z-[1000]"
      )}
      style={{
        background: isActive ? "hsl(var(--background) / .8)" : "transparent",
        // backgroundImage:
        //   "linear-gradient(0deg, rgba(0, 0, 0, 0), rgb(0, 0, 0))",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      {/* <div
        className="absolute inset-0 "
        style={{
          mask: "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%)",
        }}
      >
      </div> */}
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Link href="/" className="flex items-center justify-center">
          <Button variant={"link"} className="text-md">
            {config.author}
          </Button>
        </Link>

        <FunnyThemeToggle className="w-6 h-6 mr-4 hidden md:flex" />
        {isHome && process.env.NEXT_PUBLIC_WS_URL && <OnlineUsers />}
        <GitHubStarsButton username="T-sashi-pavan" repo="3D-portfolio" className="mr-4 hidden md:flex" />
        <Button
          variant={"ghost"}
          onClick={() => setIsActive(!isActive)}
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
          className={cn(
            styles.el,
            "m-0 p-0 h-6 bg-transparent flex items-center justify-center"
          )}
        >
          <div className="relative hidden md:flex items-center">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>
              Close
            </motion.p>
          </div>
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ""
              }`}
          ></div>
        </Button>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        onClick={() => setIsActive(false)}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
