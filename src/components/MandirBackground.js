// MandirBackground.js
import React from 'react';
import { motion } from 'framer-motion';

const MandirBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative Domes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/4 w-32 h-32"
      >
        <div className="w-full h-full bg-primary-500 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-primary-500 rounded-t-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 right-1/4 w-24 h-24"
      >
        <div className="w-full h-full bg-orange-500 rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-orange-500 rounded-t-full" />
      </motion.div>

      {/* Floating SMVS Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-8xl font-display font-bold text-primary-400/20 tracking-widest">
          SMVS
        </h1>
      </motion.div>

      {/* Decorative Pillars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.1, scaleY: 1 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
          className="absolute bottom-0 w-16 bg-primary-500"
          style={{
            height: '40%',
            left: `${25 + i * 25}%`,
            borderRadius: '16px 16px 0 0',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 bg-primary-600 rounded-t-2xl" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-primary-600" />
        </motion.div>
      ))}

      {/* Floating Flowers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-5xl"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + ((i % 3) * 20)}%`,
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Trees */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 0.15,
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute bottom-0"
          style={{
            left: `${5 + i * 30}%`,
          }}
        >
          <div className="w-20 h-32 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-20 bg-primary-700/20 rounded-lg" />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary-500/20 rounded-full" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary-500/20 rounded-full" />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-500/20 rounded-full" />
          </div>
        </motion.div>
      ))}

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`extra-flower-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3.5 + i * 0.3,
            delay: i * 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-4xl"
          style={{
            left: `${5 + i * 25}%`,
            top: `${30 + i * 10}%`,
          }}
        >
          🌼
        </motion.div>
      ))}

      {/* Sacred Patterns */}
      <div className="absolute inset-0 bg-mandir-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/40" />
    </div>
  );
};

export default MandirBackground;