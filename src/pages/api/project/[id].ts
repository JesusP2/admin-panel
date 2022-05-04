import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import projectService from 'server/services/Project.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    const {id} = req.query
    if (typeof id !== 'string') throw new Error("Invalid id")
    else if (req.method === 'GET') {
        const project = await projectService.findOne(id)
        return res.status(200).json(project);
    } else if (req.method === 'PUT') {
        const {name, description, uid, duration, isFinished} = req.body
        const project = await projectService.updateOne(id, {name, description, uid, duration, isFinished})
        return res.status(200).json({id: project.id})
    } else if (req.method === 'DELETE') {
        await projectService.deleteOne(id)
        return res.status(200).end()
    }

    res.status(501).end();
}

export default errorHandler(handler);

