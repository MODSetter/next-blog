import Footer from '@/components/Footer'
import NavBar from '@/components/nav-bar'
import React from 'react'

const PreviewPost = ({title, content}) => {
  return (
    <div className="flex flex-col justify-between h-screen">
    <NavBar />
    <div className="grow container mx-auto p-4 border m-4 rounded-xl">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div
          className="text-lg p-2"
          dangerouslySetInnerHTML={{
            __html: content ? content : "404 Error",
          }}
        ></div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default PreviewPost