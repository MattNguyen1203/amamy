'use client'
import useProcessHeadings from '@/hooks/useProcessHeadings'
import {IDetailBlog, IFavouriteBlog} from '@/sections/blog/blogs.interface'
import ContentBlog from '@/sections/blog/detail/ContentBlog'
interface IdataDetailPost {
  status: number
  message: string
  post: IDetailBlog
}
export default function DetailCentenBlog({
  dataDetailPost,
  // dataFavourite,
}: {
  dataDetailPost: IdataDetailPost
  dataFavourite: IFavouriteBlog[]
}) {
  const {headings, updatedHtml} = useProcessHeadings(
    dataDetailPost?.post?.content,
  )
  return (
    <div className='flex sm:space-x-[4rem] sm:px-[6rem] xsm:flex-col'>
      <ContentBlog
        updatedHtml={updatedHtml}
        data={dataDetailPost?.post}
        headings={headings}
      />
      {/* {updatedHtml && (
        <AsideBlog
          dataFavourite={dataFavourite}
          headings={headings}
        />
      )} */}
    </div>
  )
}
