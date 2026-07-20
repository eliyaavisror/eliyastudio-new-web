"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const consent = data.get("consent");

    if (!name) errs.name = t("required");
    if (!email) errs.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t("invalidEmail");
    if (!phone) errs.phone = t("required");
    else if (!/^[\d\s\-+()]{8,}$/.test(phone)) errs.phone = t("invalidPhone");
    if (!message) errs.message = t("required");
    if (!consent) errs.consent = t("required");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch(siteConfig.formspree.endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        console.error("Formspree error", res.status, body);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-paper-line p-8 md:p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-ink text-paper inline-flex items-center justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-lg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label={t("name")} name="name" placeholder={t("namePlaceholder")} required error={errors.name} autoComplete="name" />
        <Field label={t("phone")} name="phone" type="tel" placeholder={t("phonePlaceholder")} required error={errors.phone} autoComplete="tel" />
      </div>

      <Field label={t("email")} name="email" type="email" placeholder={t("emailPlaceholder")} required error={errors.email} autoComplete="email" />

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          {t("subject")}
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 border border-paper-line bg-paper focus:border-ink focus-visible:rounded-none transition-colors min-h-[48px]"
        >
          <option value="architecture">{t("subjectOptions.architecture")}</option>
          <option value="visualization">{t("subjectOptions.visualization")}</option>
          <option value="consulting">{t("subjectOptions.consulting")}</option>
          <option value="other">{t("subjectOptions.other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t("message")} <span aria-hidden="true" className="text-ink-muted">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full px-4 py-3 border border-paper-line bg-paper focus:border-ink focus-visible:rounded-none transition-colors resize-none"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-2 text-sm text-red-700">{errors.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 min-h-[44px]">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.consent)}
          className="mt-1 w-5 h-5 border border-paper-line flex-shrink-0"
        />
        <label htmlFor="consent" className="text-sm text-ink-soft cursor-pointer pt-0.5">
          {t("consent")}{" "}
          <Link href="/privacy" className="link-underline font-medium">
            {t("privacyLink")}
          </Link>
          {" "}<span aria-hidden="true">*</span>
        </label>
      </div>
      {errors.consent && (
        <p role="alert" className="text-sm text-red-700">{errors.consent}</p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 border border-red-200 bg-red-50 p-4">
          {t("error")}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && <span aria-hidden="true" className="text-ink-muted"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-paper-line bg-paper focus:border-ink focus-visible:rounded-none transition-colors min-h-[48px]"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
