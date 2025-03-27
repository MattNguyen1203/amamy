import {IAmamyQualityAbout_ListQuality} from '@/sections/about/about.interface'
import CoreValueCard from './CoreValueCard'

interface Prop {
  quantities: IAmamyQualityAbout_ListQuality[]
}

const QuantityList = ({quantities}: Prop) => {
  return (
    <>
      {Array.isArray(quantities) &&
        quantities?.map((quantity, index) => (
          <div
            key={index}
            data-delay={0.5 * (index + 1)}
            data-duration='1.5'
            className='fade-item rounded-[1.25rem] w-[28.6875rem] flex flex-col h-[34.5625rem] rounded-br-[var(--8,] rounded-tr-[0.5rem)] rounded-bl-[0.5rem)] group xsm:w-[17.5rem] xsm:h-[13.875rem] xsm:min-w-max'
          >
            <CoreValueCard
              imageSrc={quantity?.image.url}
              imageAlt={quantity?.image.alt}
              label={quantity?.subtitle}
              title={quantity?.title}
              description={quantity?.description}
            />
          </div>
        ))}
    </>
  )
}

export default QuantityList
