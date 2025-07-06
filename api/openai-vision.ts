// @ts-ignore
// Diese API-Route ist für Vercel/Netlify geeignet. Sie nimmt ein Bild entgegen und leitet es an OpenAI Vision weiter.
// Nutzt 'formidable' für Multipart-Parsing.
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    // Parse multipart form
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
    const imageFile = data.files.image;
    if (!imageFile) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    // Lese das Bild als Buffer
    const imageBuffer = fs.readFileSync(imageFile.filepath || imageFile.path);
    // Sende das Bild an OpenAI Vision
    const openaiRes = await fetch('https://api.openai.com/v1/images/vision/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/octet-stream',
      },
      body: imageBuffer,
    });
    if (!openaiRes.ok) {
      return res.status(500).json({ error: 'OpenAI Vision API failed' });
    }
    const openaiResult = await openaiRes.json();
    // Extrahiere relevante Daten (Scores, Feedback, Tipps)
    const scores = openaiResult.scores || {};
    const feedback = openaiResult.feedback || {};
    const tips = openaiResult.tips || [];
    return res.status(200).json({ scores, feedback, tips });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
} 