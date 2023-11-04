import { Link } from "react-router-dom";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-emerald-500 py-4 text-xl flex justify-around">
      <Link className="bg-emerald-100 px-4 py-2 rounded-md font-bold" to="/">
        ホーム
      </Link>
      <Link
        className="bg-emerald-100 px-4 py-2 rounded-md font-bold"
        to="/search"
      >
        検索
      </Link>
      <Link
        className="bg-emerald-100 px-4 py-2 rounded-md font-bold"
        to="/register"
      >
        登録
      </Link>
    </div>
  );
};

export default Header;
