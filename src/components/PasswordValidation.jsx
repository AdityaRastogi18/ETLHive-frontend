import React from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordValidation = ({ validationRules }) => {
  return (
    <div className="mb-4 w-full">
      <h3 className="text-sm font-bold mb-2">Password must include:</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm">
        {Object.entries(validationRules).map(([rule, isValid]) => (
          <li
            key={rule}
            className={isValid ? "text-green-600" : "text-red-600"}
          >
            <FontAwesomeIcon icon={isValid ? faCheck : faTimes} /> {rule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordValidation;
