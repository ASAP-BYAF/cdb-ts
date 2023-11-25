import React from "react";
import LinkButton from "button/LinkButton";

const Footer = (): JSX.Element => {
  return (
    <div className="bg-emerald-100 p-4 text-xl flex gap-x-4 overflow-auto whitespace-nowrap">
      <LinkButton
        to="https://github.com/ASAP-BYAF"
        plusStyle="bg-emerald-500"
        target="_blank"
      >
        github
      </LinkButton>
      <LinkButton
        to="https://comp.chem.tohoku.ac.jp/ComplexRI/"
        plusStyle="bg-emerald-500"
        target="_blank"
      >
        ComplexRI
      </LinkButton>
      <LinkButton
        to="https://snippet.hopto.org/snippet/snippet/"
        plusStyle="bg-emerald-500"
        target="_blank"
      >
        SnippetApp
      </LinkButton>
    </div>
  );
};

export default Footer;
