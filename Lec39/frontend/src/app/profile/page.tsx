"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { UpdateUserBody, User } from "@/lib/types";
import { validateEmail, validateFullName, validatePassword } from "@/lib/validation";
import { Alert, Button, Card, Field, RoleBadge, Spinner } from "@/components/ui";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace("/sign-in");
  }, [user, loading, router]);

  if (loading || !user) return <Spinner />;
  return <Profile key={user._id} user={user} />;
}

function Profile({ user }: { user: User }) {
  const router = useRouter();
  const { setUser, signOut } = useAuth();
  const [form, setForm] = useState({ fullName: user.fullName, email: user.email, password: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [message, setMessage] = useState<{ kind: "error" | "success"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      password: form.password ? validatePassword(form.password) : null,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    // მხოლოდ შეცვლილ ველებს ვაგზავნით
    const body: UpdateUserBody = {};
    if (form.fullName !== user.fullName) body.fullName = form.fullName;
    if (form.email !== user.email) body.email = form.email;
    if (form.password) body.password = form.password;
    if (!Object.keys(body).length) {
      setMessage({ kind: "error", text: "არაფერი შეცვლილა" });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const updated = await api.updateMe(body);
      setUser(updated);
      setForm((f) => ({ ...f, password: "" }));
      setMessage({ kind: "success", text: "პროფილი განახლდა" });
    } catch (err) {
      setMessage({ kind: "error", text: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("ნამდვილად გინდა ანგარიშის წაშლა? ეს მოქმედება შეუქცევადია.")) return;
    try {
      await api.deleteMe();
      signOut();
      router.push("/sign-up");
    } catch (err) {
      setMessage({ kind: "error", text: (err as Error).message });
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
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
        </dl>
      </Card>

      <Card>
        <h2 className="mb-4 font-semibold">პროფილის რედაქტირება</h2>
        <form onSubmit={onSave} className="flex flex-col gap-4" noValidate>
          <Field label="სრული სახელი" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} error={errors.fullName} maxLength={25} />
          <Field label="ელფოსტა" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <Field label="ახალი პაროლი (არასავალდებულო)" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} maxLength={20} />
          {message && <Alert kind={message.kind}>{message.text}</Alert>}
          <Button type="submit" disabled={saving}>{saving ? "ინახება..." : "შენახვა"}</Button>
        </form>
      </Card>

      <Card className="border-danger/40">
        <h2 className="font-semibold text-danger">ანგარიშის წაშლა</h2>
        <p className="mt-1 text-sm text-subtle">ანგარიში სამუდამოდ წაიშლება.</p>
        <Button variant="danger" className="mt-4" onClick={onDelete}>ანგარიშის წაშლა</Button>
      </Card>
    </div>
  );
}
