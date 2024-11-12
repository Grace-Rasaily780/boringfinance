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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { register } from "@/actions/auth";
import useStatusStore from "@/store/useStatusStore";

function Register() {
  const { authStatus } = useStatusStore((store) => store);

  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is empty" }),
    lastName: z.string().min(1, { message: "Second Name is empty" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password field is empty" }),
    confirmPassword:  z.string().min(1, { message: "Password field is empty" }),
    currency: z.string().min(3, { message: "Select a currency" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      currency: "",
    },
  });
  const currencies = CODES;

  const [open, setOpen] = useState(false);
  const [confrimPasswordCheck, setConfirmPasswordCheck] = useState<null | string>(null);

  function submit(values: z.infer<typeof formSchema>) {
    if(values.password === values.confirmPassword) {
    register({
      username: values.firstName + " "  + values.lastName,
      email: values.email,
      password: values.password,
      currency: values.currency,
    });
    } else {
      setConfirmPasswordCheck("Password don't match");
    }
  }
  return (
    <main className="auth_container">
      {authStatus.status == "AUTH_ERROR" ? (
        <Alert variant="destructive" className="mx-auto max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{authStatus.message}</AlertDescription>
        </Alert>
      ) : null}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <img src="/logo.svg" alt="" className="auth_logo" />
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type="text" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input type="text" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Currency</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[240px] justify-between"
                            >
                              {field.value
                                ? currencies.find(
                                    (currency) => currency === field.value,
                                  )
                                : "Select Currency Code..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search currency..." />
                              <CommandList>
                                <CommandEmpty>No Currency found.</CommandEmpty>
                                <CommandGroup>
                                  {currencies.map((currency) => (
                                    <CommandItem
                                      key={currency}
                                      value={currency}
                                      onSelect={(currentValue) => {
                                        form.setValue(
                                          "currency",
                                          currentValue === field.value
                                            ? ""
                                            : currentValue,
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === currency
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {currency}:{" "}
                                      {Currencies.names.get(currency)}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                      {confrimPasswordCheck !== null ? (
                        <FormMessage>{confrimPasswordCheck}</FormMessage>
                      ): (null)}
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={authStatus.status == "PENDING" ? true : false}
              >
                Create an account
              </Button>
            </form>
          </Form>
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
