import type { NextApiRequest, NextApiResponse } from 'next';

//live req
const LIVE_API_BASE = 'http://o-complex.com:1337';

//handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).json({ error: 'Метод не разрешен' });
            return;
        }

        const apiRes = await fetch(`${LIVE_API_BASE}/reviews`);
        if (!apiRes.ok) {
            res
                .status(apiRes.status)
                .json({ error: `Strapi ошибка: ${apiRes.statusText}` });
            return;
        }
        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Ошибка сервера' });
    }
}
