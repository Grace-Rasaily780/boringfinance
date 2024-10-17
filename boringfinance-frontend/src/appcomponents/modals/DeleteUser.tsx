import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import useUserStore from "@/store/useUserStore";
import { deleteUser } from "@/actions/auth";

function DeleteUser() {
  const { user } = useUserStore((state) => state);
  const [password, setPassword] = useState("");

  const [passwordValidate, setPasswordValidate] = useState<
    null | boolean | string
  >(null);
  const [status, setStatus] = useState("clean");

  function submit() {
    if (status == "error") {
      setPasswordValidate(null);
    }

    if (password.length == 0) {
      setPasswordValidate("This field is required");
      setStatus("error");
    }

    if (status == "pending" || status == "clean") {
      deleteUser({ _id: user._id, email: user.email, password });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </Link> */}
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {passwordValidate ? (
              <Label className="text-red-500">{passwordValidate}</Label>
            ) : null}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              submit();
            }}
          >
            REMOVE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUser;
