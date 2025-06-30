// components/autel/AutelZoomSequence.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AutelZoomSequence = ({ images = [], specs = [] }) => {
  const seqImages = images.slice(6, 9);
  const specGroups = [
    specs.slice(0, 3).join(' '),
    specs.slice(3, 6).join(' '),
    specs.slice(6, 9).join(' '),
  ];

  return (
    <div className="w-full bg-black py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        {seqImages.map((src, i) => (
          <SlideWithOverlay
            key={i}
            src={src}
            text={specGroups[i] || ''}
            alignLeft={i % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

const SlideWithOverlay = ({ src, text, alignLeft }) => {
  const [ref, inView] = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  // Görselin başlangıç ve bitiş halleri
  const imgInitial = { x: alignLeft ? -50 : 50, scale: 0.95, opacity: 0 };
  const imgAnimate = { x: 0, scale: 1, opacity: 1 };

  // Metnin başlangıç ve bitiş halleri
  const textInitial = { x: alignLeft ? 50 : -50, opacity: 0 };
  const textAnimate = { x: 0, opacity: 1 };

  return (
    <div
      ref={ref}
      className="w-full mx-auto min-h-screen flex items-center justify-center overflow-hidden mb-12"
    >
      <div
        className={`flex w-full h-full flex-col ${
          alignLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Görsel bloğu */}
        <motion.div
          className="w-full md:w-7/12 h-auto flex items-center justify-center px-2 md:px-4"
          initial={imgInitial}
          animate={inView ? imgAnimate : imgInitial}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-auto object-cover max-h-[60vh] rounded-lg"
          />
        </motion.div>

        {/* Yazı bloğu */}
        <motion.div
          className="w-full md:w-5/12 h-auto flex items-center justify-center px-2 md:px-6 mt-6 md:mt-0"
          initial={textInitial}
          animate={inView ? textAnimate : textInitial}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
        >
          <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed text-center md:text-left">
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AutelZoomSequence;
