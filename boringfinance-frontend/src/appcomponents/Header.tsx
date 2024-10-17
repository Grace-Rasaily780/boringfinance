import "./Header.css";
import { Currencies } from "currencies-map";
import useUserStore from "@/store/useUserStore";
import AvatarBtn from "@/appcomponents/AvatarBtn";

function Header() {
  const { user, logout } = useUserStore((state) => state);
  return (
    <div className="header">
      <div>
        <img src="/logo.svg" alt="" />
      </div>
      <div className="avatar_container">
        <div className="currency_container">
          <span>CURRENCY:</span>
          <span>{Currencies.symbols.get(user.currency)}</span>
        </div>
        <AvatarBtn />
      </div>
    </div>
  );
}

export default Header;
