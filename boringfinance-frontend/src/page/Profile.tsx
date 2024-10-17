import { useState } from "react";
import "./Profile.css";
import AvatarBtn from "@/appcomponents/AvatarBtn";
import { Link } from "react-router-dom";

import { CODES, Currencies } from "currencies-map";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteUser from "@/appcomponents/modals/DeleteUser";
// import { updateCurrency } from "@/actions/auth";
import useUserStore from "@/store/useUserStore";

function Profile() {
  const { user } = useUserStore((state) => state);
  // const currencies = CODES;

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(user.currency);

  // function submitCurrency() {
  //   updateCurrency(value);
  // }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="" className="profile_logo" />
            </div>
          </Link>
        </nav>
        <div className="flex w-11 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <AvatarBtn />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-1 lg:grid-cols-1">
          <div className="grid gap-6">
            {/* <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Currency</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[240px] justify-between"
                    >
                      {value
                        ? currencies.find((currency) => currency === value)
                        : "Select Currency Code..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No Currency found.</CommandEmpty>
                        <CommandGroup>
                          {currencies.map((currency) => (
                            <CommandItem
                              key={currency}
                              value={currency}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue,
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === currency
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {currency}: {Currencies.names.get(currency)}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    submitCurrency();
                  }}
                >
                  Save
                </Button>
              </CardFooter>
            </Card> */}
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
              </CardHeader>
              <CardFooter className="border-t px-6 py-4">
                <DeleteUser />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
