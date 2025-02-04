"use client";
import { useTheme } from "next-themes";

import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export const DarkThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={() => setTheme(isDark ? "light" : "dark")}
      className={`${
        isDark
          ? "bg-primary focus:ring-primary"
          : "bg-gray-200 focus:ring-secondary"
      } relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDark ? "translate-x-6" : "translate-x-0"
        } inline-flex h-8 w-8 transform items-center justify-center rounded-full bg-white transition-transform`}
      >
        {isDark ? (
          <MoonIcon className="h-8 w-8 text-primary" />
        ) : (
          <SunIcon className="h-8 w-8 text-secondary" />
        )}
      </span>
    </Switch>
  );
};
