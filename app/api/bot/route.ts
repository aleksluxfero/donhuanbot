import { handleWebhook } from "@/lib/bot";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return new Response("Эндпоинт Telegram API работает!", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(request: NextRequest) {
  try {
    await handleWebhook(request);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Ошибка при обработке вебхука:", error);
    return new Response("Ошибка", { status: 500 });
  }
}
