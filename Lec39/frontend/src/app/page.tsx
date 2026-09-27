"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Card, Spinner } from "@/components/ui";

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-lg">
      <Card className="text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold">გამარჯობა, {user.fullName} 👋</h1>
            <p className="mt-2 text-sm text-subtle">შესული ხარ როგორც {user.email}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/profile" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
                ჩემი პროფილი
              </Link>
              <Link href="/users" className="rounded-lg border border-line px-4 py-2 text-sm font-medium">
                მომხმარებლები
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">კეთილი იყოს შენი მობრძანება</h1>
            <p className="mt-2 text-sm text-subtle">შედი ან დარეგისტრირდი, რომ გააგრძელო.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/sign-in" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
                შესვლა
              </Link>
              <Link href="/sign-up" className="rounded-lg border border-line px-4 py-2 text-sm font-medium">
                რეგისტრაცია
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
