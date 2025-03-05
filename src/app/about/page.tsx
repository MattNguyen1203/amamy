import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import AboutPage from '@/sections/about'
import {WordpressResponse} from '@/utils/type'

export default async function About() {
  const res: WordpressResponse = await fetchDataAbout()
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <AboutPage res={res} />
    </div>
  )
}
