"use client";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();
  const [logo, setLogo] = useState<string>(logoLight);

  useEffect(() => {
    if (theme === "dark") {
      setLogo(logoDark);
    } else {
      setLogo(logoLight);
    }
  }, [theme]);
  return (
    <div className="flex items-center h-full w-full">
      <Image src={logo} alt="Logo" className="h-full w-full" />
    </div>
  );
};

export default Logo;
