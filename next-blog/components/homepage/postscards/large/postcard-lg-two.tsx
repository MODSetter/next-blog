import { Eye } from 'lucide-react';
import PostMetaData from '../../common-interfaces';
import Link from 'next/link';

const PostcardLgTwo = ({
    slug,
    opengraphimage,
    title,
    metaDescription,
    updatedAt,
    views,
    tags,
    author,
}: PostMetaData) => {

    return (
        <>
            <article className="max-w-screen-lg rounded-2xl p-1 border bg-white/10 backdrop-blur-lg border-gray-100 shadow-md mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="p-5 md:w-4/6 md:p-8">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                {tags?.map(({ tagname }) => (
                                    <Link href={`/tags/${tagname}`} className={`text-[14px] font-semibold rounded-3xl mb-4 bg-orange-400 px-2 py-1 text-xs uppercase text-white`}>
                                        {tagname}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Eye className="" size={20} />
                                <span className="text-sm">{views}</span>
                            </div>
                        </div>

                        <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl">{title}</p>
                        <p className="mt-3">{metaDescription}</p>



                        <div className="flex justify-between place-items-center my-3">
                            <div>
                                <Link href={`/${slug}`}>
                                    <button className="flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 hover:translate-y-1 hover:bg-sky-500">Read More</button>
                                </Link>
                            </div>


                            <div className="hidden md:block">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full object-cover" src={author?.avatar} alt="author pic" />
                                    <p className="ml-4 w-56">
                                        <strong className="block font-medium">{author?.name}</strong>
                                        <span className="text-sm">{(new Date(updatedAt)).toDateString()}</span>
                                    </p>
                                </div>
                            </div>


                        </div>


                    </div>

                    <div className="flex items-center p-2 shrink-0 mx-auto my-2 md:mr-8 md:max-w-sm">
                        <img className="object-cover rounded-md shadow-lg" src={opengraphimage} alt="opengraphimage" />
                    </div>
                </div>
            </article>
        </>
    )
}



export default PostcardLgTwo