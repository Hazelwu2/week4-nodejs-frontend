import React, { useState } from "react";
import style from "./input.module.css";

interface InputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  defaultValue = "",
  placeholder = "",
  className,
  errorMessage,
  onChange,
}: InputProps) => {

  return (
    <>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        type="text"
        className={`${style.input} border-2 border-solid border-dark rounded-none w-full h-12 pl-6 ${className}`}
      />
      {errorMessage && (
        <p className="w-full text-sm text-error mt-1">{errorMessage}</p>
      )}
    </>
  );
}
