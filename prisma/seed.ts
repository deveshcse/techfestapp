import { PrismaClient } from "../src/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  await prisma.techFest.deleteMany();

  // Create sample TechFest events
  const techFests = await prisma.techFest.createMany({
    data: [
      {
        title: "TechFest 2026 - Spring Edition",
        description:
          "Annual technology festival featuring keynotes, workshops, and networking events. Join us for three days of innovation and learning.",
        start_date: new Date("2026-04-15"),
        end_date: new Date("2026-04-17"),
        venue: "Convention Center, Downtown",
        published: true,
        created_by: "admin",
        updated_by: "admin",
      },
      {
        title: "AI & Machine Learning Conference",
        description:
          "Deep dive into the latest advancements in AI and ML. Expert speakers, workshops, and hands-on labs.",
        start_date: new Date("2026-05-10"),
        end_date: new Date("2026-05-12"),
        venue: "Tech Park, Silicon Valley",
        published: true,
        created_by: "admin",
        updated_by: "admin",
      },
      {
        title: "Web Development Summit",
        description:
          "Discover the latest trends in web development. Learn about React, Next.js, and modern web technologies.",
        start_date: new Date("2026-06-01"),
        end_date: new Date("2026-06-03"),
        venue: "Creative Hub, Austin",
        published: true,
        created_by: "admin",
        updated_by: "admin",
      },
      {
        title: "Startup Pitch Competition",
        description:
          "Watch innovative startups pitch their ideas to investors. Network with entrepreneurs and venture capitalists.",
        start_date: new Date("2026-07-20"),
        end_date: new Date("2026-07-21"),
        venue: "Innovation District, Boston",
        published: false,
        created_by: "admin",
      },
      {
        title: "DevOps & Cloud Infrastructure",
        description:
          "Learn about containerization, Kubernetes, and cloud deployment strategies from industry experts.",
        start_date: new Date("2026-08-15"),
        end_date: new Date("2026-08-17"),
        venue: "Cloud Center, Seattle",
        published: true,
        created_by: "admin",
        updated_by: "admin",
      },
    ],
  });

  console.log(`✅ Seeded ${techFests.count} TechFest events`);
}

main();

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
