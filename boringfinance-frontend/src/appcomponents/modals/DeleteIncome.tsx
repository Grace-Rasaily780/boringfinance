import { calibrateDeleteIncome } from "@/actions/calibrate/calibrateBalance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Record } from "@/store/useIncomeStore";
import useStatusStore from "@/store/useStatusStore";
import { Trash2 } from "lucide-react";

export function DeleteIncome({ record }: { record: Record }) {
  const { activityDeleteStatus, setActivityDeleteStatus } = useStatusStore(
    (state) => state,
  );
  function del() {
    calibrateDeleteIncome(record);
  }
  return (
    <AlertDialog
      open={activityDeleteStatus.status == "SUCCESS" ? false : undefined}
    >
      <AlertDialogTrigger asChild>
        <Trash2
          onClick={() => {
            setActivityDeleteStatus({ status: "INIT", message: "Open" });
          }}
          className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete your transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              del();
            }}
            disabled={activityDeleteStatus.status == "PENDING" ? true : false}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
