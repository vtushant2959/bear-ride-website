import { motion } from "framer-motion";

function StaggerContainer({
  children,
}) {
  return (
    <motion.div
      initial="hidden"

      whileInView="show"

      viewport={{
        once: true,
      }}

      variants={{
        hidden: {},

        show: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default StaggerContainer;