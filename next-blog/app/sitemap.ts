// import { MetadataRoute } from "next";
// import { getAllPostsWithSlug } from "../db/getters"

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const posts  = await getAllPostsWithSlug();

//   const postEntries: MetadataRoute.Sitemap = posts.map(({ postSlug , updatedAt }) => ({
//     url: `${process.env.PUBLIC_BASE_URL}/${postSlug?.slug}`,
//     lastModified: `${updatedAt}`,
//   }));

//   return [
//     //about page
//     {
//       url: `${process.env.PUBLIC_BASE_URL}/about`,
//     },
//     //privacy page
//     {
//         url: `${process.env.PUBLIC_BASE_URL}/privacy`,
//     },
//     ...postEntries,
//   ];
// }