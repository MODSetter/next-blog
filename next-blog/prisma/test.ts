import { create } from "domain";
import prisma from "../db/prismaclient"
const createUser = async () => {
    const postCreated = await prisma.post.create({
        data: {
            slug: "das",
            opengraphimage: "xyz",
            title: "bla",
            content: "asdasd",
            authorId: "1",
            metaKeywords: ["seo","new"],
            metaDescription: "xyz",
            visibility: true,
            tags: {
                create:[
                    {tagname: "xyz"}
                ]
            }
        },
    })

    return postCreated
}

createUser();