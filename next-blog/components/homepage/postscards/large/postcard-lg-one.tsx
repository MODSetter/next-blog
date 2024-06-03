import { Eye } from 'lucide-react';
import PostMetaData from '../../common-interfaces';
import Link from 'next/link';


const PostcardLgOne = ({
    slug,
    opengraphimage,
    title,
    metaDescription,
    updatedAt,
    views,
    tags,
    author,
}: PostMetaData) => {
    console.log("Lg",author);
    return (
        <>
            <article className="flex max-w-md flex-col rounded-2xl p-4 bg-white/10 backdrop-blur-lg shadow md:max-w-5xl md:flex-row md:items-center place-self-center" key={slug}>
                <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                    <img className="rounded-2xl" src={opengraphimage} alt="opengraphimage" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <Eye className="" size={20} />
                            <span className="text-sm">{views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {tags?.map(({ tagname }) => (
                                <Link href={`/tags/${tagname}`} className={`text-[14px] font-semibold rounded-3xl mb-4 px-[18px] border border-violet-500`}>
                                    {tagname}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link href={`/${slug}`}>
                        <p className="mb-4 block text-2xl font-medium">{title}</p>
                        <p className="mb-6">{metaDescription}</p>
                    </Link>

                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={author?.avatar} alt="author avatar" />
                        <p className="ml-4 w-56">
                            <strong className="block font-medium">{author?.name}</strong>
                            <span className="text-sm">{(new Date(updatedAt)).toDateString()}</span>
                        </p>
                    </div>
                </div>
            </article>

        </>
    )
}

export default PostcardLgOne