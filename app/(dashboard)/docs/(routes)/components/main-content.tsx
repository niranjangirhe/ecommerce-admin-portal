import { Separator } from "@/components/ui/separator";

interface MainContentProps {
  sections: Array<{ id: string; title: string; content: React.ReactNode }>;
}

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          {section.content}
          <Separator className="mt-4" />
        </section>
      ))}
    </div>
  );
};

export default MainContent;
