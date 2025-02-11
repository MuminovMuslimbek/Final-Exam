import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Dark from "../assets/Dark.svg";
import Light from "../assets/Light.svg";
import User from "../assets/user.svg";
import useThemeStore from "../store/themeUseStore";

function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="top-0 left-0 fixed lg:fixed flex lg:flex-col justify-between lg:justify-between items-center bg-[#373B53] dark:bg-[#1E2139] lg:rounded-r-[20px] w-full lg:w-auto lg:h-screen">

      <Link to="/">
        <img src={Logo} alt="Logo" className="w-[72px] md:w-[80px] lg:w-[103px] h-[72px] md:h-[80px] lg:h-[103px]" />
      </Link>

      <div className="flex lg:flex-col items-center gap-4 md:gap-6 w-full max-w-[130px]">
        <img
          onClick={toggleTheme}
          className="w-5 md:w-6 h-5 md:h-6 cursor-pointer"
          src={theme === "light" ? Dark : Light}
          alt="Theme Toggle"
        />
        <button className="px-4 py-3 border-[#494E6E] lg:border-t-[1.5px] border-l-[1.5px] lg:border-l-0 w-full text-center">
          <img className="mx-auto w-8 md:w-10 h-8 md:h-10" src={User} alt="User" />
        </button>
      </div>
    </header>
  );
}

export default Header;