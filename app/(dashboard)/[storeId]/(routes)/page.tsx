import { Suspense } from "react";
import { formatter } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import {
  CopyX,
  Hourglass,
  IndianRupee,
  Package,
  PackagePlus,
  PackageX,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import DashboardCard from "./components/dashboard-card";
import { StateWiseSales } from "@/components/statewise-sales";
import { getStateWiseSales } from "@/actions/get-statewise-sales";
import { getTotalProducts } from "@/actions/get-total-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getMonthlySales } from "@/actions/get-monthly-revenue";
import { MonthlySales } from "@/components/monthly-sales";
import { Separator } from "@/components/ui/separator";
import { getTotalOrdersByType } from "@/actions/get-total-orders-by-type";
import Loading from "@/components/ui/loading";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <Suspense fallback={<Loading />}>
          <DashboardContent storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
};

const DashboardContent = async ({ storeId }: { storeId: string }) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const { totalActive, totalArchived } = await getTotalProducts(storeId);
  const {
    totalCreated,
    totalProcessing,
    totalDelivered,
    totalCancelled,
    totalShipped,
  } = await getTotalOrdersByType(storeId);
  const monthlySales = await getMonthlySales(storeId);
  const stateWiseSales = await getStateWiseSales(storeId);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCard
          statTitle="Total Revenue"
          statValue={formatter.format(Number(totalRevenue))}
          Icon={IndianRupee}
        />
        <DashboardCard
          statTitle="Average order value"
          statValue={
            totalDelivered + totalProcessing + totalShipped > 0
              ? formatter.format(
                  Number(totalRevenue) /
                    (totalDelivered + totalProcessing + totalShipped)
                )
              : "N/A"
          }
          Icon={IndianRupee}
        />
        <DashboardCard
          statTitle="Successfull Orders"
          statValue={String(totalDelivered + totalProcessing + totalShipped)}
          Icon={Package}
        />
        <DashboardCard
          statTitle="Cancelled Orders"
          statValue={String(totalCancelled)}
          Icon={CopyX}
        />
        <DashboardCard
          statTitle="Active Products"
          statValue={String(totalActive)}
          Icon={Package}
        />
        <DashboardCard
          statTitle="Archived Products"
          statValue={String(totalArchived)}
          Icon={PackagePlus}
        />
        <DashboardCard
          statTitle="Process Orders"
          statValue={String(totalProcessing)}
          Icon={Hourglass}
          attention
        />
        <DashboardCard
          statTitle="Failed Orders"
          statValue={String(totalCreated)}
          Icon={PackageX}
          attention
        />
      </div>

      <h2 className="text-lg font-semibold pt-4">Sales Overview</h2>
      <Separator />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Last 12 Month - Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlySales data={monthlySales} />
          </CardContent>
        </Card>
        <Card className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Statewise sales</CardTitle>
          </CardHeader>
          <CardContent>
            <StateWiseSales data={stateWiseSales} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
