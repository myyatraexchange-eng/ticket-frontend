module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        fadeIn: "fadeIn 1s ease-out forwards",
        slideUp: "slideUp 1s ease-out forwards",
        bounceIn: "bounceIn 0.8s ease-out forwards",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: 0, transform: "scale(0.5)" },
          "60%": { opacity: 1, transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

