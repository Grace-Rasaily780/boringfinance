import { useEffect } from "react";
import "./DashboardHeader.css";
import { Badge } from "@/components/ui/badge";
import MethodSettings from "./modals/MethodSettings";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import AddAmount from "./modals/AddAmount";
import { fetchBalance } from "@/actions/balance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardHeader() {
  const { incomeAmount, currentAmount } = useStore((state) => state);
  const { user } = useUserStore((state) => state);

  function numFormatter(num: number) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }

  useEffect(() => {
    fetchBalance();
  }, []);
  return (
    <div className="dashboard_header_container">
      <div className="flex gap-3 justify-between">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-baseline">
          <h1 className="title">DASHBOARD</h1>
          <span className="method_label">Personal Budgeting</span>
        </div>
        <div className="method_info_container">
          <Badge variant="secondary">50/30/20 RULE</Badge>
          <MethodSettings />
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-100 pb-2 dark:bg-blue-900">
            <CardTitle className="text-md font-medium">Total Income</CardTitle>
            <AddAmount />
          </CardHeader>

          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold">
              {" "}
              {user.currency} {numFormatter(incomeAmount)}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-100 pb-2 dark:bg-blue-900">
            <CardTitle className="text-md font-medium p-1">
              {" "}
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-xl sm:text-2xl font-bold total_amount">
              {user.currency} {numFormatter(currentAmount)}
            </div>
            {/* <p className="text-xs text-blue-600 dark:text-blue-400">Updated just now</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardHeader;
