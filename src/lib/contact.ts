export const contactCategories = [
  { value: "job", label: "採用・お仕事について" },
  { value: "ai", label: "AI活用について" },
  { value: "improvement", label: "業務改善について" },
  { value: "web", label: "Web・業務ツール制作について" },
  { value: "other", label: "その他" },
] as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  category: string;
  message: string;
  website: string;
};

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<Exclude<ContactField, "website">, string>>;

export type ValidContactPayload = Omit<ContactPayload, "category"> & {
  category: (typeof contactCategories)[number]["value"];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeLineBreaks(value: string) {
  return value.replace(/\r\n?/g, "\n");
}

export function validateContactPayload(
  value: unknown,
): { data: ValidContactPayload; errors: ContactErrors } | { data: null; errors: ContactErrors } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { data: null, errors: { message: "入力内容を確認してください。" } };
  }

  const payload = value as Partial<ContactPayload>;
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const category = typeof payload.category === "string" ? payload.category.trim() : "";
  const message =
    typeof payload.message === "string"
      ? normalizeLineBreaks(payload.message).trim()
      : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const errors: ContactErrors = {};

  if (name.length < 1 || name.length > 100) {
    errors.name = "お名前は1〜100文字で入力してください。";
  }
  if (company.length > 150) {
    errors.company = "会社名・組織名は150文字以内で入力してください。";
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "メールアドレスを正しく入力してください。";
  }
  if (!contactCategories.some((item) => item.value === category)) {
    errors.category = "お問い合わせ種別を選択してください。";
  }
  if (message.length < 10 || message.length > 3000) {
    errors.message = "お問い合わせ内容は10〜3000文字で入力してください。";
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      name,
      company,
      email,
      category: category as ValidContactPayload["category"],
      message,
      website,
    },
    errors,
  };
}
