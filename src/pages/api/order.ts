import type { NextApiRequest, NextApiResponse } from 'next';

//live
const LIVE_API_BASE = 'http://o-complex.com:1337';

//handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Метод не разрешен' });
            return;
        }

        const apiRes = await fetch(`${LIVE_API_BASE}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        if (!apiRes.ok) {
            const text = await apiRes.text();
            res.status(apiRes.status).json({ error: text });
            return;
        }
        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (error: unknown) {
        res.status(500).json({ error: error.message || 'Ошибка сервера' });
    }
}
