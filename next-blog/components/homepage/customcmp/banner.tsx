
const Banner = ({ htmlContent = "<p></p>", tailwindcss = "" }: { htmlContent: string | undefined, tailwindcss: string | undefined }) => {
  return (
    <div className={`${tailwindcss}`}>
      <div
        className={`tiptap ProseMirror prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`}
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      ></div>
    </div>
  )
}

export default Banner