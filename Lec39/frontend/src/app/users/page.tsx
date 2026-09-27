"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/lib/types";
import { Alert, Button, Card, RoleBadge, Spinner } from "@/components/ui";

export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getUsers().then(setUsers).catch((err) => setError(err.message));
  }, []);

  const isAdmin = me?.role === "admin";

  const onDelete = async (u: User) => {
    if (!confirm(`წაიშალოს ${u.fullName}?`)) return;
    try {
      await api.deleteUser(u._id);
      setUsers((list) => list?.filter((x) => x._id !== u._id) ?? null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (error && !users) return <Alert>{error}</Alert>;
  if (!users) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold">მომხმარებლები</h1>
        <span className="text-sm text-subtle">{users.length} სულ</span>
      </div>
      {error && <Alert>{error}</Alert>}
      <Card className="p-0">
        {users.length === 0 ? (
          <p className="p-6 text-center text-sm text-subtle">მომხმარებლები არ არის</p>
        ) : (
          <ul className="divide-y divide-line">
            {users.map((u) => (
              <li key={u._id} className="flex items-center justify-between gap-3 px-5 py-3">
                <Link href={`/users/${u._id}`} className="min-w-0 flex-1 hover:underline">
                  <p className="truncate font-medium">
                    {u.fullName} {u._id === me?._id && <span className="text-xs text-subtle">(შენ)</span>}
                  </p>
                  <p className="truncate text-sm text-subtle">{u.email}</p>
                </Link>
                <RoleBadge role={u.role} />
                {isAdmin && u._id !== me?._id && (
                  <Button variant="ghost" className="text-danger" onClick={() => onDelete(u)}>
                    წაშლა
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
