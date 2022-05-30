import React, { useState } from "react";
import style from "./input.module.css";

interface InputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  register?: any;
}

export const Input = ({
  defaultValue = "",
  placeholder = "",
  className,
  errorMessage,
  onChange,
  type = 'text',
  error,
  register
}: InputProps) => {

  return (
    <>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        className={`${style.input} border-2 border-solid border-dark rounded-none w-full h-12 pl-6 ${className}`}
        {...register}
      />
      {error && (
        <p className="w-full text-sm text-error mt-1">
          {error[`${error.errors?.type}Error`]}
        </p>
      )}
    </>
  );
}
