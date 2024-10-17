import { useState } from "react";
import "./Register.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { CODES, Currencies } from "currencies-map";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { register } from "@/actions/auth";

function Register() {
  const currencies = CODES;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameValidate, setFirstNameValidate] = useState<null | boolean>(
    null,
  );
  const [lastNameValidate, setLastNameValidate] = useState<null | boolean>(
    null,
  );
  const [emailValidate, setEmailValidate] = useState<null | boolean | string>(
    null,
  );
  const [currencyValidate, setCurrencyValidate] = useState<null | boolean>(
    null,
  );
  const [passwordValidate, setPasswordValidate] = useState<null | boolean>(
    null,
  );

  const [status, setStatus] = useState("clean");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function submit() {
    if (status == "error") {
      setFirstNameValidate(null);
      setLastNameValidate(null);
      setEmailValidate(null);
      setCurrencyValidate(null);
      setStatus("pending");
    }

    if (firstName.length == 0) {
      setFirstNameValidate(false);
      setStatus("error");
    }

    if (lastName.length == 0) {
      setLastNameValidate(false);
      setStatus("error");
    }

    if (email.length == 0) {
      setEmailValidate("This field is required");
      setStatus("error");
    } else if (!email.includes("@") || !email.includes(".com")) {
      setEmailValidate("Please enter a valid email address");
      setStatus("error");
    }

    if (value.length == 0) {
      setCurrencyValidate(false);
      setStatus("error");
    }

    if (password.length == 0) {
      setPasswordValidate(false);
      setStatus("error");
    }

    if (status == "pending" || status == "clean") {
      register({
        username: firstName + " " + lastName,
        email,
        currency: value,
        password,
      });
    }
  }
  return (
    <main className="auth_container">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <img src="/logo.svg" alt="" className="auth_logo" />
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {firstNameValidate === false ? (
                  <Label className="text-red-500">This field is required</Label>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {lastNameValidate === false ? (
                  <Label className="text-red-500">This field is required</Label>
                ) : null}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {emailValidate ? (
                <Label className="text-red-500">{emailValidate}</Label>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Default Currency</Label>
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
              {currencyValidate === false ? (
                <Label className="text-red-500">This field is required</Label>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {passwordValidate === false ? (
                <Label className="text-red-500">This field is required</Label>
              ) : null}
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                submit();
              }}
            >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Register;
