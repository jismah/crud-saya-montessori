import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type Data = {

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const {identityCard, name, lastName1, telephone, email} = req.body
        const parent = await prisma.parent.create({
            data: {
                identityCard: identityCard,
                name: name,
                lastName1: lastName1,
                telephone: telephone,
                email: email,
            }
        })
        res.status(200).json(parent);
        console.log(parent)
    }
}