import { useId } from "react";

type SelectFieldProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
};

export default function SelectField({
  label,
  name,
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  className = "",
  icon,
  options,
}: SelectFieldProps) {
  const uid = useId();
  const selectId = `select-${name}-${uid}`.replace(/:/g, "");

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {/* LABEL */}
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-white/70"
        >
          {label}
        </label>
      )}

      {/* SELECT WRAPPER */}
      <div className="relative">
        {/* ICON */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-10">
            {icon}
          </div>
        )}

        {/* SELECT */}
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "w-full rounded-xl px-4 py-3 sm:py-3.5",
            "text-[15px] sm:text-base text-white",
            
            "bg-transparent",

            "border border-white/10",
            "transition-all duration-200",

            "hover:border-white/20",

            "focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20",

            "disabled:opacity-40 disabled:cursor-not-allowed",

            "appearance-none cursor-pointer",

            icon ? "pl-11 pr-10" : "pr-10",
          ].join(" ")}
        >
          <option value="" className="bg-gray-900 text-white/70">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-gray-900 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
          <svg 
            className="h-4 w-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}