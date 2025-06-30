// components/autel/ImageSpecsOverlay.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ImageSpecsOverlay = ({ src, specs = [] }) => {
  const remaining = specs.slice(9);
  const half = Math.ceil(remaining.length / 2);
  const leftText = remaining.slice(0, half).join(' ');
  const rightText = remaining.slice(half).join(' ');

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const variants = {
    hiddenLeft: { opacity: 0, x: 200 },
    hiddenRight: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeInOut' } }
  };

  return (
    <div ref={ref} className="w-full h-screen flex items-center justify-center bg-black">
      <div className="relative w-[50%] h-auto overflow-visible">
        {/* Resim: hover ile zoom */}
        <motion.img
          src={src}
          alt=""
          className="w-full h-auto object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Sol kutucuk: soldan dışarıda başlıyor, sağdan gelerek yerleşir */}
        {leftText && (
          <motion.div
            className="absolute top-24 left-[-25%] bg-black/30 backdrop-blur-md rounded-lg p-4 max-w-md"
            initial="hiddenLeft"
            animate={controls}
            variants={variants}
          >
            <p className="text-white text-lg leading-relaxed">
              {leftText}
            </p>
          </motion.div>
        )}

        {/* Sağ kutucuk: sağdan dışarıda başlıyor, soldan gelerek yerleşir */}
        {rightText && (
          <motion.div
            className="absolute top-20 right-[-25%] bg-black/30 backdrop-blur-md rounded-lg p-4 max-w-md"
            initial="hiddenRight"
            animate={controls}
            variants={variants}
          >
            <p className="text-white text-lg leading-relaxed">
              {rightText}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageSpecsOverlay;
