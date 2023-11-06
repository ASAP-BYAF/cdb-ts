import React from "react";
import LinkButton from "./LinkButton";

const Header: React.FC = () => {
  return (
    <div className="bg-emerald-500 py-4 text-xl flex justify-around">
      <LinkButton to="/" plusStyle="bg-emerald-100">
        ホーム
      </LinkButton>
      <LinkButton to="/search" plusStyle="bg-emerald-100">
        検索
      </LinkButton>
      <LinkButton to="/register" plusStyle="bg-emerald-100">
        登録
      </LinkButton>
    </div>
  );
};

export default Header;
