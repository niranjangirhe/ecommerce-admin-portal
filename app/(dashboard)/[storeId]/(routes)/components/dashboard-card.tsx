import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  statTitle: string;
  statValue: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  attention?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  statTitle,
  statValue,
  Icon,
  attention = false,
}) => {
  return (
    <Card
      className={cn(
        "border border-gray-200 rounded-lg shadow-sm",
        attention && "border-red-500 bg-red-500 bg-opacity-10"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{statTitle}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{statValue}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
