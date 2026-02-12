import Cart from "./Cart";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  return (
    <header className="container mx-auto p-8 flex items-center justify-between bg-white sticky top-0 left-0 z-10 shadow mb-4 rounded-b-md">
      <div className="flex items-center gap-4 mx-auto">
        <a href="https://bts.com">
          <img src="/bts-logo.svg" alt="" className="w-24" />
        </a>
        <IoCloseSharp size={24} />
        <a href="https://oneworldrental.co.uk">
          <img src="/owr-logo.svg" alt="" className="w-52" />
        </a>
      </div>

      <Cart />
    </header>
  );
};

export default Header;
