import React, { useState } from "react";

const AccordionList = ({
  index,
  label,
  children,
  className = "",
  initOpen = false,
}) => {
  const [open, setOpen] = useState(initOpen);

  const toggleAccordion = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li key={index} className={className}>
      <span
        className="py-2 w-[100%] flex justify-between
            hover:underline"
        onClick={() => toggleAccordion()}
      >
        <span className="pl-2 inline-block">{label}</span>
        <span className="pr-8 inline-block text-xl">{open ? "▲" : "▼"}</span>
      </span>
      {open && <React.Fragment>{children}</React.Fragment>}
    </li>
  );
};

export default AccordionList;
