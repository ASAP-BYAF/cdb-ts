import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
  plusStyle?: string;
  target?: string;
};

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  const { to, children, plusStyle = "???", target = "" } = props;
  return (
    <Link
      className={`px-4 py-2 font-bold ${plusStyle}`}
      to={to}
      // target="_blank"
      target={target}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
