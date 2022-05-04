import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import tagService from 'server/services/Tag.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    if (req.method === 'POST') {
        const { name } = req.body;

        const tag = await tagService.createOne({
            name,
        });

        return res.status(201).json({ id: tag.id });
    } else if (req.method === 'GET') {
        const tags = await tagService.findAll()
        return res.status(200).json(tags)
    }

    res.status(501).end();
}

export default errorHandler(handler);
