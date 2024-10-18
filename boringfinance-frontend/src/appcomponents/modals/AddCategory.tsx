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
import useStore from "@/store";

function AddCategory() {
  const [label, setLabel] = useState("");
  const addCategory = useStore((state) => state.addCategory);

  function add() {
    addCategory({
      label: label.toUpperCase(),
    });
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
          <DialogTitle>ADD CATEGORY</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLabel(e.target.value);
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

export default AddCategory;
