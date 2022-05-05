import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import projectService from 'server/services/Project.service';

async function handler(req: NextApiRequest, res: NextApiResponse<{ id: string } | any>) {
    if (req.method === 'POST') {
        const { name, description, uid, duration, tags} = req.body;

        const project = await projectService.createOne({
            name,
            description,
            uid,
            duration,
            tags
        });

        return res.status(201).json(project);
    } else if (req.method === 'GET') {
        const projects = await projectService.findAll();
        return res.status(200).json(projects);
    }

    res.status(501).json({});
}

export default errorHandler(handler);
