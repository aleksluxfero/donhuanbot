import { Bot, Context } from 'grammy';
import type { NextApiRequest, NextApiResponse } from 'next';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN ?? '');

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await bot.handleUpdate(req.body);
    res.status(200).end();
  } else if (req.method === 'GET' && req.query.setWebhook === 'true') {
    const webhookUrl = `https://${process.env.VERCEL_URL}/api/bot`;
    await bot.api.setWebhook(webhookUrl);
    res.status(200).send('Webhook set successfully');
  } else {
    res.status(405).end();  // Method Not Allowed
  }
}
