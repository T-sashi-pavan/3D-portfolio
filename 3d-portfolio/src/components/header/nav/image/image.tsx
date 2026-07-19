"use client";

import React from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      className={styles.imageContainer}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Preview image"
        className={styles.image}
      />
    </motion.div>
  );
};

export default Index;
