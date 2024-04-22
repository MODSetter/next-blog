import Footer from '@/components/Footer'
import NavBar from '@/components/nav-bar'
import React from 'react'

const PreviewPost = ({title, content, dateposted}: {title: string, content:string | null, dateposted:Date}) => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <NavBar />
        <div className="grow container mx-auto p-4 border m-4 rounded-xl">
          <div className="flex flex-col gap-y-4 m-4">
            <div className="flex justify-between items-center p-4 border-b border-dashed border-gray-200">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">{title}</h1>

                <div className="italic underline text-xs">{dateposted.toString().slice(4, 25)}</div>
              </div>

              <div className="flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold">
                    {/* <span className="absolute inset-0"></span> */}
                    Rohan
                  </p>
                  <p>Admin</p>
                </div>
              </div>
            </div>

            <div
              className="tiptap ProseMirror prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
              dangerouslySetInnerHTML={{
                __html: content ? content : "404 Error",
              }}
            ></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PreviewPost