import { useState } from "react";

const InstaSection = () => {
  const [popupUrl, setPopupUrl] = useState(null);

  const posts = [
    {
      img: "/insta/post1.jpg",
      videoUrl: "https://www.instagram.com/p/XXXXXXXXX/embed",
    },
    {
      img: "/insta/post2.jpg",
      videoUrl: "https://www.instagram.com/p/YYYYYYYYY/embed",
    },
    {
      img: "/insta/post3.jpg",
      videoUrl: "https://www.instagram.com/p/ZZZZZZZZZ/embed",
    },
  ];

  const openPopup = (url) => {
    setPopupUrl(url);
  };

  const closePopup = () => {
    setPopupUrl(null);
  };

  return (
    <div className="w-[80%] mx-auto flex flex-wrap justify-center gap-6 py-8">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="cursor-pointer hover:opacity-80 transition"
          onClick={() => openPopup(post.videoUrl)}
        >
          <img
            src={post.img}
            alt={`Instagram post ${idx + 1}`}
            className="w-72 h-72 object-cover rounded-xl shadow-md"
          />
        </div>
      ))}

      {popupUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="relative bg-white rounded-xl p-4 max-w-[90%] max-h-[90%] shadow-xl">
            <button
              onClick={closePopup}
              className="absolute top-2 right-4 text-3xl font-bold text-black hover:text-red-500"
            >
              &times;
            </button>
            <iframe
              src={popupUrl}
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              className="rounded-md"
              title="Instagram Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstaSection;
