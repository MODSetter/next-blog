import { Eye } from "lucide-react";

interface PostMetaData {
  title: string;
  opengraphimage: string;
  slug: string;
  updatedAt: Date;
  metaDescription: string | null;
  views: number;
  tags: { tagname: string; }[];
}
[];

async function allPostMetaDataRequest() {
  let cacheValidateAt = 5; //Default Cache Timeout
  if (`${process.env.HOMEPAGE_CACHE_REVALIDATE}`) {
    cacheValidateAt = parseInt(`${process.env.HOMEPAGE_CACHE_REVALIDATE}`);
  } else {
    console.log("Wrong Home Cache Vals in Env");
  }
  const response = await fetch(`${process.env.PUBLIC_BASE_URL}/api/posts`, {
    next: { revalidate: cacheValidateAt },
  });
  return response.json();
}

const DefaultPostList = async () => {
  const allPostMetaData = await allPostMetaDataRequest();
  console.log(allPostMetaData);
  return (
    <>
      <div className="flex gap-4 flex-wrap p-2">
        {allPostMetaData.map(
          ({
            slug,
            opengraphimage,
            title,
            metaDescription,
            updatedAt,
            views,
            tags,
          }: PostMetaData) => (
            <div
              className="max-w-sm  bg-white/10 backdrop-blur-lg   rounded-2xl shadow-md mb-10 flex flex-col p-4"
              key={slug}
            >
              <div className="shrink-0 my-4 overflow-hidden">
                <img
                  className="rounded-2xl hover:scale-110 transition-all duration-500 cursor-pointer "
                  src={opengraphimage}
                  alt="opengraphimage"
                />
              </div>
              <div className="p-5 flex-grow ">
                <div className="flex xl:justify-between xl:flex-row justify-between flex-row-reverse">
                  <div className="flex  gap-2">
                    <Eye className="" size={20} />
                    <span className="text-sm">{views}</span>
                  </div>
                  
                    {tags.map(({tagname}) => (
                      <p className="text-[14px] pl-2 pr-2 pt-[1px] font-semibold text-white/100 bg-blue-800 rounded-md mb-4">
                        {tagname}
                      </p>
                    ))}
                  
                </div>

                <div>
                  <h5 className="mb-4 block text-2xl font-semibold text-gray-700 dark:text-white">
                    {title}
                  </h5>
                </div>
                <p className="mb-6 text-gray-500">{metaDescription}</p>
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
          )
        )}
      </div>
    </>
  );
};

// export default PostList;


export default DefaultPostList