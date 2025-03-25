// tailwind.config.js
module.exports = {
  mode: "jit", // JIT modunu aç
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // Kullanılan dosya yollarını tanımla
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",  // 🍊 Kullanılan renk
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
    },
  },
  plugins: [],
};
