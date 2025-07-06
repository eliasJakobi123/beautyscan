import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, prompt } = req.body;
  if (!image || !prompt) {
    return res.status(400).json({ error: 'Missing image or prompt' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are BeautyScan AI, a friendly virtual beauty coach.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              typeof image === 'string' && image.startsWith('http')
                ? { type: 'text', text: `Image URL: ${image}` }
                : { type: 'image_url', image_url: { url: image } }
            ]
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      })
    });
    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      return res.status(500).json({ error: data.error?.message || 'OpenAI API error' });
    }
    return res.status(200).json({ result: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err });
  }
} 