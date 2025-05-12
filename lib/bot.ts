import { Bot, webhookCallback } from "grammy";

// Инициализация бота
const bot = new Bot(process.env.BOT_TOKEN || "");

// Пример команды
bot.command("start", (ctx) => ctx.reply("Привет!"));

bot.catch((err) => {
  console.error(`Ошибка в боте: ${err}`);
});

// Экспортируем функцию для обработки вебхуков
export const handleWebhook = webhookCallback(bot, "callback");
