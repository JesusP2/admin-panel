import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import taskService from 'server/services/Task.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    const { id } = req.query;
    if (typeof id !== 'string') throw new Error('Invalid id');
    else if (req.method === 'GET') {
        const task = await taskService.findOne(id);
        return res.status(200).json(task);
    } else if (req.method === 'PUT') {
        const { name, uid, description, duration, isFinished } = req.body;
        const task = await taskService.updateOne(id, {
            name,
            uid,
            description,
            duration,
            isFinished,
        });
        return res.status(200).json({ id: task.id });
    } else if (req.method === 'DELETE') {
        await taskService.deleteOne(id);
        return res.status(200).json({});
    }

    res.status(501).json({});
}

export default errorHandler(handler);
