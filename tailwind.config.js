/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'city-sunset': "url('assets/img/pexels-nate-274598-1036657.jpg')"
      }
    },
  },
  plugins: [],
}

