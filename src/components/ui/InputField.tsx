import { useId } from "react";

type InputFieldProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  icon?: React.ReactNode;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  autoComplete,
  className = "",
  icon,
}: InputFieldProps) {
  const uid = useId();
  const inputId = `input-${name}-${uid}`.replace(/:/g, "");

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-white/70"
        >
          {label}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className={[
            "w-full rounded-xl px-4 py-3 sm:py-3.5",
            "text-[15px] sm:text-base text-white",
            "placeholder:text-white/40",

            "bg-transparent",

            "border border-white/10",
            "transition-all duration-200",

            "hover:border-white/20",

            "focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20",

            "disabled:opacity-40 disabled:cursor-not-allowed",

            icon ? "pl-11" : "",
          ].join(" ")}
        />
      </div>
    </div>
  );
}