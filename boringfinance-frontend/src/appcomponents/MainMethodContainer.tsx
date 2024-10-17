import { useEffect } from "react";
import "./MainMethodContainer.css";
import ResizeableContainer from "./resizeableContainer/ResizeableContainer";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import { fetchGroups } from "@/actions/group";

function MainMethodContainer() {
  const containers = useStore((state) => state.groups);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    fetchGroups(user._id);
  }, []);
  return (
    <div className="main_method_container">
      {containers.map((container: Array<object>) => (
        <ResizeableContainer key={container.id} info={container} />
      ))}
    </div>
  );
}

export default MainMethodContainer;
