import { useState, ChangeEvent } from "react";
import "./Login.css";
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
import { login } from "@/actions/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidate, setEmailValidate] = useState<null | boolean | string>(
    null,
  );
  const [passwordValidate, setPasswordValidate] = useState<
    null | boolean | string
  >(null);
  const [status, setStatus] = useState("clean");

  function submit() {
    if (status == "error") {
      setEmailValidate(null);
      setPasswordValidate(null);
    }

    if (email.length == 0) {
      setEmailValidate("This field is required");
      setStatus("error");
    } else if (!email.includes("@") || !email.includes(".com")) {
      setEmailValidate("Please enter a valid email address");
      setStatus("error");
    }

    if (password.length == 0) {
      setPasswordValidate("This field is required");
      setStatus("error");
    }

    if (status == "pending" || status == "clean") {
      login({ email, password });
    }
  }
  return (
    <main className="auth_container">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <img src="/logo.svg" alt="" className="auth_logo" />
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="example@example.com"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
              {emailValidate ? (
                <Label className="text-red-500">{emailValidate}</Label>
              ) : null}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              {passwordValidate ? (
                <Label className="text-red-500">{passwordValidate}</Label>
              ) : null}
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                submit();
              }}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;
