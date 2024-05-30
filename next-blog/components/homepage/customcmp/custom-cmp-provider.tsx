import prisma from "@/db/prismaclient"

const customComponentProvider = async (compId: string) => {
    const comp = await prisma.customComponent.findUnique({
        where: {
            id: compId
        },
    })
    
    return comp
}