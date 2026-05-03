import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 8080);

const SYSTEM_INSTRUCTION = `You are an official AI guide for the Election Journey platform.
Your goal is to educate citizens about the democratic process, voting eligibility, and election procedures in India.
Always be polite, encouraging, and provide accurate, politically neutral information.
IMPORTANT: Your answers MUST be extremely simple, short, and concise. Do NOT use the words "Election Commission of India". Use markdown formatting to make your answers readable (bullet points, bold text).`;

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_ITEMS = 12;
const MAX_HISTORY_TEXT_LENGTH = 1200;

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://img.icons8.com', 'https://lh3.googleusercontent.com'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(express.json({ limit: '32kb' }));

app.use(
  '/api/chat',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 40,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  })
);

function toSafeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY_ITEMS)
    .filter((entry) => entry && (entry.role === 'user' || entry.role === 'model'))
    .map((entry) => ({
      role: entry.role,
      text: String(entry.text || '').slice(0, MAX_HISTORY_TEXT_LENGTH),
    }))
    .filter((entry) => entry.text.trim().length > 0)
    .map((entry) => ({
      role: entry.role,
      parts: [{ text: entry.text }],
    }));
}

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'AI service is not configured.' });
    }

    const message = String(req.body?.message || '').trim();
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message is too long.' });
    }

    const history = toSafeHistory(req.body?.history);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text() || 'I could not generate a response.';

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Failed to generate response.' });
  }
});

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
