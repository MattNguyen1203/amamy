import ImageV2 from '@/components/image/ImageV2'

type LocationTagProps = {
  location: string
}

const LocationTag = ({location}: LocationTagProps) => {
  return (
    <div className='p-[0.25rem_0.5rem_0.25rem_0.25rem] rounded-full bg-[#EDF5FA] flex items-center space-x-1 text-pc-sub10m text-black/60'>
      <ImageV2
        src='/tracking-bill/icon-location.svg'
        width={40}
        height={40}
        alt=''
        className='size-[0.875rem] object-contain'
      />
      <span>{location}</span>
    </div>
  )
}
export default LocationTag
