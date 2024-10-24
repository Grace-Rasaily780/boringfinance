import { useEffect } from "react";
import "./MainMethodContainer.css";
import ResizeableContainer from "./resizeableContainer/ResizeableContainer";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import { fetchGroups } from "@/actions/group";
import { group } from "@/store";
import useStatusStore from "@/store/useStatusStore";
import { Skeleton } from "@/components/ui/skeleton";

function MainMethodContainer() {
  const containers = useStore((state) => state.groups);
  const groupStatus = useStatusStore((state) => state.groupStatus);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchGroups(user._id);
  }, [user._id]);
  return (
    <div className="main_method_container">
      {groupStatus.status == "PENDING" ? (
        <div className="flex items-center gap-4">
          <Skeleton className="h-36 w-[400px]" />
          <Skeleton className="h-36 w-[400px]" />
          <Skeleton className="h-36 w-[400px]" />
        </div>
      ) : null}

      {groupStatus.status == "SUCCESS"
        ? containers.map((container: group) => (
            <ResizeableContainer key={container.id} info={container} />
          ))
        : null}
    </div>
  );
}

export default MainMethodContainer;
