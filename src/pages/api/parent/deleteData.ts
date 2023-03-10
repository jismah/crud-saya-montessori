import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const {id} = req.body
        const parent = await prisma.parent.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json(parent);
    }

}