import type { NextApiRequest, NextApiResponse } from 'next';

export default function catchErrorsFrom(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        return handler(req, res).catch((error: unknown) => {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
        });
    };
}
