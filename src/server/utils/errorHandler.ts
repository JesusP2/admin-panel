import { authApp } from '../../firebase/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function catchErrorsFrom(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1] || '';
        if (!token) {
            console.error('Invalid credentials!');
            return res.status(401).json({ error: 'Invalid credentials!' });
        }
        try {
            const claims = await authApp.verifyIdToken(token);
            if (!claims.admin) {
                console.error('No eres un administrador!');
                return res.status(401).json({ error:'No eres un administrador!' });
            }
        } catch (err: unknown) {
            console.error(err);
            return res.status(401).json({ error: 'Invalid credentials!' });
        }

        return handler(req, res).catch((error: unknown) => {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
        });
    };
}
