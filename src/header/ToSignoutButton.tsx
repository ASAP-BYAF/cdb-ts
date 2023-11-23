import React from "react";
import LinkButton from "LinkButton";

const ToSignoutButton: React.FC = () => {
  return (
    <LinkButton
      to="/signout"
      plusStyle="hover:bg-emerald-100 outline outline-1"
    >
      サインアウト
    </LinkButton>
  );
};

export default ToSignoutButton;
