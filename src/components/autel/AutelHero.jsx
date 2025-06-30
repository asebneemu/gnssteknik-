// components/autel/AutelHero.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg'];

const AutelHero = ({ images = [], metaDescription }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const heroSrc = images[1] || '';
  const titleImageSrc = images[2] || '';
  const iconSources = images.slice(3, 6);
  const isVideo = VIDEO_EXTENSIONS.some(ext =>
    heroSrc.toLowerCase().endsWith(`.${ext}`)
  );

  const mediaVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 1 } },
  };

  const titleImageVariants = {
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

        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          initial="hidden"
          animate={controls}
        >
          {/* Ortalanmış konteyner */}
          <div className="flex flex-col items-center space-y-6">
            {/* Başlık yerine gelen image, üstten inerek */}
            {titleImageSrc && (
              <motion.img
                src={titleImageSrc}
                alt="Hero Title"
                className="max-w-xl w-3/4 object-contain"
                variants={titleImageVariants}
              />
            )}

            {/* İkonlar */}
            <div className="flex space-x-4 self-start">
              {iconSources.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-[100px] h-[80px] object-contain"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* META DESCRIPTION, hero altında */}
        <motion.div
          className="absolute bottom-0 w-full bg-black/60 py-8 px-6"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          <p className="text-white text-center text-3xl font-semibold max-w-4xl mx-auto leading-relaxed">
            {metaDescription}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AutelHero;
