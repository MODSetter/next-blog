import { Eye } from 'lucide-react';
import PostMetaData from '../../common-interfaces';


const PostcardLgOne = ({
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
            <article className="flex max-w-md flex-col rounded-2xl p-4 bg-white/10 backdrop-blur-lg shadow md:max-w-5xl md:flex-row md:items-center" key={slug}>
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
                            {tags.map(({ tagname }) => (
                                <p className={`text-[14px] font-semibold rounded-3xl mb-4 px-[18px] border border-violet-500`}>
                                    {tagname}
                                </p>
                            ))}
                        </div>
                    </div>
                    <a href="#" className="mb-4 block text-2xl font-medium">{title}</a>
                    <p className="mb-6">{metaDescription}</p>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="Simon Lewis" />
                        <p className="ml-4 w-56">
                            <strong className="block font-medium">Johanson Levinsiki</strong>
                            <span className="text-sm">{(new Date(updatedAt)).toDateString()}</span>
                        </p>
                    </div>
                </div>
            </article>

        </>
    )
}

export default PostcardLgOne