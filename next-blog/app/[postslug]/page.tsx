
interface BlogPostPageProps {
    params: { postslug: string };
}

interface PostProps {
    title: string
    content: string
}


export default async function BlogPostPage({
    params: { postslug },
  }: BlogPostPageProps) {
    
    return (
      <article className="max-w-prose m-auto space-y-5">
        {postslug}
        <h1 className="text-3xl text-center font-bold">{"post.title"}</h1>
        <p className="text-lg">{"post.content"}</p>
      </article>
    );
  }