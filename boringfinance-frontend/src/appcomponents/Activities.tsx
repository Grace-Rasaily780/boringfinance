import { useEffect } from "react";
import "./Activities.css";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import { fetchTransactions } from "@/actions/transaction";
import { transaction } from "@/store";

function Activities() {
  const transactions = useStore((state) => state.transactions);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchTransactions(user._id);
  }, []);
  return (
    <div className="activities_container">
      <h1 className="title">ACTIVITY</h1>

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
