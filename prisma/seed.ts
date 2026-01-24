import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const ADMIN_ID = "TVY2q5D3sbZDFolAGvsALGCMTxOXBUmu"

async function main() {
  console.log("🌱 Seeding TechFest data...")

  // Optional: clear existing techfest records
//   await prisma.techFest.deleteMany()

  const techFests = Array.from({ length: 100 }).map((_, i) => {
    const start = new Date()
    start.setDate(start.getDate() + i * 2)

    const end = new Date(start)
    end.setDate(start.getDate() + 2)

    return {
      title: `TechFest ${2026 + Math.floor(i / 10)} - Event ${i + 1}`,
      description: `This is TechFest event number ${i + 1} focusing on AI, Web, and Cloud.`,
      start_date: start,
      end_date: end,
      venue: `Hall ${((i % 10) + 1).toString()} - University Campus`,
      published: i % 2 === 0, // half published

      createdById: ADMIN_ID,
      updatedById: ADMIN_ID,
    }
  })

  await prisma.techFest.createMany({
    data: techFests,
  })

  console.log("✅ Seeded 100 TechFest records")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
