import { ChangeEvent } from "react";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import useStore from "@/store";
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
// import { calibrateEditTransaction } from "@/actions/calibrate";
import { Record } from "@/store/useIncomeStore";
import { calibrateEditIncome } from "@/actions/calibrate/calibrateBalance";

function EditIncome({ record }: { record: Record }) {
  const { activityEditStatus, setActivityEditStatus } = useStatusStore(
    (state) => state,
  );
  const { user } = useUserStore((state) => state);

  const formSchema = z.object({
    _id: z.string(),
    amount: z.number({ message: "Amount is empty" }),
    source: z.string().min(1, { message: "Source is empty" }),
    date: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    }),
    user: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: record._id,
      amount: record.amount,
      source: record.source,
      date: new Date(record.date),
      user: user?._id,
    },
  });

  function edit(values: z.infer<typeof formSchema>) {
    calibrateEditIncome(values, record);
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
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
                    name="source"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Source</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <Button type="submit">EDIT</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditIncome;
