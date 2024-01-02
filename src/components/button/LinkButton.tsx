import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
  plusStyle?: string;
  target?: string;
};

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  const { to, children, plusStyle = "???", target = "" } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        [
          `px-4 py-2 hover:bg-[#9C27B0] hover:text-white hover:font-bold ${plusStyle}`,
          isActive ? ` bg-[#9C27B0] text-white font-bold` : ``,
        ].join(" ")
      }
      to={to}
      target={target}
    >
      {children}
    </NavLink>
  );
};

export default LinkButton;
