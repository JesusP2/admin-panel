import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import taskService from 'server/services/Task.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    if (req.method === 'POST') {
        const { name, description, uid, projectId, duration} = req.body;

        const task = await taskService.createOne({
            name,
            description,
            uid,
            duration,
            project: { connect: { id: projectId } },
        });

        return res.status(201).json({ id: task.id });
    } else if (req.method === 'GET') {
        const tasks = await taskService.findAll();
        return res.status(200).json(tasks);
    }

    res.status(501).end();
}

export default errorHandler(handler);
