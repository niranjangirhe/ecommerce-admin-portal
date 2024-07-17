"use client";

import { useState, useEffect } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./components/sidebar";
import MainContent from "./components/main-content";
import { sections } from "./components/docSections";

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setScrollY(4);
      } else {
        setScrollY(20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + 100; // Offset for better accuracy

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`fixed top-${scrollY} transition-all left-4 z-50`}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar
              sections={sections}
              activeSection={activeSection}
              isMobile={isMobile}
            />
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-64 border-r sticky top-0 h-screen overflow-auto">
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            isMobile={isMobile}
          />
        </div>
      )}
      <div className={`flex-1 p-6 ${isMobile && "pt-16"}`}>
        <MainContent sections={sections} />
      </div>
    </div>
  );
};

export default DocumentationPage;
