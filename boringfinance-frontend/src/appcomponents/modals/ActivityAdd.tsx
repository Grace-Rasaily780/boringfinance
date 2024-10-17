import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import "./ActivityAdd.css";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddCategory from "./AddCategory";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useStore from "@/store";
import useUserStore from "@/store/useUserStore";
import { calibrateTransaction } from "@/actions/calibrate";

function ActivityAdd() {
  const groups = useStore((state) => state.groups);
  // const categorys = useStore((state: object) => state.category);
  const { user } = useUserStore((state) => state);
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [group, setGroup] = useState("");
  // const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();

  function add() {
    const localTransaction = {
      amount: amount,
      purpose: purpose,
      group: group,
      // category: category,
      date: date,
      user_id: user._id,
    };

    calibrateTransaction(localTransaction);
  }
  return (
    <div className="activity_add_container">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full p-1 add_total_btn">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ADD TRANSACTION</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                className="col-span-3"
                onChange={(e) => {
                  setAmount(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purpose" className="text-right">
                Purpose
              </Label>
              <Input
                id="purpose"
                className="col-span-3"
                onChange={(e) => {
                  setPurpose(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Group
              </Label>

              <Select
                onValueChange={(value) => {
                  setGroup(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {groups.map((group, index) => (
                      <SelectItem key={index} value={group.label}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="grid grid-flow-col auto-cols-max gap-4 items-center">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) => {
                  setCategory(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categorys.map((ele, index) => (
                      <SelectItem key={index} value={ele.label}>
                        {ele.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <AddCategory
               />
            </div> */}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
    </div>
  );
}

export default ActivityAdd;
