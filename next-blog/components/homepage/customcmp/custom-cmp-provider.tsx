import prisma from "@/db/prismaclient"
import Banner from "./banner"

export const customComponentProvider = async (compId: string) => {
    const comp = await prisma.customComponent.findUnique({
        where: {
            id: compId
        },
    })
    
    return <Banner htmlContent={comp?.htmlContent} tailwindcss={comp?.tailwindcss} />
}