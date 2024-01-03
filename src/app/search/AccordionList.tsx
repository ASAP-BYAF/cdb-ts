import React, { useEffect, useState } from "react";

type AccordionProps = {
  index: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  initOpen?: boolean;
};
const AccordionList = (props: AccordionProps): JSX.Element => {
  const { index, label, children, className = "", initOpen = false } = props;
  const [open, setOpen] = useState<boolean>();

  const toggleAccordion = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => setOpen(initOpen), [initOpen]);

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
      {open && <>{children}</>}
    </li>
  );
};

export default AccordionList;
