import { cn } from "../lib/utils";

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <nav className={cn("flex w-full items-center justify-between", className)} {...props} />;
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex items-center gap-2", className)} {...props} />;
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}

export function PaginationPrevious({ href = "#", className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn("flex h-9 w-9 items-center justify-center rounded-xl border text-sm", className)} {...props}>
      &lt;
    </a>
  );
}

export function PaginationNext({ href = "#", className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={cn("flex h-9 w-9 items-center justify-center rounded-xl border text-sm", className)} {...props}>
      &gt;
    </a>
  );
}
