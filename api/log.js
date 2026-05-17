module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const sheetsUrl = process.env.SHEETS_URL;
    if (sheetsUrl) {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    // Never let logging break the app
    res.status(200).json({ ok: true });
  }
};
