/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.upsert({
    where: {
      id: 1
    },
    create: {
      id: 1,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`'
    },
    update: {}
  })

  for (let i = 0; i < 100; i++) {
    const fakeData = faker.science.unit()
    const tag = { label: fakeData.symbol}
    // createMany is not supported for SQLite.
    // await prisma.tag.create({ data: tag }) 

    prisma.tag.upsert({
      where: {},
      create: tag,
      update: {}
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

//npx prisma db push
