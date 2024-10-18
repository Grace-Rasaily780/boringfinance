import { useState } from "react";
import "./ResizeableContainer.css";
import { Maximize2, Minimize2 } from "lucide-react";
import useUserStore from "@/store/useUserStore";
import { updateSize } from "@/actions/group";
import { group } from "@/store";

function ResizeableContainer({ info }: { info: group }) {
  const { label, percentage } = info;
  const [size, setSize] = useState(info.size);
  const { user } = useUserStore((state) => state);

  function numFormatter(num: number) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  }

  function resize(localSize: string) {
    setSize(localSize);
    updateSize(user._id, { ...info, size: localSize });
  }
  return (
    <div
      className="group_container"
      style={{
        width: `${size == "MAX" ? 100 : 47.2}` + "%",
      }}
    >
      <div className="group_left">
        <span className="group_currency">{user.currency}</span>
        <span className="group_amount">{numFormatter(info.amount)}</span>
      </div>
      <div className="group_right">
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
        <div className="group_info">
          <span className="group_percentage">{percentage}%</span>
          <span className="group_label">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default ResizeableContainer;
