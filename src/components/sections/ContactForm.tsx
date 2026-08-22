"use client";

import { useRef, useState } from "react";

import {
  contactCategories,
  type ContactErrors,
  type ContactPayload,
  validateContactPayload,
} from "@/lib/contact";

const initialValues: ContactPayload = {
  name: "",
  company: "",
  email: "",
  category: "",
  message: "",
  website: "",
};

const genericErrorMessage =
  "送信できませんでした。時間を置いて、もう一度お試しください。";

type FieldProps = {
  name: Exclude<keyof ContactPayload, "website">;
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [formMessage, setFormMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const updateValue = (name: keyof ContactPayload, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setFormMessage("");
    }
  };

  const focusFirstError = (fieldErrors: ContactErrors) => {
    const firstField = ["name", "company", "email", "category", "message"].find(
      (field) => fieldErrors[field as keyof ContactErrors],
    );
    if (!firstField) return;
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
    });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const validation = validateContactPayload(values);
    if (!validation.data) {
      setErrors(validation.errors);
      setStatus("error");
      setFormMessage("入力内容を確認してください。");
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; errors?: ContactErrors }
        | null;

      if (!response.ok || !result?.success) {
        if (result?.errors) {
          setErrors(result.errors);
          focusFirstError(result.errors);
        }
        setStatus("error");
        setFormMessage(result?.message ?? genericErrorMessage);
        return;
      }

      setValues(initialValues);
      setStatus("success");
      setFormMessage(
        "お問い合わせを送信しました。ありがとうございます。内容を確認のうえ、返信可能な場合はご連絡します。",
      );
    } catch {
      setStatus("error");
      setFormMessage(genericErrorMessage);
    }
  };

  const field = ({ name, label, required, children }: FieldProps) => {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={name} className="flex items-baseline gap-2 text-sm font-medium text-fg">
          {label}
          {required && <span className="text-xs font-normal text-accent">必須</span>}
        </label>
        <div className="mt-2">
          {children}
        </div>
        {error && (
          <p id={`${name}-error`} className="mt-2 text-sm leading-relaxed text-red-700" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };

  const inputClass = "min-h-11 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="rounded-card bg-inverse-fg p-6 text-fg sm:p-7">
      <h3 className="text-h3 font-bold">お問い合わせ</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        内容を確認のうえ、返信可能なものについてご連絡します。
      </p>

      <div className="mt-6 space-y-5">
        {field({
          name: "name",
          label: "お名前",
          required: true,
          children: <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass} />,
        })}
        {field({
          name: "company",
          label: "会社名・組織名（任意）",
          children: <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={(event) => updateValue("company", event.target.value)} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} className={inputClass} />,
        })}
        {field({
          name: "email",
          label: "メールアドレス",
          required: true,
          children: <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass} />,
        })}
        {field({
          name: "category",
          label: "お問い合わせ種別",
          required: true,
          children: <select id="category" name="category" value={values.category} onChange={(event) => updateValue("category", event.target.value)} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined} className={inputClass}><option value="">選択してください</option>{contactCategories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select>,
        })}
        {field({
          name: "message",
          label: "お問い合わせ内容",
          required: true,
          children: <textarea id="message" name="message" rows={7} value={values.message} onChange={(event) => updateValue("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${inputClass} min-h-36 resize-y`} />,
        })}
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => updateValue("website", event.target.value)} />
      </div>

      <div className="mt-6" aria-live="polite">
        {formMessage && (
          <p className={status === "success" ? "text-sm leading-relaxed text-emerald-800" : "text-sm leading-relaxed text-red-700"} role={status === "error" ? "alert" : undefined}>
            {formMessage}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "submitting"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        送信いただいた情報は、お問い合わせへの対応のためにのみ利用します。
      </p>
    </form>
  );
}
