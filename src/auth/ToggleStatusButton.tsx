import React from "react";
import LinkButton from "button/LinkButton";

export type ToggleStatusButtonProps = { link: string; label: string };

const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = (props) => {
  const { link, label } = props;
  return (
    <LinkButton to={link} plusStyle="hover:bg-emerald-100 outline outline-1">
      {label}
    </LinkButton>
  );
};

export default ToggleStatusButton;
