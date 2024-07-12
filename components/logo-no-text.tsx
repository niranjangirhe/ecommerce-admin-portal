"use client";
import logoLight from "@/assets/logo-light-no-text.svg";
import logoDark from "@/assets/logo-dark-no-text.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const LogoNoText = () => {
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

export default LogoNoText;
