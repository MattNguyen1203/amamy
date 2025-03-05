import {fetchDataAbout} from '@/fetch/fecthDataAbout'
import AboutPage from '@/sections/about'
import {AboutWPResponse} from '@/utils/type'

export default async function About() {
  const res: AboutWPResponse = await fetchDataAbout()
  return (
    <div className='w-full bg-white text-black flex flex-col items-center'>
      <AboutPage res={res} />
    </div>
  )
}
