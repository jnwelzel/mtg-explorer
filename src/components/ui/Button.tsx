import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  isLoading = false,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition 
      ${isLoading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading ? (
      <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
    ) : (
      children
    )}
  </button>
);
