import React from "react";
import HeaderLink from "./HeaderLink";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <div className="p-4 md:flex">
        <div className="md:flex-1 flex">
          <div className="w-9">
            {/* 画像サイズをアプリ名の文字サイズに合わせるようにしたい。 */}
            <Link to="/">
              {/* <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="X" /> */}
              <img src={`${process.env.PUBLIC_URL}/conan.png`} alt="X" />
            </Link>
          </div>
          <div className="md:flex md:flex-row md:flex-1">
            <div className="flex-1">
              <p className="text-2xl">名探偵コナン DB</p>
            </div>
            <div className="flex-1 px-1 flex flex-col-reverse">
              <p className="text-sm md:text-left">漫画の登場シーンを検索</p>
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
