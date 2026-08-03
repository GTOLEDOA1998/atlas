import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

/**
 * Consistent page width and padding for every screen inside the shell.
 * Centralised so spacing never has to be re-decided per page.
 */
export function PageContainer({ className, children, ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
