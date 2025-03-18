import ItemFavourite from '@/components/favourite/ItemFavourite'
import {cn} from '@/lib/utils'
import {IFavouriteBlog} from '@/sections/blog/blogs.interface'
import {Fragment} from 'react'

export default function Favourite({
  dataFavourite,
  className,
}: {
  dataFavourite?: IFavouriteBlog[]
  className?: string
}) {
  return (
    <aside
      className={cn(
        'xsm:pt-[2rem] w-full sm:p-[1rem] rounded-[1.25rem] sm:bg-[#F8F8F8]',
        className,
      )}
    >
      <h2 className='text-[#000] font-montserrat text-pc-heading20b xsm:text-pc-sub16b pb-[1rem] xsm:pb-[0.75rem] border-b-[1px] border-b-[#DCDFE4]'>
        Có thể bạn sẽ thích
      </h2>
      <div className='warpper-content sm:h-[80vh] sm:overflow-auto sm:overflow-y-auto'>
        {Array.isArray(dataFavourite) &&
          dataFavourite?.map((e: IFavouriteBlog, index: number) => (
            <Fragment key={index}>
              <ItemFavourite item={e} />
              {index < dataFavourite?.length - 1 && (
                <div className='h-[1px] bg-[#DCDFE4] w-full'></div>
              )}
            </Fragment>
          ))}
      </div>
    </aside>
  )
}
