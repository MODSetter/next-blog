import { Eye } from 'lucide-react';
import PostMetaData from '../../common-interfaces';
import { randomBorderColor } from '@/utils/common-functions';
import Link from 'next/link';


const PostcardSmOne = ({
    slug,
    opengraphimage,
    title,
    metaDescription,
    updatedAt,
    views,
    tags,
}: PostMetaData) => {
    return (
        <>
            <div
                className="max-w-sm mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-md mb-10 flex flex-col p-4"
            >
                <Link href={`/${slug}`}>
                    <div className="shrink-0 my-4 overflow-hidden">
                        <img
                            className="rounded-2xl hover:scale-110 transition-all duration-500 cursor-pointer "
                            src={opengraphimage}
                            alt="opengraphimage"
                        />
                    </div>
                </Link>
                <div className="p-5 flex-grow ">
                    <div className="flex xl:justify-between xl:flex-row justify-between flex-row-reverse">
                        <div className="flex  gap-2">
                            <Eye className="" size={20} />
                            <span className="text-sm">{views}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {tags.map(({ tagname }) => (
                                <Link href={`/tags/${tagname}`} className={`text-[14px] font-semibold rounded-3xl mb-4 px-[18px] border border-violet-500 bg-emerald-500/10 backdrop-blur-lg`}>
                                    {tagname}
                                </Link>
                            ))}

                        </div>

                    </div>
                    <Link href={`/${slug}`}>
                        <div>
                            <h5 className="mb-4 block text-2xl font-semibold text-gray-700 dark:text-white">
                                {title}
                            </h5>
                        </div>
                        <p className="mb-6 text-gray-500">{metaDescription}</p>
                    </Link>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                alt="Neil image"
                            />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <strong className="block font-medium text-gray-700 dark:text-gray-400">
                                Rohan
                            </strong>

                            <span className="text-sm text-gray-400">{(new Date(updatedAt)).toDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostcardSmOne