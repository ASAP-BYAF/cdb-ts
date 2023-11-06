import React from "react";
import LinkButton from "./LinkButton";

const Footer: React.FC = () => {
  return (
    <div className="bg-emerald-100 p-4 text-xl flex gap-x-4 overflow-auto whitespace-nowrap">
      <LinkButton to="https://github.com/ASAP-BYAF" plusStyle="bg-emerald-500">
        github
      </LinkButton>
      <LinkButton
        to="https://comp.chem.tohoku.ac.jp/ComplexRI/"
        plusStyle="bg-emerald-500"
      >
        ComplexRI
      </LinkButton>
    </div>
  );
};

export default Footer;
