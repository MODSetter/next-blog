import prisma from "./db";

async function test() {
    const users = await prisma.user.findMany()
    console.log(JSON.stringify(users))
}

test()



// export const getServerSideProps = async () => {
//     const users = prisma.user.findMany()
  
//     return { props: { users } }
// }