import LogoNoText from "@/components/logo-no-text";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-fit pt-10 md:pt-20 px-14 bg-blue-200 dark:bg-black text-slate-800 dark:text-white flex flex-col justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row md:justify-between ">
        <div className="grid md:grid-flow-col gap-10 content-center justify-center text-center md:text-left mb-10 md:mb-0">
          <div className="h-12 w-full">
            <LogoNoText />
          </div>
          <div>
            <a
              href="https://storeops-frontend.vercel.app/"
              className="text-md block"
            >
              Sample website
            </a>
            <a
              href="https://storeops-admin.vercel.app/docs"
              className="text-md block"
            >
              API Documentation
            </a>
          </div>
          <div>
            <a href="#" className="text-md block">
              Video Tutorial
            </a>
            <a href="https://girhe.com" className="text-md block">
              Developer website
            </a>
          </div>
          <div>
            <a href="#" className="text-md block">
              Linked In Post
            </a>
            <a
              href="https://girhe.com/#:~:text=Blender%20and%20Krita-,CONTACT,-Connect%20With%20Me"
              className="text-md block"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="grid grid-flow-col gap-5 content-center justify-center">
          <a href="https://www.instagram.com/girhe_niranjan/">
            <Instagram size={32} />
          </a>
          <a href="https://www.linkedin.com/in/niranjan-girhe/">
            <Linkedin size={32} />
          </a>
          <a href="https://github.com/niranjangirhe/storeops-admin-portal">
            <Github size={32} />
          </a>
        </div>
      </div>
      <footer>
        <div className="mx-auto pt-8 pb-2">
          <p className="text-center text-xs text-back">
            &copy; 2024 StoreOps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
