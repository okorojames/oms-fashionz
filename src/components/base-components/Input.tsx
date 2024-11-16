"use client";
import { cn } from "@/libs/cn";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  classNames?: {
    root?: string;
    input?: string;
    inputWrapper?: string;
    label?: string;
    error?: string;
  };
  placeholder?: string;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startIcon,
      endIcon,
      classNames,
      placeholder,
      label,
      error,
      type = "text",
      ...rest
    },
    ref
  ) => {
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const isPasswordType = type === "password";
    // render here...
    return (
      <div className={cn("flex flex-col gap-1", classNames?.root)}>
        {label && <label className={cn("", classNames?.label)}>{label}</label>}
        <div
          className={cn(
            "flex gap-2 px-2 items-center overflow-hidden rounded-md border",
            classNames?.inputWrapper
          )}
        >
          {startIcon && <span>{startIcon}</span>}
          <input
            ref={ref}
            type={isPasswordType && isPassword ? "text" : type}
            placeholder={placeholder}
            className={cn("w-full py-2 outline-none", classNames?.input)}
            {...rest}
          />
          {type === "password" ? (
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsPassword(!isPassword);
              }}
            >
              {isPassword ? <EyeOff /> : <Eye />}
            </span>
          ) : (
            <>{endIcon && <span className="cursor-pointer">{endIcon}</span>}</>
          )}
        </div>
        {error && (
          <small className={cn("text-red-500 text-xs", classNames?.error)}>
            {error}
          </small>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
