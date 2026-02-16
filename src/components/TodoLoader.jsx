import { motion } from "framer-motion";

const LoadingDots = () => {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#8199abff",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.2, // slower bounce
            repeat: Infinity, // infinite loop
            ease: "easeInOut",
            delay: i * 0.3, // stagger each dot more clearly
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
