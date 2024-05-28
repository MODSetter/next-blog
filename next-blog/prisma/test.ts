import { create } from "domain";
import prisma from "../db/prismaclient"
const createUser = async () => {
    let ctags: { where: { tagname: string; }; create: { tagname: string; }; }[] = []
    const tagstocreate = ["test","testtwo","three"]

    tagstocreate.forEach((tag) => {
        const query = {
            where: {
              tagname: tag,
            },
            create: {
                tagname: tag,
            },
        }
        ctags.push(query)
    })

    // console.log("TAGS", ctags.toString)

    const postCreated = await prisma.post.create({
        data: {
            slug: "daas",
            opengraphimage: "xyz",
            title: "bla",
            content: "asdasd",
            authorId: "1",
            metaKeywords: ["seo","new"],
            metaDescription: "xyz",
            visibility: true,
            tags: {
                connectOrCreate: [
                    ...ctags
                ]
            },
        },
    })

    return postCreated
}

createUser();