import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import {fetchDataBlog} from '@/fetch/fetchDataBlog'
import AboutPage from '@/sections/about'

export default async function About() {
  const [res, resListBlog] = await Promise.all([
    fetchDataAbout(),
    fetchDataBlog(),
  ])
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <AboutPage
        res={res}
        listBlog={resListBlog}
      />
    </div>
  )
}
