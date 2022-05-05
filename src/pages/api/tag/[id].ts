import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import tagService from 'server/services/Tag.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    const {id} = req.query
    if (typeof id !== 'string') throw new Error("Invalid id")
    else if (req.method === 'GET') {
        const tag = await tagService.findOne(id)

        return res.status(200).json(tag);
    } else if (req.method === 'PUT') {
        const {name} = req.body
        const tag = await tagService.updateOne(id, {name})
        return res.status(200).json({id: tag.id})
    } else if (req.method === 'DELETE') {
        await tagService.deleteOne(id)
        return res.status(200).json({})
    }

    res.status(501).json({});
}

export default errorHandler(handler);

