import { Bot, webhookCallback } from "grammy";

// Инициализация бота
const bot = new Bot(process.env.BOT_TOKEN || "");

bot.command("start", async (ctx) => {
  await ctx.reply("Привет! Я бот на grammY и Next.js 15!");
});

bot.on("message", async (ctx) => {
  await ctx.reply("Сообщение получено!");
});

bot.catch((err) => {
  console.error(`Ошибка в боте: ${err}`);
});

// Экспортируем функцию для обработки вебхуков
export const handleWebhook = webhookCallback(bot, "std/http");
