import { MetadataRoute } from "next";
import { getPostsMetaWithPostSlug } from "../db/getters"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts  = await getPostsMetaWithPostSlug();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug , updatedAt }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    lastModified: `${updatedAt}`,
  }));

  return [
    //about page
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    //privacy page
    {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy`,
    },
    ...postEntries,
  ];
}