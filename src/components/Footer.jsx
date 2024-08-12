import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4 bg-gray-100 w-full border-t-2">
      <FontAwesomeIcon icon={faCopyright} /> All Rights reserved to{" "}
      <a href="mailto:adityarastogi1801@gmail.com">
        adityarastogi1801@gmail.com
      </a>
    </footer>
  );
};

export default Footer;
