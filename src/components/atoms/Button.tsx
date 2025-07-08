import type { ReactNode } from "react";

interface ButtonProps {
  label: string | ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  selected?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  label,
  onClick,
  icon,
  selected = false,
  variant = "primary",
}: ButtonProps) {
  const baseClasses =
    "px-3 sm:px-4 py-2 flex items-center justify-center gap-1 sm:gap-2 font-medium transition-all duration-200 ease-in-out text-sm sm:text-base cursor-pointer h-10";

  const variantClasses = {
    primary: selected
      ? "bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105 ring-2 ring-offset-2 ring-blue-400"
      : "bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105",
    secondary: selected
      ? "rounded hover:scale-105"
      : "rounded hover:scale-105",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      style={{
        backgroundColor: variant === 'secondary' ? 'var(--bg-secondary)' : undefined,
        color: variant === 'secondary' ? 'var(--text-primary)' : undefined,
        borderColor: variant === 'secondary' ? 'var(--border-primary)' : undefined
      }}
      onMouseEnter={(e) => {
        if (variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        }
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
