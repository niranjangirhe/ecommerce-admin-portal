import LandingPageNavBar from "@/components/landing-page-navbar";

const DocumentationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default DocumentationLayout;
