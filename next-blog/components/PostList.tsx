// import { getAllSlugs } from "../db/getters";
// import Link from "next/link";

// const PostList = async () => {
//     const allslugs = await getAllSlugs();

//   return (
//     <div className="max-w-prose m-auto space-y-5">
//       <h1 className="text-3xl text-center mb-3 font-bold">Posts</h1>
//       {allslugs.map(({ slug, postId }) => (
//         <article key={postId}>
//           <h2>
//             <Link href={`/${slug}`} className="text-lg font-bold">
//               {slug}
//             </Link>
//           </h2>
//         </article>
//       ))}
//     </div>
//   )
// }

// export default PostList