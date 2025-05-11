import { webhookCallback, Context, Bot } from "grammy";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");
}

const bot = new Bot(token);

// Обработка команды /start только в нужной группе
bot.command("start", async (ctx) => {
  await ctx.reply("Привет. бро");
});

// Обработка голосовых сообщений только в нужной группе

bot.on('message', async (ctx: Context) => {
  if (ctx.message && ctx.message.text) {
    const userMessage = ctx.message.text;
    try {
      const endpoint = process.env.REQUESTY_ENDPOINT;
      if (!endpoint) {
        await ctx.reply('Endpoint not configured.');
        return;
      }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REQUESTY_API_KEY}`,
      },
      body: JSON.stringify({
        "messages": [
          {"role": "system", "content": "You are Don Juan."},
          {"role": "user", "content": userMessage}
        ]
      }),
    });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      await ctx.reply(data.response);  // Предполагаем, что API возвращает объект с полем response
    } catch (error) {
      console.error(error)
      await ctx.reply('Ошибка при обработке запроса.');
    }
  }
});


export const POST = webhookCallback(bot, "std/http");