import { PrismaClient } from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next'

const prisma = new PrismaClient()

type Data = {

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const parent = await prisma.parent.update({
        where: {
            id: 4,
        },
        data: {
            deleted: true,
           
        }
    })
    res.status(200).json(parent);
}