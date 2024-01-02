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
          `px-4 py-2 hover:bg-[#ff0000] hover:text-black hover:font-bold ${plusStyle}`,
          isActive
            ? ` bg-[#ff0000] text-black font-bold`
            : `bg-amber-300 text-gray-400 font-bold`,
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
