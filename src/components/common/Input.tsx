import React from "react";
import cn from "../../utils/cn";

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  error?: string;
  counter?: boolean;
  isTextarea?: boolean;
  autoFocus?: boolean;
}

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  maxLength,
  error,
  counter = false,
  isTextarea = false,
  autoFocus = false,
}: InputProps) => {
  const InputElement = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-800"
      >
        {icon && icon}
        {label}{" "}
        {counter && maxLength && (
          <span className="text-gray-500 text-xs">
            ({value.length}/{maxLength})
          </span>
        )}
      </label>

      <InputElement
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          "w-full p-3 border bg-white rounded-lg transition-all",
          isTextarea && "min-h-24 resize-y"
        )}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        {...(isTextarea ? {} : { type: "text" })}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1 font-bold">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;