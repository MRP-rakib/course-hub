import { useId } from "react";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "light" | "dark";
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  variant = "light",
  disabled = false,
  autoComplete,
  className = "",
}: InputFieldProps) {
  const uid = useId();
  const inputId = `input-${name}-${uid}`.replace(/:/g, "");

  const labelClass =
    variant === "dark"
      ? "mb-1.5 block text-sm font-medium tracking-tight text-white/55"
      : "mb-1.5 block text-sm font-medium tracking-tight text-zinc-600";

  const inputClass =
    variant === "dark"
      ? [
          "w-full rounded-xl px-4 py-2.5 sm:py-3",
          "text-[15px] sm:text-base leading-snug text-white",
          "placeholder:text-white/30",
          "border border-white/[0.1] bg-white/[0.03]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
          "transition-[border-color,box-shadow,background-color] duration-200",
          "hover:border-white/[0.14] hover:bg-white/[0.045]",
          "focus:border-violet-500/40 focus:bg-white/[0.05]",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-white/[0.1]",
        ].join(" ")
      : [
          "w-full rounded-xl px-4 py-2.5 sm:py-3",
          "text-[15px] sm:text-base leading-snug text-zinc-900",
          "placeholder:text-zinc-400",
          "border border-zinc-200/90 bg-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "transition-[border-color,box-shadow] duration-200",
          "hover:border-zinc-300",
          "focus:border-violet-400/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400",
        ].join(" ");

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
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
        className={inputClass}
      />
    </div>
  );
}
