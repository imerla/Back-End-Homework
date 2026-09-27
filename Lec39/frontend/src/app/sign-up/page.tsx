"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { validateEmail, validateFullName, validatePassword } from "@/lib/validation";
import { Alert, Button, Card, Field } from "@/components/ui";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    setServerError(null);
    try {
      await api.signUp(form);
      router.push("/sign-in?registered=1");
    } catch (err) {
      const status = (err as { status?: number }).status;
      // backend დუბლიკატ ელფოსტაზე ცარიელ 400-ს აბრუნებს
      setServerError(
        status === 400 && (err as Error).message === "Bad Request"
          ? "ეს ელფოსტა უკვე დარეგისტრირებულია"
          : (err as Error).message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-sm">
      <Card>
        <h1 className="mb-6 text-xl font-bold">რეგისტრაცია</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Field label="სრული სახელი" value={form.fullName} onChange={set("fullName")} error={errors.fullName} maxLength={25} />
          <Field label="ელფოსტა" type="email" value={form.email} onChange={set("email")} error={errors.email} />
          <Field label="პაროლი" type="password" value={form.password} onChange={set("password")} error={errors.password} maxLength={20} />
          {serverError && <Alert>{serverError}</Alert>}
          <Button type="submit" disabled={submitting}>
            {submitting ? "იგზავნება..." : "რეგისტრაცია"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-subtle">
          უკვე გაქვს ანგარიში?{" "}
          <Link href="/sign-in" className="font-medium text-accent">შესვლა</Link>
        </p>
      </Card>
    </div>
  );
}
