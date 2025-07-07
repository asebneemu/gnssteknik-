// components/autel/ImageSpecsOverlay.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ImageSpecsOverlay = ({ src, specs = [] }) => {
  // İlk 9 spec’i at, kalanları ikiye böl
  const remaining = specs.slice(9);
  const half = Math.ceil(remaining.length / 2);
  const leftText = remaining.slice(0, half).join(' ');
  const rightText = remaining.slice(half).join(' ');

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const variantsLeft = {
    hiddenLeft: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeInOut' } }
  };
  const variantsRight = {
    hiddenRight: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeInOut' } }
  };

  return (
    <div
      ref={ref}
      className={`
        w-full
        h-auto        /* Yükseklik içeriğe göre */
        sm:h-screen   /* isterseniz sm+ tam ekran */
        flex flex-col sm:flex-row
        items-center justify-center
        bg-black py-8
      `}
    >
      {/* Görsel + desktop overlay konteyneri */}
      <div className="relative w-full sm:w-1/2 h-auto overflow-visible">
        <motion.img
          src={src}
          alt=""
          className="w-[90%] mx-auto sm:w-full h-auto object-cover rounded-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Desktop/Tablet: sol kutucuk */}
        {leftText && (
          <motion.div
            className="hidden sm:block absolute top-24 left-[-25%] bg-black/30 backdrop-blur-md rounded-lg p-4 max-w-md z-20"
            initial="hiddenLeft"
            animate={controls}
            variants={variantsLeft}
          >
            <p className="text-white text-lg leading-relaxed">
              {leftText}
            </p>
          </motion.div>
        )}

        {/* Desktop/Tablet: sağ kutucuk */}
        {rightText && (
          <motion.div
            className="hidden sm:block absolute top-20 right-[-25%] bg-black/30 backdrop-blur-md rounded-lg p-4 max-w-md z-20"
            initial="hiddenRight"
            animate={controls}
            variants={variantsRight}
          >
            <p className="text-white text-lg leading-relaxed">
              {rightText}
            </p>
          </motion.div>
        )}
      </div>

      {/* Mobile: resmin hemen ardından, statik alt-alta */}
      <div className="sm:hidden mt-6 w-full px-4 flex flex-col items-center space-y-4">
        {leftText && (
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white text-base leading-relaxed w-full"
            initial="hiddenLeft"
            animate={controls}
            variants={variantsLeft}
          >
            {leftText}
          </motion.div>
        )}
        {rightText && (
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white text-base leading-relaxed w-full"
            initial="hiddenRight"
            animate={controls}
            variants={variantsRight}
          >
            {rightText}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageSpecsOverlay;
