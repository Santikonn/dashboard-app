/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "muted": "hsl(220,15%,92%)",
        "border": "hsl(220,15%,88%)",
        "card": "hsl(0,0%,100%)",
        "muted-foreground": "hsl(220,10%,45%)",
        "background": "hsl(210, 20%, 98%)",
        "foreground": "hsl(220, 25%, 10%)",
        "primary": "hsl(217, 91%, 50%)",
        "secondary": "hsl(210, 40%, 96%)",
        "sidebar-border": "hsl(222, 47%, 18%)",
        "sidebar-foreground": "hsl(210, 40%, 98%)",
        "sidebar-accent": "hsl(222, 47%, 15%)",
        "sidebar-muted": "hsl(215, 16%, 57%)",
        "accent": "hsl(210, 40%, 96%)",
        "accent-foreground": "hsl(222, 47%, 11%)",
        "popover": "hsl(0, 0%, 100%)",   
        "popover-foreground": "hsl(222, 47%, 11%)",
        "primary-foreground": "hsl(0, 0%, 100%)",
        "destructive": "hsl(0, 84%, 60%)",
        },
      backgroundImage: {        
        "gradient-sidebar": "linear-gradient(180deg, hsl(222 47% 11%), hsl(222 47% 8%))",
        "gradient-primary": "linear-gradient(135deg, hsl(217 91% 60%), hsl(199 89% 48%))",
        },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}