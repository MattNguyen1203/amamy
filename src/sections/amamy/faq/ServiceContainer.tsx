import React, {useState} from 'react'
import ICAngleRight from '@/components/icon/ICAngleRight'

const ServiceContainer = ({
  service,
  description,
}: {
  service?: string
  description?: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='size-full'>
      <button
        className='group flex w-full items-center justify-between py-5 hover:text-Blue-Primary'
        onClick={() => setOpen(!open)}
      >
        <p className='text-start text-[1.5rem] font-medium leading-[100%] xsm:text-base'>
          {service}
        </p>
        <span>
          <ICAngleRight
            className={`fill-black ${open ? 'rotate-90' : ''} group-hover:fill-Blue-Primary`}
          />
        </span>
      </button>

      {open && <div>{description}</div>}
    </div>
  )
}

export default ServiceContainer
