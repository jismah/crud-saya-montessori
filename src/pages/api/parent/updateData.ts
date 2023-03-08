import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const {id, identityCard, name, lastName1, lastName2, telephone, email} = req.body
        const parent = await prisma.parent.update({
            where: {
                id: id,
            },
            data: {
                identityCard: identityCard,
                name: name,
                lastName1: lastName1,
                lastName2: lastName2,
                telephone: telephone,
                email: email,
                updatedAt: new Date()

            }
        })
        res.status(200).json(parent);
    }
}