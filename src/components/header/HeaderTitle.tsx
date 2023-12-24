import React from "react";
import { Link } from "react-router-dom";

const HeaderTitle: React.FC = () => {
  return (
    <div className="bg-slate-100">
      <div className="p-10 md:flex">
        <div className="md:flex-grow md:flex md:mb-0 mb-4">
          <div className="md:flex md:flex-row">
            <div>
              <div className="w-9 inline-block">
                <Link to="/">
                  <img src={`${process.env.PUBLIC_URL}/conan.png`} alt="X" />
                </Link>
              </div>
              <span className="text-2xl">名探偵コナン DB</span>
            </div>
            <div className="px-1 md:flex md:flex-col-reverse">
              <p className="text-sm">漫画の登場シーンを検索</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;
