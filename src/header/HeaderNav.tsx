import React from "react";
import LinkButton from "LinkButton";

const HeaderNav: React.FC = () => {
  return (
    <div className="bg-emerald-500 text-xl flex sticky top-0 z-20">
      <LinkButton
        to="/"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        ホーム
      </LinkButton>
      <LinkButton
        to="/search"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        検索
      </LinkButton>
      <LinkButton
        to="/register"
        plusStyle="hover:bg-emerald-100 flex-1 outline outline-1"
      >
        登録
      </LinkButton>
    </div>
  );
};

export default HeaderNav;
