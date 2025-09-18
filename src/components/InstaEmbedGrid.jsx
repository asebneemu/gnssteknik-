import { useEffect } from "react";

const InstaEmbedGrid = () => {
  const posts = [
    "https://www.instagram.com/reel/DMc8JnIt5r2/",
    "https://www.instagram.com/reel/DLhgj9pspSS/",
    "https://www.instagram.com/reel/DIT3isuN_tk/"
,
  ];

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-[80%] mx-auto py-10">
      <h2 className="text-center text-2xl font-bold mb-8">
        {/* Buraya başlık gelecek */}
        Bizi Instagram’da Yakından Takip Edin
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((permalink, index) => (
          <div key={index} className="flex justify-center">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={permalink}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: 3,
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px auto",
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "100%",
              }}
            ></blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaEmbedGrid;
