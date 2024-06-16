import prisma from "@/db/prismaclient"
import Banner from "./banner"

export const customComponentProvider = async (compId: string) => {
    const comp = await prisma.customComponent.findUnique({
        where: {
            id: compId
        },
    })

    if (comp) {
        const content = JSON.parse(comp?.content)

        return <Banner htmlContent={content?.html} tailwindcss={comp?.tailwindcss} />
    }

}