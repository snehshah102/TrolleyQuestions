import React from 'react';
import { motion } from 'framer-motion';

const animationVariants = {
  'karan-satsang': {
    trolley: {
      x: [-100, 200],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    },
    people: {
      y: [-5, 5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  'maharaj': {
    trolley: {
      x: [-100, 100, -100],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    people: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },
  'spiritual-wisdom': {
    trolley: {
      x: [-100, 200],
      y: [-5, 5],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    people: {
      rotate: [-2, 2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },
  'devotion': {
    trolley: {
      x: [-100, 200],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    },
    people: {
      y: [-3, 3],
      x: [-2, 2],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

const TrolleyAnimation = ({ category = 'karan-satsang' }) => {
  const variant = animationVariants[category];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-100 to-sky-200 rounded-xl overflow-hidden">
      {/* Tracks */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="relative w-4/5 h-4">
          {/* Main Track */}
          <div className="absolute left-0 right-0 h-2 bg-gray-700" />
          
          {/* Track Lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-1 bg-gray-600"
              style={{
                left: `${(i * 8)}%`,
                top: '4px'
              }}
            />
          ))}

          {/* Split Track */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute right-1/4 w-1/3 h-2 bg-gray-700 origin-left"
            style={{
              transform: 'rotate(-30deg)',
              transformOrigin: 'left bottom'
            }}
          />
        </div>
      </div>

      {/* Trolley */}
      <motion.div
        initial={{ x: -100 }}
        animate={variant.trolley}
        className="absolute bottom-14 left-0 flex flex-col items-center"
      >
        {/* Trolley Body */}
        <div className="w-16 h-10 bg-red-500 rounded-lg shadow-lg">
          {/* Windows */}
          <div className="absolute top-2 left-2 right-2 h-4 bg-sky-200 rounded" />
        </div>
        {/* Wheels */}
        <div className="flex gap-6 mt-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 bg-gray-700 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 bg-gray-700 rounded-full"
          />
        </div>
      </motion.div>

      {/* People */}
      <motion.div 
        animate={variant.people}
        className="absolute bottom-20 right-1/4 flex gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * i }}
            className="w-4 h-8 bg-gray-800 rounded-full"
          />
        ))}
      </motion.div>

      {/* Single Person on Split Track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, ...variant.people }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 right-12 w-4 h-8 bg-gray-800 rounded-full"
      />
    </div>
  );
};

export default TrolleyAnimation; 