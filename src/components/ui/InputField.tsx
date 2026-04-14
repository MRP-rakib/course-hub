import React from "react";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="w-full">
      
      {label && (
        <label className="block text-sm sm:text-base text-gray-600 font-medium">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full mt-1
          px-3 sm:px-4
          py-2 sm:py-3
          text-sm sm:text-base
          rounded-xl
          border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />
    </div>
  );
}