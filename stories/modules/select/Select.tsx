import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface SelectProps {
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({ className, defaultValue, onChange }: SelectProps) => {

  return (
    <div className={`relative mr-3 ${className}`}>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className="w-full md:w-[156px] py-2.5 px-4 border-2 border-solid border-dark appearance-none">
        <option value="desc">最新貼文</option>
        <option value="asc">舊到新貼文</option>
      </select>
      <DownOutlined className="absolute top-1/3 right-3" />
    </div>
  );
}

