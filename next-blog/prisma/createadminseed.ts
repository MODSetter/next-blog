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
        navbar: "NAVBAR-1" ,
        maingrid: "GRID-1",
        footer: "FOOTER-1",
        navbarlinks: "[]",
        footerlinks: "[]",
        defaultDark: "D-1",
        defaultLight: "L-2",
    },
  });

  const createGrids = await prisma.grid.createMany({
    data: [

      { id: 'GRID-1', comp_one: "BANNER-1", comp_two: "POSTLIST-SM-1", comp_three: "XYZ-1", comp_four: "ABC-1", comp_five: "BANNER-1"},
      { id: 'GRID-2', comp_one: "BANNER-1", comp_two: "POSTLIST-1", comp_three: "XYZ-1", comp_four: "ABC-1", comp_five: "BANNER-1"},
      { id: 'GRID-3', comp_one: "BANNER-1", comp_two: "POSTLIST-1", comp_three: "XYZ-1", comp_four: "ABC-1", comp_five: "BANNER-1"},
      { id: 'GRID-4', comp_one: "BANNER-1", comp_two: "POSTLIST-1", comp_three: "XYZ-1", comp_four: "ABC-1", comp_five: "BANNER-1"},
      { id: 'GRID-5', comp_one: "BANNER-1", comp_two: "POSTLIST-1", comp_three: "XYZ-1", comp_four: "ABC-1", comp_five: "BANNER-1"},
    ],
    skipDuplicates: true, 
  })
  console.log("LOADED INITIAL DATA",adminUser,createGrids);
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
