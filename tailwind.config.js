// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080",
        accent: "#F4A261",
        lightbg: "#FAFAFA",
        darktext: "#1E293B",
        lighttext: "#64748B",
        sectiondiv: "#eff5f2",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        smooth: "0 8px 30px rgba(16,24,40,0.06)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
