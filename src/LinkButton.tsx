import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
  plusStyle?: string;
};

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  const { to, children, plusStyle = "???" } = props;
  return (
    <Link className={`px-4 py-2 rounded-md font-bold ${plusStyle}`} to={to}>
      {children}
    </Link>
  );
};

export default LinkButton;
