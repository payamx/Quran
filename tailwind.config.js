/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",

    theme: {

        extend: {
            fontFamily: {
                Notosansar:['Notosans', 'sans-serif'],
                arabic: ['Noto Kufi Arabic', 'sans-serif'],
                farsi: ['Vazir','Shabnam', 'sans-serif'],
                ayah: ['Roboto Light'],
                Shabnam: ['Shabnam']
            },
        },
    },
    plugins: [],
}