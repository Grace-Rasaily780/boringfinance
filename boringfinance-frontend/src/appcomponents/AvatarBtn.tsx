import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/useUserStore";
import { logout } from "@/actions/auth";

function AvatarBtn() {
  const { user } = useUserStore((state) => state);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${user?.username.split(" ")[0]}+${user?.username.split(" ")[1]}&background=000&color=fff`}
            />
          </Avatar>
          {/* <CircleUser className="h-5 w-5" /> */}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <Link to="/income">
          <DropdownMenuItem>Income History</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarBtn;
