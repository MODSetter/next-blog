interface PostMetaData {
    title: string;
    opengraphimage: string;
    slug: string;
    updatedAt: Date;
    metaDescription: string | null;
    views: number;
    tags: { tagname: string; }[];
    author: any;
}

export default PostMetaData