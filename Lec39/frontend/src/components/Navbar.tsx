"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RoleBadge } from "./ui";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm transition hover:bg-muted ${
        pathname === href ? "font-semibold" : "text-subtle"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b border-line bg-surface">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-1">
          <Link href="/" className="mr-2 font-bold">Auth Portal</Link>
          {link("/users", "მომხმარებლები")}
          {user && link("/profile", "პროფილი")}
        </div>
        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <>
              <span className="hidden text-sm sm:inline">{user.fullName}</span>
              <RoleBadge role={user.role} />
              <button
                onClick={() => {
                  signOut();
                  router.push("/sign-in");
                }}
                className="rounded-md px-3 py-1.5 text-sm text-subtle hover:bg-muted"
              >
                გასვლა
              </button>
            </>
          ) : (
            <>
              {link("/sign-in", "შესვლა")}
              {link("/sign-up", "რეგისტრაცია")}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
