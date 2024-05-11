import prisma from "../db/prismaclient";
import { hash } from "@node-rs/argon2";

async function main() {
  "use server";
  const passwordHash = await hash("admin", {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
});

  const adminUser = await prisma.user.create({
    data: {
        id: "1",
        email: "admin@xyz.com",
        username: "admin",
        password_hash: passwordHash,
        navbar: 1,
        maingrid: 1,
        footer: 1,
    },
  });
  console.log("CREATED ADMIN USER", adminUser);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
