import { useMemo, useState } from "react";
import "./ResizeableContainer.css";
import { Maximize2, Minimize2 } from "lucide-react";
import useUserStore from "@/store/useUserStore";
import { updateSize } from "@/actions/group";
import useStore, { group } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getExpectedBudget } from "@/utils/get-expected-budgets";

function ResizeableContainer({ info }: { info: group }) {
  const { label, percentage } = info;
  const [size, setSize] = useState(info.size);
  const { user } = useUserStore((state) => state);

  const { currentAmount: total } = useStore((state) => state);

  function numFormatter(num: number) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }

  function resize(localSize: string) {
    setSize(localSize);
    updateSize(user?._id, { ...info, size: localSize });
  }

  const { expectedAmount, currentPercentage } = useMemo(() => {
    const { expectedAmount, currentPercentage } = getExpectedBudget(
      total,
      info.amount,
      info.percentage,
    );
    return { expectedAmount, currentPercentage };
  }, [info.amount, info.percentage, total]);

  return (
    <div
      className="group_container"
      style={{
        width: `${size == "MAX" ? 100 : 47.2}` + "%",
      }}
    >
      <Card className="overflow-hidden w-full transition-all hover:shadow-lg">
        <CardHeader
          className={cn(
            "flex flex-row  dark:bg-blue-900 justify-between",
            label === "NEEDS"
              ? "bg-blue-100"
              : label === "WANTS"
                ? "bg-red-100"
                : label === "SAVING"
                  ? "bg-green-100"
                  : "bg-gray-100",
          )}
        >
          <CardTitle className="text-lg font-semibold">
            {label} ({percentage}%)
          </CardTitle>
          <div>
            {size == "MAX" ? (
              <div
                className="resize"
                onClick={() => {
                  resize("MIN");
                }}
              >
                <Minimize2 />
              </div>
            ) : (
              <div
                className="resize"
                onClick={() => {
                  resize("MAX");
                }}
              >
                <Maximize2 />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-xl sm:text-2xl font-bold">
            {user?.currency} {numFormatter(info.amount)}
          </div>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 break-words ">
            {user?.currency} {info.amount} of {user?.currency} {expectedAmount}{" "}
            left ( {currentPercentage}% ){" "}
          </p>
        </CardContent>
      </Card>
      {/*
      <div className="group_left">
        <span className="group_currency">{user.currency}</span>
        <span className="group_amount">{numFormatter(info.amount)}</span>
      </div>
      <div className="group_right">

        <div className="group_info">
          <span className="group_percentage">{percentage}%</span>
          <span className="group_label">{label}</span>
        </div>
      </div>
      */}
    </div>
  );
}

export default ResizeableContainer;
