/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        popup: "popup .5s ease-in-out",
        popupRe: "popup .5s ease-in-out reverse",
      },
      keyframes: {
        popup: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
