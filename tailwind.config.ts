import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "darkBlue": "#0a2540",
        "lightBlue": "#635bff",
        "paleBlue": "#425466",
        "offWhite": "#f6f9fc",
      },
      fontFamily: {
        custom: ['Helvetica', 'sans-serif']
      },
    },
  },
  plugins: [],
};
export default config;
