// components/autel/AutelHero.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

const AutelHero = ({ images = [], name, metaDescription }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const heroSrc = images[1] || '';
  const titleImageSrc = images[2] || '';
  const rawIcons = images.slice(3, 6);
  const iconSources = rawIcons.filter(src => !src.toLowerCase().includes('yok-ikon'));

  const isVideo = VIDEO_EXTENSIONS.some(ext =>
    heroSrc.toLowerCase().endsWith(`.${ext}`)
  );

  const shouldShowName =
    !titleImageSrc ||
    titleImageSrc.toLowerCase().includes('yok.png') ||
    titleImageSrc.trim().length === 0;

  const mediaVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 1 } },
  };

  const titleVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { delay: 0.5, duration: 1 } },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.8 } },
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-black"
          variants={mediaVariants}
          initial="hidden"
          animate={controls}
        >
          {isVideo ? (
            <video
              src={heroSrc}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={heroSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          initial="hidden"
          animate={controls}
        >
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            {shouldShowName ? (
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
                variants={titleVariants}
              >
                {name}
              </motion.h1>
            ) : (
              <motion.img
                src={titleImageSrc}
                alt="Hero Logo"
                className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-3/4 object-contain"
                variants={titleVariants}
              />
            )}

            {iconSources.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4">
                {iconSources.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`icon-${i}`}
                    className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* META DESCRIPTION */}
        <motion.div
          className="absolute bottom-0 w-full bg-black/60 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          <p className="text-white text-center text-sm sm:text-base md:text-lg font-semibold max-w-md sm:max-w-2xl md:max-w-4xl mx-auto leading-snug sm:leading-relaxed">
            {metaDescription}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AutelHero;
