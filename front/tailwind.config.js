/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react"
import { layouts } from "chart.js"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    light: {
      layout: {},
      colors: {},
    },
    dark: {
      layout: {},
      colors: {},
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}