import "./Header.css";
import { Currencies } from "currencies-map";
import useUserStore from "@/store/useUserStore";
import AvatarBtn from "@/appcomponents/AvatarBtn";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useUserStore((state) => state);
  return (
    <div className="header">
      <div>
        <Link to="/">
          <img src="/logo.svg" alt="" />
        </Link>
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
