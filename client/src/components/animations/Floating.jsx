import { motion } from "framer-motion";

function Floating({
  children,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}

      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Floating;