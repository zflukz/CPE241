import { cn } from "../lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "success" | "default" | "warning" | "destructive" | "danger" 
  | undefined | "First" | "Business" | "Premium" | "Economy" |"facilities"; 
  size?: "text-xs" | "text-sm" | "text-lg" | "text-xl";
}

export function Badge({ className, variant = "default", size = "text-xs", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-semibold", 
        size, // Apply the size dynamically
        variant === "default" && "bg-gray-100 text-gray-800",
        variant === "success" && "bg-green-100 text-green-800",
        variant === "warning" && "bg-yellow-100 text-yellow-800",
        variant === "destructive" && "bg-red-100 text-red-800",
        variant === "danger" && "bg-red-100 text-red-800",
        variant === "First" && "bg-[#FEF3C7]/80 text-[#92400E]",
        variant === "Business" && "bg-[#EDE9FE]/80 text-[#6B21A8]",
        variant === "Premium" && "bg-[#D1FAE5]/80 text-[#065F46]",
        variant === "Economy" && "bg-[#F3F4F6]/80 text-[#374151]",
        variant === "facilities" && "bg-white text-[#C84B2F]  rounded-full",
        className
      )}
      {...props}
    />
  );
}
