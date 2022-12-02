module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: theme => ({
        "screen-85": "calc(100vh * 0.85)",
        "screen-70": "calc(100vh * 0.70)",
      }),
    },
  },
  variants: { display: ["responsive", "hover", "focus"] },
  plugins: [],
}