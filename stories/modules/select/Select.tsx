import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface SelectProps {
  className?: string;
  onChange: any[];
}

/**
 * Primary UI component for user interaction
 */
export const Select = ({ className, onChange }: SelectProps) => {
  const [selectedOption, setSelectdOption] = useState()

  return (
    <div className={`relative ${className}`}>
      <select
        onChange={e => onChange(e.target.value)}
        className="w-full md:w-[156px] py-2.5 px-4 border-2 border-solid border-dark appearance-none">
        <option value="asc">最新貼文</option>
        <option value="desc">舊到新貼文</option>
      </select>
      <DownOutlined className="absolute top-1/3 right-3" />
    </div>
  );
}

