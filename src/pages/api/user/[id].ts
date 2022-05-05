import type { NextApiRequest, NextApiResponse } from 'next';
import errorHandler from 'server/utils/errorHandler';
import userService from 'server/services/User.service'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    if (typeof id !== 'string') throw new Error("Invalid id")
    else if (req.method === 'GET') {
        const user = await userService.findOne(id)

        return res.status(200).json(user);
    } else if (req.method === 'PUT') {
        const {name, email, password, phoneNumber} = req.body
        const user = await userService.updateOne(id, {displayName: name, email, password, phoneNumber})
        return res.status(200).json(user)
    } else if (req.method === 'DELETE') {
        await userService.deleteOne(id)
        return res.status(200).json({})
    }

    res.status(501).json({})
}

export default errorHandler(handler);

