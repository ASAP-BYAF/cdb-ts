import React from "react";
import LinkButton from "components/button/LinkButton";

const Footer = (): JSX.Element => {
  return (
    <div className="bg-[#1f4a87] p-4 flex gap-x-4 overflow-auto whitespace-nowrap">
      <LinkButton
        to="https://github.com/ASAP-BYAF"
        plusStyle="rounded-md"
        target="_blank"
      >
        github
      </LinkButton>
      <LinkButton
        to="https://comp.chem.tohoku.ac.jp/ComplexRI/"
        plusStyle="rounded-md"
        target="_blank"
      >
        ComplexRI
      </LinkButton>
      <LinkButton
        to="https://snippet.hopto.org/snippet/snippet/"
        plusStyle="rounded-md"
        target="_blank"
      >
        SnippetApp
      </LinkButton>
    </div>
  );
};

export default Footer;
