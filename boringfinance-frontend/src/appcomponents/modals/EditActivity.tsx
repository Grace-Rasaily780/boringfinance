import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useStore, { hasId, localTransaction, transaction } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useUserStore from "@/store/useUserStore";
import useStatusStore from "@/store/useStatusStore";
import { calibrateEditTransaction } from "@/actions/calibrate";

function EditActivity({
  transaction,
}: {
  transaction: transaction | localTransaction;
}) {
  const { groups } = useStore((state) => state);
  const { activityEditStatus, setActivityEditStatus } = useStatusStore(
    (state) => state,
  );
  const { user } = useUserStore((state) => state);
  const [max, setMax] = useState(
    groups.filter((group) => group.label === transaction.group)[0].amount,
  );

  const formSchema = z.object({
    _id: z.string().optional(),
    amount: z.number({ message: "Amount is empty" }).gte(1),
    purpose: z.string().min(1, { message: "Purpose is empty" }),
    group: z.string({ message: "Group is empty" }),
    date: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    }),
    user_id: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: hasId(transaction) ? transaction._id : undefined,
      amount: transaction.amount,
      purpose: transaction.purpose,
      group: transaction.group,
      date: new Date(transaction.date),
      user_id: user._id,
    },
  });

  function edit(values: z.infer<typeof formSchema>) {
    calibrateEditTransaction(values, transaction);
  }
  return (
    <div>
      <Dialog open={activityEditStatus.status == "SUCCESS" ? false : undefined}>
        <DialogTrigger asChild>
          <Pencil
            onClick={() => {
              setActivityEditStatus({ status: "INIT", message: "Open" });
            }}
            className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600 dark:text-cyan-900"
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>EDIT TRANSACTION</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(edit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group</FormLabel>
                        <FormControl>
                          <Select
                            required
                            defaultValue={field.value}
                            onValueChange={(value) => {
                              setMax(
                                groups.filter(
                                  (group) => group.label === value,
                                )[0].amount,
                              );
                              form.setValue("group", value);
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={1}
                            max={max}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              form.setValue("amount", parseInt(e.target.value));
                            }}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Purpose</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(value) => {
                                  if (value) {
                                    form.setValue("date", value);
                                  }
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={
                    activityEditStatus.status == "PENDING" ? true : false
                  }
                >
                  EDIT
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditActivity;
