import { useEffect } from "react";
import "./Activities.css";
import useStore, { localTransaction } from "@/store";
import useUserStore from "@/store/useUserStore";
import useStatusStore from "@/store/useStatusStore";
import { fetchTransactions } from "@/actions/transaction";
import { transaction } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EditActivity from "./modals/EditActivity";
import { DeleteActivity } from "./modals/DeleteActivity";

function Activities() {
  const transactions = useStore((state) => state.transactions);
  const activityStatus = useStatusStore((state) => state.activityStatus);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchTransactions(user._id);
  }, [user._id]);

  return (
    <div className="activities_container">
      {activityStatus.status === "PENDING" ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ) : (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between bg-blue-100">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6 pt-4">
              {transactions.length > 0 ? (
                transactions.map(
                  (
                    transaction: transaction | localTransaction,
                    index: number,
                  ) => (
                    <div
                      className="flex flex-row items-start justify-between "
                      key={index}
                    >
                      <div className="flex items-start w-full gap-5 sm:w-auto activity_left">
                        <div className="flex items-start space-x-3 w-full sm:w-auto">
                          <div className="rounded-full bg-red-100 p-1.5 sm:p-2 dark:bg-red-900 flex-shrink-0">
                            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300" />
                          </div>
                          <div className="flex-grow sm:flex-grow-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {transaction.purpose}
                            </p>
                            <div className="flex flex-col min-[300px]:flex-row items-start min-[300px]:items-center text-xs text-gray-500 min-[300px]:space-x-1 sm:space-x-2">
                              <span>{transaction.group}</span>
                              <span className="hidden min-[300px]:block">
                                •
                              </span>
                              <span>
                                {new Date(
                                  transaction.date,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 w-full sm:w-auto">
                          <button className="rounded-full bg-cyan-200 p-1.5 sm:p-2 dark:bg-cyan-400 flex-shrink-0">
                            <EditActivity transaction={transaction} />
                          </button>
                          <button className="rounded-full bg-red-100 p-1.5 sm:p-2 dark:bg-red-900 flex-shrink-0">
                            <DeleteActivity transaction={transaction} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <p className="text-sm font-medium text-red-600">
                          - {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  No transactions found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Activities;
