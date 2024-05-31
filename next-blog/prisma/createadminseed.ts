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

const navlinks = [{
  name: "Home",
  href: "/",
  css: "",
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
}]

const footlinks = [{
  name: "",
  href: "https://github.com/MODSetter",
  css: "",
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
}]

  const adminUser = await prisma.user.create({
    data: {
        id: "1",
        name: "John Doe",
        avatar: "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png",
        username: "admin",
        password_hash: passwordHash,
        navbarlogo: "",
        navbar: "NAVBAR-1" ,
        maingrid: "GRID-1",
        footer: "FOOTER-1",
        navbarlinks: JSON.stringify(navlinks),
        footerlinks: JSON.stringify(footlinks),
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
