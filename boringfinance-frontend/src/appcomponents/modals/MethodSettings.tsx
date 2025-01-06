import { useState, useEffect, ChangeEvent } from "react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AddGroup from "./AddGroup";
import useStore, { group } from "@/store";
import useUserStore from "@/store/useUserStore";
import { fetchGroups } from "@/actions/group";
import { calibrateChangePercentageAmount } from "@/actions/calibrate/calibrate";
import { Trash2 } from "lucide-react";

function MethodSettings() {
  const [alertStatus, setAlertStatus] = useState(false);
  const [dialogBox, setDialogBox] = useState(false);
  const methodSettings = useStore((state) => state.groups);
  const { user } = useUserStore((state) => state);
  const [localSettings, setLocalSettings] = useState<group[]>([]);

  function totalPercentage() {
    let sum = 0;

    localSettings.map((group: group): void => {
      sum += group.percentage;
    });

    return sum;
  }

  function handlePercentageChange(index: number, value: string) {
    const newSettings: group[] = [...localSettings];
    newSettings[index] = {
      ...newSettings[index],
      percentage: parseInt(value) || 0,
    };
    setLocalSettings(newSettings);
  }

  function handleDeleteGroup(id: string) {
    const filtered = localSettings.filter((local: group) => local.id !== id);
    setLocalSettings(filtered);
  }

  function updateMethod() {
    if (totalPercentage() > 100) {
      setAlertStatus(true);
    } else {
      calibrateChangePercentageAmount(localSettings);
      setDialogBox(false);
    }
  }

  useEffect(() => {
    fetchGroups(user?._id);
  }, [user?._id]);

  useEffect(() => {
    setLocalSettings(methodSettings);
  }, [methodSettings]);
  return (
    <div>
      <AlertDialog open={alertStatus}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Oopies!!</AlertDialogTitle>
            <AlertDialogDescription>
              Total Percentage doesn't add upto 100%.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setAlertStatus(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        <DialogTrigger asChild>
          <Settings className="setting_btn" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>50/30/20 RULE</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {localSettings.map((group, index) => (
              <div
                className="grid grid-cols-4 items-center gap-4"
                key={group.id}
              >
                <Label htmlFor={group.label} className="text-right">
                  {group.label}
                </Label>
                <Input
                  id={group.label}
                  defaultValue={group.percentage}
                  className="col-span-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handlePercentageChange(index, e.target.value);
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    handleDeleteGroup(group.id);
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span>
                  {100 - totalPercentage() !== 0
                    ? `Empty Percentage ${100 - totalPercentage()}`
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <AddGroup
                  localSettings={localSettings}
                  setLocalSettings={setLocalSettings}
                />
                <Button
                  type="submit"
                  onClick={() => {
                    updateMethod();
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MethodSettings;
