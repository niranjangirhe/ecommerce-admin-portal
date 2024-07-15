"use client";

import { useState, useEffect } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./components/sidebar";
import MainContent from "./components/main-content";
import BaseUrlDoc from "./components/baseurl";
import BillboardAPIDoc from "./components/billboards";
import LandingPageNavBar from "@/components/landing-page-navbar";
import CategoryAPIDoc from "./components/categories";
import SizeAPIDoc from "./components/sizes";
import ColorAPIDoc from "./components/colors";
import ProductAPIDoc from "./components/products";
import OrderAPIDoc from "./components/orders";

export const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: "This is the introduction to our API.",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: "This is the getting started section.",
  },
  {
    id: "base-url",
    title: "Base URL",
    content: <BaseUrlDoc />,
  },
  {
    id: "billboards",
    title: "Billboards",
    content: <BillboardAPIDoc />,
  },
  {
    id: "categories",
    title: "Categories",
    content: <CategoryAPIDoc />,
  },
  {
    id: "Sizes",
    title: "Sizes",
    content: <SizeAPIDoc />,
  },
  {
    id: "colors",
    title: "Colors",
    content: <ColorAPIDoc />,
  },
  {
    id: "products",
    title: "Products",
    content: <ProductAPIDoc />,
  },
  {
    id: "orders",
    title: "Orders",
    content: <OrderAPIDoc />,
  },
];

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

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
              className="fixed top-4 left-4 z-50"
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
      <div className={`flex-1 p-6 ${isMobile && "pt-20"}`}>
        <MainContent sections={sections} />
      </div>
    </div>
  );
};

export default DocumentationPage;
