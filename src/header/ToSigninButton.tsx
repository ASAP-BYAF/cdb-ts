import React from "react";
import LinkButton from "LinkButton";

const ToSigninButton: React.FC = () => {
  return (
    <LinkButton to="/signin" plusStyle="hover:bg-emerald-100 outline outline-1">
      サインイン
    </LinkButton>
  );
};

export default ToSigninButton;
