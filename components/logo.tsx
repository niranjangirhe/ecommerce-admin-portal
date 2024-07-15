"use client";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState<string>(logoLight);

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      setLogo(logoDark);
    } else {
      setLogo(logoLight);
    }
  }, [theme, systemTheme]);

  return (
    <div
      className="flex items-center h-full w-full"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <Image src={logo} alt="Logo" className="h-full w-full" />
    </div>
  );
};

export default Logo;
