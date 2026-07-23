import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const hashedPassword = await bcrypt.hash("Maha@123", 10);

  const user = await prisma.user.upsert({
    where: {
      username: "mahaab",
    },
    update: {},
    create: {
      name: "maha",
      username: "mahaab",
      email: "maha@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("User created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });