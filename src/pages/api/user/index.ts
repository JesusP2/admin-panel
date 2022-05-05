import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import userService from 'server/services/User.service';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {name, email, password, phoneNumber} = req.body

        const user = await userService.createOne({
            displayName: name, email, password, phoneNumber
        });

        return res.status(201).json(user);
    } else if (req.method === 'GET') {
        const users = await userService.findAll()
        return res.status(200).json(users)
    }

    res.status(501).json({});
}

export default errorHandler(handler);
