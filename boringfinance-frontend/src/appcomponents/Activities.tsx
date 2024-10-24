import { useEffect } from "react";
import "./Activities.css";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import useStatusStore from "@/store/useStatusStore";
import { fetchTransactions } from "@/actions/transaction";
import { transaction } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";

function Activities() {
  const transactions = useStore((state) => state.transactions);
  const activityStatus = useStatusStore((state) => state.activityStatus);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchTransactions(user._id);
  }, []);
  return (
    <div className="activities_container">
      <h1 className="title">ACTIVITY</h1>
      {activityStatus.status == "PENDING" ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ) : null}
      {transactions.map((transaction: transaction, index: number) => (
        <div className="activity_container" key={index}>
          <div className="activity_left">
            <h3>
              {user.currency} {transaction.amount.toLocaleString()}
            </h3>
            <span>
              {transaction.group}{" "}
              {/* {transaction?.category?.length > 0
                ? ` | ${transaction.category}`
                : ""} */}
            </span>
          </div>

          <div className="activity_right">
            <span>{transaction.purpose}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;
