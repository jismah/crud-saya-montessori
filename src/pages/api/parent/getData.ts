import { PrismaClient } from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const parents = await prisma.parent.findMany({
        where: {
            deleted: false,
        }
    })
    res.status(200).json(parents);

}