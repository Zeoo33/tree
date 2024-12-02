/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
      },
      colors: {
        background: "#f8f8f8",
        "background-configurator": "#f5f5f2",
        "border-gray": "#e6e6e6",
        "banner-gray": "#dcdcdc",
        "placeholder-gray": "#b4b4b4",
        "warm-gray": "#969696",
        "greyish-brown": "#5a5a5a",
        "black-bg": "#2b2b2b",
        black: "#1e1e1e",
        orange: {
          DEFAULT: "#fb903b",
          600: "#fa8223",
        },
        red: "#EB340A",
        seaweed: "#1cc781",
        overlay: "rgba(0, 0, 0, .75)",
      },
    },
  },
  plugins: [],
}

