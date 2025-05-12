import { cn } from "../lib/utils";
import { forwardRef } from "react";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "circle"; // Added "circle" size for circular button
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "default" && "bg-primary text-white hover:bg-primary/90",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          size === "sm" && "h-8 w-8 text-sm rounded-[8px]", // Small size (round button)
          size === "md" && "h-10 px-4 rounded-[10px]",       // Medium size (pill button)
          size === "lg" && "h-12 px-6 text-lg", // Large size (pill button)
          size === "circle" && "h-10 px-4 rounded-full", // Circle button size (fully rounded)
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
