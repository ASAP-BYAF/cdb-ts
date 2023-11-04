import { Link } from "react-router-dom";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-emerald-100 py-4 text-xl flex px-4">
      <Link
        className="bg-emerald-500 px-4 py-2 rounded-md font-bold"
        to="https://github.com/ASAP-BYAF"
      >
        github
      </Link>
    </div>
  );
};

export default Footer;
