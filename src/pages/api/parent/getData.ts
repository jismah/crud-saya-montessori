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

    // FACTORY OF PARENTS
    
    // const fakeData = await prisma.parent.create({
    //     data: {
    //         identityCard: faker.finance.account(11),
    //         name: faker.name.firstName(),
    //         lastName1: faker.name.lastName(),
    //         lastName2: faker.name.lastName(),
    //         telephone: faker.phone.number('809-###-####'),
    //         email: faker.internet.email(),
    //     }
    // })
    // res.status(200).json(fakeData);
    res.status(200).json(parents);

}