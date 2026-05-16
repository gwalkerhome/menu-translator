export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, prompt, query } = req.body;

  try {
    if (mode === 'pexels') {
      const q = encodeURIComponent(query + ' food dish');
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${q}&per_page=1&orientation=landscape`,
        { headers: { 'Authorization': process.env.PEXELS_API_KEY } }
      );
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return res.status(200).json({ url: data.photos[0].src.large });
      } else {
        return res.status(404).json({ error: 'No image found on Pexels' });
      }

    } else {
      // gpt-image-1
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt,
          n: 1,
          size: '1024x1024'
        })
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data.error?.message || 'Image generation failed' });
      }
      return res.status(200).json({ b64: data.data[0].b64_json });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
