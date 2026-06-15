"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        if (!open) return
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [open])

    if (!mounted) {
        return (
            <button
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground"
                aria-label="Toggle theme"
            >
                <Sun className="h-4 w-4" />
            </button>
        )
    }

    const ActiveIcon = resolvedTheme === "dark" ? Moon : Sun

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                aria-label="Toggle theme"
            >
                <ActiveIcon className="h-4 w-4" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-border bg-popover p-1 shadow-xl z-50">
                    {themes.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={() => {
                                setTheme(value)
                                setOpen(false)
                            }}
                            className={cn(
                                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                                theme === value
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
