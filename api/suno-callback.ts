import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

 if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const data = req.body;

    console.log("CALLBACK:");
    console.log(JSON.stringify(data, null, 2));

    if (data.audio_url) {
      console.log("LINK:", data.audio_url);
    }

    return res.status(200).json({ message: 'Callback received', data });
  } catch (err) {
    console.error("❌ Something go wrong:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
