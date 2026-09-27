import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Field({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | null }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        {...props}
        className={`rounded-lg border bg-background px-3 py-2 outline-none transition focus:ring-2 focus:ring-accent/40 ${
          error ? "border-danger" : "border-line"
        }`}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

type Variant = "primary" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:opacity-90",
  ghost: "border border-line hover:bg-muted",
  danger: "bg-danger text-white hover:opacity-90",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  );
}

export function Alert({ kind = "error", children }: { kind?: "error" | "success"; children: React.ReactNode }) {
  const cls =
    kind === "error"
      ? "border-danger/30 bg-danger/10 text-danger"
      : "border-success/30 bg-success/10 text-success";
  return <div className={`rounded-lg border px-3 py-2 text-sm ${cls}`}>{children}</div>;
}

export function RoleBadge({ role }: { role: string }) {
  const cls = role === "admin" ? "bg-accent/15 text-accent" : "bg-muted text-subtle";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{role}</span>;
}

export function Spinner() {
  return <p className="py-10 text-center text-sm text-subtle">იტვირთება...</p>;
}
