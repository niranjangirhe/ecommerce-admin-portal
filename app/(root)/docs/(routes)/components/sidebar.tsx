import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  sections: Array<{ id: string; title: string }>;
  activeSection: string;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  isMobile,
}) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 pl-6 mt-2">
        <h2 className="mb-2 text-lg font-semibold">API Documentation</h2>
        <Separator className="my-2" />
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block py-2 text-sm hover:underline  ${
              activeSection === section.id
                ? "font-bold"
                : "font-light text-muted-foreground"
            }`}
            onClick={() => {
              if (isMobile) {
                document.body.click();
              }
            }}
          >
            {section.title}
          </a>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Sidebar;
