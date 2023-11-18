import React from "react";
import HeaderLink from "./HeaderLink";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <div className="p-10 md:flex">
        <div className="md:flex-1 flex">
          <div className="w-9">
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/conan.png`} alt="X" />
            </Link>
          </div>
          <div className="md:flex md:flex-row">
            <div>
              <p className="text-2xl">名探偵コナン DB</p>
            </div>
            <div className="px-1 flex flex-col-reverse">
              <p className="text-sm">漫画の登場シーンを検索</p>
            </div>
          </div>
        </div>
        <div className="md:flex-1"></div>
      </div>
      <HeaderLink />
    </div>
  );
};

export default Header;
