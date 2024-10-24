import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import "./AddGroup.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import useStore, { group } from "@/store";
import { v4 as uuidv4 } from "uuid";

function AddGroup({
  localSettings,
  setLocalSettings,
}: {
  localSettings: group[];
  setLocalSettings: any;
}) {
  const [label, setLabel] = useState("");
  const [percentage, setPercentage] = useState(0);
  const setMethodSettings = useStore((state) => state.addGroup);
  const incomeAmount = useStore((state) => state.incomeAmount);

  function add() {
    const newGroup: group = {
      id: uuidv4(),
      label: label.toUpperCase(),
      amount: incomeAmount * (percentage / 100),
      percentage: percentage,
      size: "MIN",
    };
    setMethodSettings(newGroup);
    setLocalSettings([...localSettings, newGroup]);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full p-2 add_group_btn">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ADD GROUP</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              className="col-span-3"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLabel(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="percentage" className="text-right">
              Percentage
            </Label>
            <Input
              className="col-span-3"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPercentage(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              add();
            }}
          >
            ADD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddGroup;
