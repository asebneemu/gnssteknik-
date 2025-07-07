import React from "react";

const DjiHeroVideo = ({ name, meta, videoUrl, imageUrl, buyUrl }) => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {videoUrl ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={imageUrl || "/images/default.jpg"}
          alt={name}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10 flex flex-col justify-center items-center text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {name}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          {meta?.description}
        </p>
        <button
          onClick={() => window.open(buyUrl, "_blank")}  // ← use buyUrl prop
          className="mt-6 px-6 py-2 bg-white/10 text-white border border-white/20 rounded-md font-semibold shadow-sm backdrop-blur-sm mx-auto transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:scale-105"
        >
          Satın Al
        </button>
      </div>
    </div>
  );
};

export default DjiHeroVideo;
