import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ label, placeholder, value, name, onChange, font, type }) => {
  const [passToggle, setPassToggle] = useState(false);

  const toggleBtn = () => {
    setPassToggle((prevState) => !prevState);
  };
  return (
    <div>
      <label className="my-5">{label}</label>
      <div className="relative">
        <input
          className="d-flex border p-2 w-full rounded-md focus:outline-none focus:border-[#353bc1] my-4 "
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          type={name === 'password'?passToggle ? "text" : "password":'text'}
        ></input>

        {name === "password" ? (
          <span
            onClick={toggleBtn}
            className="absolute right-2 bottom-6 text-[#353bc1] "
          >
            {passToggle ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        ) : (
          <span className="absolute right-2 bottom-6 text-[#353bc1] ">
            <FontAwesomeIcon icon={font} />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
