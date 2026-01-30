export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none ${className}`}
    />
  );
}
