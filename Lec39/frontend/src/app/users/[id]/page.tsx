"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/lib/types";
import { Alert, Button, Card, RoleBadge, Spinner } from "@/components/ui";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user: me } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getUser(id).then(setUser).catch((err) => setError(err.message));
  }, [id]);

  const onDelete = async () => {
    if (!user || !confirm(`წაიშალოს ${user.fullName}?`)) return;
    try {
      await api.deleteUser(user._id);
      router.push("/users");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4">
      <Link href="/users" className="text-sm text-subtle hover:underline">← მომხმარებლები</Link>
      {error && <Alert>{error}</Alert>}
      {!user && !error && <Spinner />}
      {user && (
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">{user.fullName}</h1>
              <p className="text-sm text-subtle">{user.email}</p>
            </div>
            <RoleBadge role={user.role} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <dt className="text-subtle">ID</dt>
            <dd className="truncate font-mono text-xs">{user._id}</dd>
            <dt className="text-subtle">შეიქმნა</dt>
            <dd>{new Date(user.createdAt).toLocaleString("ka-GE")}</dd>
            <dt className="text-subtle">განახლდა</dt>
            <dd>{new Date(user.updatedAt).toLocaleString("ka-GE")}</dd>
          </dl>
          {me?.role === "admin" && me._id !== user._id && (
            <Button variant="danger" className="mt-6" onClick={onDelete}>მომხმარებლის წაშლა</Button>
          )}
        </Card>
      )}
    </div>
  );
}
