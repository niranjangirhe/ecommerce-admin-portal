import { Separator } from "@/components/ui/separator";

interface MainContentProps {
  sections: Array<{ id: string; title: string; content: React.ReactNode }>;
}

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
  const length = sections.length;
  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index === length - 1 ? "min-h-[calc(100vh-48px)]" : ""}
        >
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          {section.content}
          <Separator className="mt-4" />
        </section>
      ))}
    </div>
  );
};

export default MainContent;
