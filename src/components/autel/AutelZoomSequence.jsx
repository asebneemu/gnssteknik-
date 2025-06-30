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
    <div className="w-full bg-black">
      <div className="w-[85%] mx-auto">
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
      className="w-[90%] mx-auto h-screen flex items-center justify-center overflow-hidden"
    >
      <div className={`flex w-full h-full ${alignLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Görsel bloğu (%70 genişlik) */}
        <motion.div
          className="w-[70%] h-full flex items-center justify-center"
          initial={imgInitial}
          animate={inView ? imgAnimate : imgInitial}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img src={src} alt="" className="w-full h-auto object-contain" />
        </motion.div>

        {/* Yazı bloğu (%30 genişlik) */}
        <motion.div
          className="w-[30%] h-full flex items-center justify-center px-6"
          initial={textInitial}
          animate={inView ? textAnimate : textInitial}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
        >
          <p className="text-white text-xl leading-relaxed text-left">
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AutelZoomSequence;
