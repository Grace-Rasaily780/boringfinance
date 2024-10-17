import { useEffect } from "react";
import "./DashboardHeader.css";
import { Badge } from "@/components/ui/badge";
import MethodSettings from "./modals/MethodSettings";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import AddAmount from "./modals/AddAmount";
import { fetchBalance } from "@/actions/balance";

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
      <h1 className="title">DASHBOARD</h1>
      <div className="method_info_container">
        <span className="method_label">Personal Budgeting</span>
        <Badge variant="secondary">50/30/20 RULE</Badge>
        <MethodSettings />
      </div>
      <div className="total_container">
        <span className="label">INCOME</span>
        <div className="total">
          <span className="total_currency">{user.currency}</span>
          <span className="total_amount">{numFormatter(incomeAmount)}</span>
        </div>
        <AddAmount />
      </div>
      <div className="total_container">
        <span className="label">CURRENT AMOUNT</span>
        <div className="total">
          <span className="total_currency">{user.currency}</span>
          <span className="total_amount">{numFormatter(currentAmount)}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
