
export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

if (req.headers["x-alert-secret"] !== process.env.ALERT_SECRET) {
return res.status(401).json({ error: "Unauthorized" });
}

const { title, price, url } = req.body || {};

if (!title || price === undefined || !url) {
return res.status(400).json({ error: "Missing data" });
}

if (Number(price) < 0 || Number(price) > 25) {
return res.status(400).json({ error: "Price out of range" });
}

const message =
`🔥 NUOVO ANNUNCIO ESSENTIALS!\n\n` +
`${title}\nPrezzo: ${price} €\n\n${url}`;

const response = await fetch(
`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: process.env.CHAT_ID,
text: message
})
}
);

if (!result.ok) {
  return res.status(502).json({
    error: "Telegram delivery failed",
    details: result.description
  });
}



return res.status(200).json({ success: true });
}
