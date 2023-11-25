import React from "react";
import { Link } from "react-router-dom";
import ToggleStatusButtonGroup from "auth/ToggleStatusButtonGroup";

const HeaderTitle: React.FC = () => {
  return (
    <div className="bg-slate-100">
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
        <div className="flex justify-center md:flex-1 md:justify-end">
          <ToggleStatusButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;
