import { create } from "zustand";

interface Status {
  status: string;
  message: string;
}
export interface StatusState {
  authStatus: Status;
  activityStatus: Status;
  activityPostStatus: Status;
  activityEditStatus: Status;
  activityDeleteStatus: Status;
  amountStatus: Status;
  groupStatus: Status;
  setActivityStatus: (status: Status) => void;
  setActivityPostStatus: (status: Status) => void;
  setActivityEditStatus: (status: Status) => void;
  setActivityDeleteStatus: (status: Status) => void;
  setAuthStatus: (status: Status) => void;
  setAmountStatus: (status: Status) => void;
  setGroupStatus: (status: Status) => void;
}

const useStatusStore = create<StatusState>((set) => ({
  authStatus: { status: "INIT", message: "clean" },
  activityStatus: { status: "INIT", message: "clean" },
  activityPostStatus: { status: "INIT", message: "clean" },
  amountStatus: { status: "INIT", message: "clean" },
  groupStatus: { status: "INIT", message: "clean" },
  activityEditStatus: { status: "INIT", message: "clean" },
  activityDeleteStatus: { status: "INIT", message: "clean" },
  setActivityStatus: (status: Status) => set({ activityStatus: status }),
  setActivityPostStatus: (status: Status) =>
    set({ activityPostStatus: status }),
  setActivityEditStatus: (status: Status) =>
    set({ activityEditStatus: status }),
  setActivityDeleteStatus: (status: Status) =>
    set({ activityDeleteStatus: status }),
  setAuthStatus: (status: Status) => set({ authStatus: status }),
  setAmountStatus: (status: Status) => set({ amountStatus: status }),
  setGroupStatus: (status: Status) => set({ groupStatus: status }),
}));

export default useStatusStore;
