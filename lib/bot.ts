import { Bot, webhookCallback } from "grammy";

// Инициализация бота
const bot = new Bot(process.env.BOT_TOKEN || "");

bot.use((ctx, next) => {
  console.log("Получено обновление:", JSON.stringify(ctx.update, null, 2));
  return next();
});

bot.command("start", async (ctx) => {
  console.log("Команда /start получена от:", ctx.from?.username);
  try {
    await ctx.reply("Привет! Я бот на grammY и Next.js 15!");
    console.log("Ответ на /start успешно отправлен");
  } catch (error) {
    console.error("Ошибка при отправке ответа на /start:", error);
  }
});

bot.on("message", async (ctx) => {
  console.log("Получено сообщение:", ctx.message.text);
  try {
    await ctx.reply("Сообщение получено!");
    console.log("Ответ на сообщение отправлен");
  } catch (error) {
    console.error("Ошибка при отправке ответа на сообщение:", error);
  }
});

bot.catch((err) => {
  console.error(`Ошибка в боте: ${err}`);
});

// Экспортируем функцию для обработки вебхуков
export const handleWebhook = webhookCallback(bot, "callback");
