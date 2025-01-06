import { useEffect } from "react";
import "./IncomeHistory.css";
import { Wallet } from "lucide-react";
import { fetchBalance, fetchIncomes } from "@/actions/balance";
import useIncomeStore from "@/store/useIncomeStore";
import EditIncome from "@/appcomponents/modals/EditIncome";
import { DeleteIncome } from "@/appcomponents/modals/DeleteIncome";
import useUserStore from "@/store/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddAmount from "@/appcomponents/modals/AddAmount";
import useStore from "@/store";
import Header from "@/appcomponents/Header";

// import {
//   Card,
//   // CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

function IncomeHistory() {
  const { incomeAmount, currentAmount } = useStore((state) => state);
  const { user } = useUserStore((state) => state);

  function numFormatter(num: number) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }
  const { records } = useIncomeStore((state) => state);
  // const currencies = CODES;

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(user.currency);
  useEffect(() => {
    fetchBalance();
    fetchIncomes();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col income_page_container">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full gap-2">
          <h1 className="text-3xl font-semibold">Income History</h1>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-100 pb-2 dark:bg-blue-900">
              <CardTitle className="text-md font-medium">
                Total Income
              </CardTitle>
              <AddAmount />
            </CardHeader>

            <CardContent className="pt-4">
              <div className="text-xl sm:text-2xl font-bold">
                {" "}
                {user?.currency} {numFormatter(incomeAmount)}
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
                {user?.currency} {numFormatter(currentAmount)}
              </div>
              {/* <p className="text-xs text-blue-600 dark:text-blue-400">Updated just now</p> */}
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-1 lg:grid-cols-1">
          <div className="grid gap-6">
            {records.map((record) => (
              <div
                className="flex flex-row items-start justify-between"
                key={record._id}
              >
                <div className="flex items-start w-full gap-5 sm:w-auto activity_left">
                  <div className="flex items-start space-x-3 w-full sm:w-auto">
                    <div className="rounded-full bg-red-100 p-1.5 sm:p-2 dark:bg-red-900 flex-shrink-0">
                      <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300" />
                    </div>
                    <div className="flex-grow sm:flex-grow-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {record.source}
                      </p>
                      <div className="flex flex-col min-[300px]:flex-row items-start min-[300px]:items-center text-xs text-gray-500 min-[300px]:space-x-1 sm:space-x-2">
                        <span>
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 w-full sm:w-auto">
                    <button className="rounded-full bg-cyan-200 p-1.5 sm:p-2 dark:bg-cyan-400 flex-shrink-0">
                      <EditIncome record={record} />
                    </button>
                    <button className="rounded-full bg-red-100 p-1.5 sm:p-2 dark:bg-red-900 flex-shrink-0">
                      <DeleteIncome record={record} />
                    </button>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto">
                  <p className="text-sm font-medium text-green-600">
                    {record.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default IncomeHistory;
