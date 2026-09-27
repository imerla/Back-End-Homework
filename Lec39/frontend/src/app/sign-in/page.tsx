"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { validateEmail, validatePassword } from "@/lib/validation";
import { Alert, Button, Card, Field } from "@/components/ui";

function SignInForm() {
  const router = useRouter();
  const registered = useSearchParams().get("registered");
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = { email: validateEmail(form.email), password: validatePassword(form.password) };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    setServerError(null);
    try {
      await signIn(form.email, form.password);
      router.push("/profile");
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <h1 className="mb-6 text-xl font-bold">შესვლა</h1>
      {registered && (
        <div className="mb-4">
          <Alert kind="success">რეგისტრაცია წარმატებულია, ახლა შედი.</Alert>
        </div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="ელფოსტა" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        <Field label="პაროლი" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
        {serverError && <Alert>{serverError}</Alert>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "შესვლა..." : "შესვლა"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-subtle">
        არ გაქვს ანგარიში?{" "}
        <Link href="/sign-up" className="font-medium text-accent">რეგისტრაცია</Link>
      </p>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-sm">
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
