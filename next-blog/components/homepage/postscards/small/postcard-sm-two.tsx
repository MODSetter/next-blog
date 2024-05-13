import { ArrowUpRight, Eye } from 'lucide-react';
import PostMetaData from '../../common-interfaces';
import Link from 'next/link';
import Image from 'next/image';
import readmore from "../../../../public/images/readmore.png"
import {randomBorderColor} from "@/utils/common-functions"


const PostcardSmTwo = ({
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
            <article
                className="group bg-white/5 backdrop-blur-lg overflow flex flex-col mt-6 shadow-md bg-clip-border rounded-xl border duration-500 ease-in-out hover:shadow-xl"
                key={slug}
            >
                <div>
                    <div className="relative h-56 mx-4 -mt-6 overflow-hidden shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 cursor-pointer">
                        <img
                            src={opengraphimage}
                            alt="card-image"
                            className="peer absolute top-0 right-0 h-full w-full object-cover"
                        />
                        {/* When the user hovers over this image, this image will be displayed. You can add images here as you wish."          */}
                        <Image
                            className="peer absolute top-0 -right-full h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                            src={readmore}
                            alt="product image"
                        />
                        {/* When the user hovers over this image, this image will be displayed. You can add images here as you wish."       */}
                    </div>
                    <div className="p-6">
                        <div className="content mt-[24px]">
                            <div>
                                <div className='flex justify-between'>
                                    <p className="text-[16px]">
                                        {(new Date(updatedAt)).toDateString()}
                                    </p>
                                    <div className="flex gap-2">
                                        <Eye className="" size={20} />
                                        <span className="text-sm">{views}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {title}
                                    </h5>

                                    <ArrowUpRight className="h-[24px] w-[24px]" />
                                </div>
                                <p className="block font-sans text-base antialiased leading-relaxed mb-5">
                                    {metaDescription}
                                </p>
                            </div>
                            <div className="category">
                                <div className="flex items-center gap-2">
                                    {tags.map(({ tagname }, index) => (
                                        <p className={`text-[14px] font-semibold rounded-3xl mb-4 px-[18px] border border-violet-500`} key={index}>
                                            {tagname}
                                        </p>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <Link
                            href={`/${slug}`}
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </article>
        </>
    )
}

export default PostcardSmTwo