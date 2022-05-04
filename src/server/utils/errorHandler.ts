import type { NextApiRequest, NextApiResponse } from 'next';

export default function catchErrorsFrom(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        return handler(req, res).catch((error: unknown) => {
            console.error(error);
            if (process.env.NODE_ENV === 'development') {
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.stack });
                }
            }

            return res.status(400).json({ error: error });
        });
    };
}
