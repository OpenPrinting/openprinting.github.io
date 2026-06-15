import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindAnimation from "tailwindcss-animate";
import tailwindTypography from "@tailwindcss/typography";

const config: Config = {
  // Use class-based dark mode so the site defaults to light unless the
  // user explicitly chooses dark (stored in localStorage).
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          cyan: "#0092ca",
          blue: "#3b82f6",
          lightBlue: "#60a5fa",
          darkBlue: "#1e3a5f",
          legacyDark: "#222831",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      typography: (theme: (arg0: string) => unknown) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.gray.300"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-links-hover": theme("colors.blue.300"),
            "--tw-prose-underline": theme("colors.blue.400"),
            "--tw-prose-underline-hover": theme("colors.blue.300"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.gray.400"),
            "--tw-prose-bullets": theme("colors.gray.400"),
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quote-borders": theme("colors.gray.700"),
            "--tw-prose-captions": theme("colors.gray.400"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.gray.300"),
            "--tw-prose-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-pre-border": theme("colors.gray.700"),
            "--tw-prose-th-borders": theme("colors.gray.600"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
          },
        },
        DEFAULT: {
          css: {
            a: {
              color: "var(--tw-prose-links)",
              "&:hover": {
                color: "var(--tw-prose-links-hover)",
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [tailwindAnimation, tailwindTypography],
};

export default config;
