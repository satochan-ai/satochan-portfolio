import {
  contactCategories,
  validateContactPayload,
} from "@/lib/contact";

const MAX_PAYLOAD_BYTES = 16 * 1024;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/";
const GENERIC_ERROR_MESSAGE =
  "送信できませんでした。時間を置いて、もう一度お試しください。";

function json(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ message: "不正なリクエストです。" }, 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_PAYLOAD_BYTES) {
    return json({ message: "入力内容が長すぎます。" }, 413);
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return json({ message: "不正なリクエストです。" }, 400);
  }

  if (new TextEncoder().encode(body).byteLength > MAX_PAYLOAD_BYTES) {
    return json({ message: "入力内容が長すぎます。" }, 413);
  }

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return json({ message: "不正なリクエストです。" }, 400);
  }

  const result = validateContactPayload(input);
  if (!result.data) {
    return json({ message: "入力内容を確認してください。", errors: result.errors }, 400);
  }

  if (result.data.website) {
    return json({ success: true });
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (!formId) {
    console.error("FORMSPREE_FORM_ID is not configured.");
    return json({ message: GENERIC_ERROR_MESSAGE }, 503);
  }

  const categoryLabel = contactCategories.find(
    (item) => item.value === result.data.category,
  )?.label;

  try {
    const response = await fetch(`${FORMSPREE_ENDPOINT}${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: result.data.name,
        company: result.data.company,
        email: result.data.email,
        category: categoryLabel,
        message: result.data.message,
        source: "satochan-portfolio",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Formspree submission failed.", { status: response.status });
      return json({ message: GENERIC_ERROR_MESSAGE }, 502);
    }
  } catch (error) {
    console.error("Formspree submission failed.", error);
    return json({ message: GENERIC_ERROR_MESSAGE }, 502);
  }

  return json({ success: true });
}
