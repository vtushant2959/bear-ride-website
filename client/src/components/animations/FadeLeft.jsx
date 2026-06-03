import { motion } from "framer-motion";

function FadeLeft({
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}

      whileInView={{
        opacity: 1,
        x: 0,
      }}

      transition={{
        duration: 0.8,
        delay,
      }}

      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeLeft;